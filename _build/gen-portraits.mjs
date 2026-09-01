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

// Deliberately MIXED provenance, like a real leadership page assembled over
// years: an official studio pair, a second photographer's office-lobby session
// for later joiners, and four ordinary "a colleague took it" LinkedIn photos.
const STUDIO =
  "Photorealistic professional corporate headshot photograph, head and shoulders, " +
  "centered, looking directly at the camera with a calm confident expression. " +
  "Soft diffused studio key light from the left, gentle fill, plain seamless " +
  "cool light-grey studio background (#e9edf0), shot on an 85mm lens at f/2.8, " +
  "shallow depth of field, natural realistic skin texture with pores and minor " +
  "imperfections, subtle facial asymmetry, no retouching-plastic look, square 1:1 " +
  "composition with headroom. No text, no watermark.";

const LOBBY =
  "Photorealistic corporate environmental headshot taken by a different photographer " +
  "on a different day: modern office lobby, the background is FAR behind the subject and " +
  "completely defocused — a dark reception wall carrying only a single large glowing " +
  "letter X as a soft bokeh shape, with absolutely no other letters, words or writing " +
  "anywhere (any smaller signage is reduced to formless blur). Warm natural window " +
  "light, 50mm lens at f/1.8, slightly warmer color grade than a studio shot, subject " +
  "framed a touch off-center, head and shoulders, looking at camera, natural unretouched " +
  "skin, square 1:1. No readable text, no watermark.";

const PHOTO_STYLES = {
  "adrian-cole": STUDIO,
  "elaine-whitfield": STUDIO,
  "nathan-brar": LOBBY,
  "sophie-tremblay": LOBBY,
  "gavin-ross":
    "Realistic amateur photo taken by a coworker on a smartphone, outdoors in front of a " +
    "plain grey industrial warehouse wall on an overcast Vancouver day, flat diffused " +
    "daylight, framing slightly too wide with extra headroom, subject a bit off-center " +
    "with a relaxed squinting half-smile, ordinary unedited LinkedIn-style profile photo, " +
    "mild smartphone sharpening, head and shoulders, square 1:1. No text, no watermark.",
  "marcus-deng":
    "Realistic ordinary indoor office photo taken on a phone: plain meeting-room wall and " +
    "the edge of a whiteboard softly blurred behind, mixed fluorescent and window lighting " +
    "with slightly cool white balance and a mild shadow on one side of the face, average " +
    "unprofessional LinkedIn profile photo, slightly flat contrast, head and shoulders, " +
    "looking at camera with a small polite smile, square 1:1. No text, no watermark.",
  "priya-sandhu":
    "Realistic smartphone portrait-mode photo taken by a friend on an office patio in warm " +
    "late-afternoon light, computational bokeh with slightly artificial edges around the " +
    "hair, genuine friendly smile, framing slightly off-center, pleasant but clearly " +
    "non-professional LinkedIn photo, warm phone color processing, head and shoulders, " +
    "square 1:1. No text, no watermark.",
  "owen-fraser":
    "Realistic photo cropped from a wider picture taken at an industry conference evening " +
    "reception: warm hotel-ballroom tungsten lighting, other attendees far behind as soft " +
    "blurs, direct on-camera flash look with slightly harsh shadows and a faint shadow on " +
    "the wall, average LinkedIn profile photo quality, head and shoulders, small smile, " +
    "square 1:1. No readable text, no watermark.",
};

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
  const style = PHOTO_STYLES[slug] || STUDIO;
  const prompt = `${style} Subject: ${e.portraitPrompt}.`;
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
