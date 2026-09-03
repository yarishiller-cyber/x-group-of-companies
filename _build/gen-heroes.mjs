// =============================================================================
// gen-heroes.mjs — generate every page-hero background with Nano Banana
// (gemini-2.5-flash-image), one consistent 21:9 editorial series.
//
//   GEMINI_API_KEY=$GEMINI_API_KEY node _build/gen-heroes.mjs
//
// - Idempotent: skips any hero whose .webp already exists (delete to redo).
// - Needs `cwebp` for PNG -> webp conversion.
// - Output: assets/img/heroes/<key>.webp (1600w) — used by build.mjs page-hero.
// =============================================================================
import { writeFileSync, mkdirSync, existsSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { heroes, HERO_STYLE } from "./data/heroes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "assets/img/heroes");
mkdirSync(OUT_DIR, { recursive: true });

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const KEYS = [process.env.GEMINI_API_KEY, "AIzaSyD5luV_lMqNjOs5gMbNaZ3Z1OVJsakgaP8"].filter(Boolean);
let API_KEY = null;
for (const k of KEYS) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": k },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Say OK" }] }] }),
  }).catch(() => null);
  if (r && (r.ok || r.status === 400)) { API_KEY = k; break; }
  if (r) console.log(`  key …${k.slice(-6)}: HTTP ${r.status} — trying next`);
}
if (!API_KEY) { console.error("✗ no Gemini key currently usable"); process.exit(2); }

let wideSupported = true; // downgrade gracefully if imageConfig is rejected
async function generate(prompt, outPng) {
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  if (wideSupported) body.generationConfig = { imageConfig: { aspectRatio: "21:9" } };
  let res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
      body: JSON.stringify(body) },
  );
  if (res.status === 400 && wideSupported) {
    wideSupported = false;
    delete body.generationConfig;
    res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
        body: JSON.stringify(body) },
    );
  }
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const img = (data?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
  if (!img) throw new Error("no image in response: " + JSON.stringify(data).slice(0, 200));
  writeFileSync(outPng, Buffer.from(img.inlineData.data, "base64"));
}

const only = process.argv.slice(2); // optional: pass keys to (re)generate just those
let ok = 0, skipped = 0, failed = 0;
for (const [key, h] of Object.entries(heroes)) {
  if (only.length && !only.includes(key)) continue;
  const webp = join(OUT_DIR, `${key}.webp`);
  const png = join(OUT_DIR, `${key}.png`);
  if (existsSync(webp) && !only.includes(key)) { console.log(`• ${key} — exists, skipping`); skipped++; continue; }
  try {
    console.log(`→ ${key}…`);
    await generate(`${h.prompt}. ${HERO_STYLE}`, png);
    execFileSync("cwebp", ["-q", "80", "-resize", "1600", "0", png, "-o", webp], { stdio: "pipe" });
    unlinkSync(png);
    console.log(`  ✓ assets/img/heroes/${key}.webp`);
    ok++;
  } catch (err) {
    console.error(`  ✗ ${key}: ${err.message}`);
    failed++;
    if (/429|RESOURCE_EXHAUSTED|depleted/.test(err.message)) {
      console.error("\nBilling is depleted — top up at https://aistudio.google.com and re-run.");
      process.exit(2);
    }
  }
}
console.log(`\ndone: ${ok} generated, ${skipped} skipped, ${failed} failed (21:9 native: ${wideSupported})`);
process.exit(failed ? 1 : 0);
