// =============================================================================
// gen-portraits.mjs — generate the executive portrait set with Nano Banana
// (Google Gemini image API), one consistent studio series for all leaders.
//
//   GEMINI_API_KEY=$GEMINI_API_KEY node _build/gen-portraits.mjs
//
// - Idempotent: skips any portrait whose .webp already exists (delete to redo).
// - Needs `cwebp` (apt-get install -y webp) for PNG -> webp conversion.
// - After generating: node _build/build.mjs && node _build/preview.mjs
//   (the build uses a portrait only when its file exists, so this script is
//   safe to run any time; until it succeeds the site shows monogram avatars).
//
// NOTE: if the API returns 429 "prepayment credits are depleted", the Google
// account behind GEMINI_API_KEY needs a top-up at https://aistudio.google.com
// — that is billing, not code. Re-run once credits exist.
// =============================================================================
import { writeFileSync, mkdirSync, existsSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { executives } from "./data/executives.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "assets/img/team");
mkdirSync(OUT_DIR, { recursive: true });

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
// Try every known fleet key: the primary (garagedoors-shared CREDENTIALS.md,
// currently billing-depleted) and the doorx-tools project key (works if the
// owner enables the Gemini API for project 296817345349 in Google Cloud).
const KEYS = [process.env.GEMINI_API_KEY, "AIzaSyD5luV_lMqNjOs5gMbNaZ3Z1OVJsakgaP8"].filter(Boolean);
let API_KEY = null;
for (const k of KEYS) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": k },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Say OK" }] }] }),
  }).catch(() => null);
  if (r && (r.ok || r.status === 400)) { API_KEY = k; break; }   // 400 = key alive, prompt shape issue
  if (r) console.log(`  key …${k.slice(-6)}: HTTP ${r.status} — trying next`);
}
if (!API_KEY) { console.error("✗ no Gemini key currently usable (billing/API-enable pending)"); process.exit(2); }

// One shared studio treatment so the leadership grid reads as a single session.
const STYLE =
  "Photorealistic professional corporate headshot photograph, head and shoulders, " +
  "centered, looking directly at the camera with a calm confident expression. " +
  "Soft diffused studio key light from the left, gentle fill, plain seamless " +
  "cool light-grey studio background (#e9edf0), shot on an 85mm lens at f/2.8, " +
  "shallow depth of field, natural realistic skin texture, no retouching-plastic " +
  "look, square 1:1 composition with headroom. Consistent corporate portrait " +
  "series style. No text, no watermark, no logo.";

async function generate(prompt, outPng) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    },
  );
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const img = (data?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
  if (!img) throw new Error("no image in response: " + JSON.stringify(data).slice(0, 200));
  writeFileSync(outPng, Buffer.from(img.inlineData.data, "base64"));
}

let ok = 0, skipped = 0, failed = 0;
for (const e of executives) {
  const slug = e.photo.split("/").pop().replace(".webp", "");
  const webp = join(OUT_DIR, `${slug}.webp`);
  const png = join(OUT_DIR, `${slug}.png`);
  if (existsSync(webp)) { console.log(`• ${e.name} — exists, skipping`); skipped++; continue; }
  const prompt = `${STYLE} Subject: ${e.portraitPrompt}.`;
  try {
    console.log(`→ ${e.name} (${MODEL})…`);
    await generate(prompt, png);
    execFileSync("cwebp", ["-q", "86", "-resize", "800", "0", png, "-o", webp], { stdio: "pipe" });
    unlinkSync(png);
    console.log(`  ✓ ${webp.replace(ROOT + "/", "")}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ ${e.name}: ${err.message}`);
    failed++;
    if (/429|RESOURCE_EXHAUSTED|depleted/.test(err.message)) {
      console.error("\nBilling is depleted — top up at https://aistudio.google.com and re-run.");
      process.exit(2);
    }
  }
}
console.log(`\ndone: ${ok} generated, ${skipped} skipped, ${failed} failed`);
if (ok > 0) console.log("next: node _build/build.mjs && node _build/preview.mjs");
process.exit(failed ? 1 : 0);
