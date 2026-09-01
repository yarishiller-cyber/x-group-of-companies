// =============================================================================
// gen-illustrated.mjs — deterministic illustrated portrait set for the
// executive team: one parametric flat-vector template, eight variants, so the
// leadership grid reads as a single commissioned illustration series.
//
//   node _build/gen-illustrated.mjs        (needs rsvg-convert + cwebp)
//   → assets/img/team/<slug>-illustrated.webp
//
// This is the INTERIM portrait tier: the build prefers a photoreal
// /assets/img/team/<slug>.webp (from gen-portraits.mjs, once Gemini billing
// works), then this illustration, then the monogram avatar.
// =============================================================================
import { writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "assets/img/team");
mkdirSync(OUT, { recursive: true });

// ---- palette helpers --------------------------------------------------------
const SKIN = {
  fair:   { base: "#f0c8a6", shade: "#dfb18c", ear: "#e7bb97" },
  warm:   { base: "#eabe94", shade: "#d8a87c", ear: "#e0b088" },
  tan:    { base: "#cf9d72", shade: "#b9865c", ear: "#c4915f" },
  deep:   { base: "#b07b52", shade: "#996743", ear: "#a4714a" },
};
const BG = "#e9edf0";

// ---- one parametric portrait -----------------------------------------------
// p: {skin, hair:'short'|'bob'|'long', hairColor, hairShade, greyTemples,
//     beard, stubble, glasses, earrings, attire:{jacket,lapel,shirt,tee},
//     smile: 0..1 }
function portrait(p) {
  const s = SKIN[p.skin];
  const layers = [];
  const put = (x) => layers.push(x);

  // background + soft key-light
  put(`<rect width="800" height="800" fill="${BG}"/>`);
  put(`<ellipse cx="400" cy="330" rx="330" ry="300" fill="#f2f5f7" opacity=".55"/>`);

  // long hair sits BEHIND the shoulders
  if (p.hair === "long") {
    put(`<path d="M245 330 C235 480 240 610 265 690 L535 690 C560 610 565 480 555 330 C555 240 490 185 400 185 C310 185 245 240 245 330 Z" fill="${p.hairColor}"/>`);
  }

  // neck + shoulders/attire
  put(`<path d="M357 500 h86 v96 h-86 z" fill="${s.base}"/>`);
  put(`<path d="M357 500 h86 v34 c-28 14 -58 14 -86 0 z" fill="${s.shade}"/>`);
  const A = p.attire;
  put(`<path d="M148 800 C150 690 220 618 316 596 L400 640 L484 596 C580 618 650 690 652 800 Z" fill="${A.jacket}"/>`);
  if (A.tee) {
    // knit/soft-shell: round neckline + collar hint
    put(`<path d="M330 602 C352 636 448 636 470 602 L470 648 C440 668 360 668 330 648 Z" fill="${A.shirt}"/>`);
  } else {
    // shirt V + lapels
    put(`<path d="M340 600 L400 700 L460 600 L440 588 L400 640 L360 588 Z" fill="${A.shirt}"/>`);
    put(`<path d="M316 596 L400 640 L363 700 C330 668 318 636 316 596 Z" fill="${A.lapel}"/>`);
    put(`<path d="M484 596 L400 640 L437 700 C470 668 482 636 484 596 Z" fill="${A.lapel}"/>`);
  }

  // ears + head
  put(`<ellipse cx="272" cy="415" rx="22" ry="30" fill="${s.ear}"/>`);
  put(`<ellipse cx="528" cy="415" rx="22" ry="30" fill="${s.ear}"/>`);
  put(`<path d="M400 190 C305 190 268 268 270 380 C272 480 320 560 400 560 C480 560 528 480 530 380 C532 268 495 190 400 190 Z" fill="${s.base}"/>`);

  // beard / stubble under the face, before hair framing
  if (p.beard) {
    put(`<path d="M286 420 C288 510 330 566 400 566 C470 566 512 510 514 420 C514 470 492 540 400 540 C308 540 286 470 286 420 Z" fill="${p.hairShade}" />`);
    put(`<path d="M296 430 C300 512 338 556 400 556 C462 556 500 512 504 430 C500 500 470 546 400 546 C330 546 300 500 296 430 Z" fill="${p.hairColor}"/>`);
    put(`<path d="M368 508 C388 500 412 500 432 508 C420 492 380 492 368 508 Z" fill="${s.base}"/>`);
  } else if (p.stubble) {
    put(`<path d="M292 430 C296 508 336 552 400 552 C464 552 504 508 508 430 C504 496 468 540 400 540 C332 540 296 496 292 430 Z" fill="${p.hairColor}" opacity=".22"/>`);
  }

  // hair framing
  if (p.hair === "short") {
    put(`<path d="M266 372 C258 258 306 178 400 178 C494 178 542 258 534 372 C534 330 520 300 500 296 C510 260 470 236 440 244 C420 218 348 216 322 252 C292 258 282 300 296 318 C278 322 268 344 266 372 Z" fill="${p.hairColor}"/>`);
    if (p.greyTemples) {
      put(`<path d="M266 360 C266 330 274 314 288 306 C282 330 280 348 280 372 Z" fill="#9aa1a6" opacity=".85"/>`);
      put(`<path d="M534 360 C534 330 526 314 512 306 C518 330 520 348 520 372 Z" fill="#9aa1a6" opacity=".85"/>`);
    }
  } else if (p.hair === "bob") {
    put(`<path d="M400 176 C296 176 252 260 258 380 C260 440 262 500 276 540 C296 548 308 540 306 520 C296 470 294 430 298 388 C312 330 300 300 330 282 C368 258 432 258 470 282 C500 300 488 330 502 388 C506 430 504 470 494 520 C492 540 504 548 524 540 C538 500 540 440 542 380 C548 260 504 176 400 176 Z" fill="${p.hairColor}"/>`);
  } else if (p.hair === "long") {
    put(`<path d="M400 176 C300 176 256 256 262 372 C266 320 288 300 322 286 C364 262 436 262 478 286 C512 300 534 320 538 372 C544 256 500 176 400 176 Z" fill="${p.hairColor}"/>`);
    put(`<path d="M262 350 C250 460 252 560 270 640 L306 640 C292 560 292 460 300 380 Z" fill="${p.hairColor}"/>`);
    put(`<path d="M538 350 C550 460 548 560 530 640 L494 640 C508 560 508 460 500 380 Z" fill="${p.hairColor}"/>`);
  }

  // brows
  put(`<path d="M312 352 C330 340 356 340 372 350" stroke="${p.hairShade}" stroke-width="11" stroke-linecap="round" fill="none"/>`);
  put(`<path d="M428 350 C444 340 470 340 488 352" stroke="${p.hairShade}" stroke-width="11" stroke-linecap="round" fill="none"/>`);

  // eyes
  put(`<ellipse cx="342" cy="398" rx="13" ry="16" fill="#2b2723"/>`);
  put(`<ellipse cx="458" cy="398" rx="13" ry="16" fill="#2b2723"/>`);
  put(`<circle cx="346" cy="392" r="4" fill="#ffffff" opacity=".85"/>`);
  put(`<circle cx="462" cy="392" r="4" fill="#ffffff" opacity=".85"/>`);

  // glasses
  if (p.glasses) {
    const g = `fill="none" stroke="#3c4249" stroke-width="7"`;
    put(`<rect x="300" y="372" width="86" height="58" rx="${p.glasses === "round" ? 28 : 12}" ${g}/>`);
    put(`<rect x="414" y="372" width="86" height="58" rx="${p.glasses === "round" ? 28 : 12}" ${g}/>`);
    put(`<path d="M386 396 C395 390 405 390 414 396" ${g}/>`);
  }

  // nose + mouth (+ optional smile depth)
  put(`<path d="M400 400 C396 428 390 446 384 458 C392 468 408 468 416 458" stroke="${s.shade}" stroke-width="9" stroke-linecap="round" fill="none"/>`);
  const sm = 8 + Math.round(10 * (p.smile ?? 0.5));
  put(`<path d="M362 496 C382 ${496 + sm} 418 ${496 + sm} 438 496" stroke="#8c5f4b" stroke-width="10" stroke-linecap="round" fill="none"/>`);

  // earrings
  if (p.earrings) {
    put(`<circle cx="272" cy="450" r="7" fill="#c9974f"/>`);
    put(`<circle cx="528" cy="450" r="7" fill="#c9974f"/>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">${layers.join("")}</svg>`;
}

// ---- the eight leaders ------------------------------------------------------
const TEAM = [
  { slug: "adrian-cole", skin: "fair", hair: "short", hairColor: "#33302c", hairShade: "#26231f", greyTemples: true,
    attire: { jacket: "#1f3a5a", lapel: "#16293f", shirt: "#f5f2ea" }, smile: 0.45 },
  { slug: "nathan-brar", skin: "tan", hair: "short", hairColor: "#1f1b18", hairShade: "#15120f", beard: true,
    attire: { jacket: "#3a3f46", lapel: "#2b2f35", shirt: "#cfe0ef" }, smile: 0.5 },
  { slug: "elaine-whitfield", skin: "fair", hair: "bob", hairColor: "#cfc4ae", hairShade: "#a89c85", glasses: "rect",
    attire: { jacket: "#1f5c5a", lapel: "#164543", shirt: "#f2ecdd" }, smile: 0.55 },
  { slug: "gavin-ross", skin: "warm", hair: "short", hairColor: "#8f979c", hairShade: "#6f777c", beard: true,
    attire: { jacket: "#4a4f55", lapel: "#3b4046", shirt: "#7d3f3a", tee: true }, smile: 0.5 },
  { slug: "marcus-deng", skin: "warm", hair: "short", hairColor: "#211d1a", hairShade: "#161310", glasses: "rect",
    attire: { jacket: "#2e3138", lapel: "#24262c", shirt: "#3d4750", tee: true }, smile: 0.45 },
  { slug: "priya-sandhu", skin: "deep", hair: "long", hairColor: "#241d18", hairShade: "#181310", earrings: true,
    attire: { jacket: "#6b2434", lapel: "#521a27", shirt: "#1d1d21" }, smile: 0.8 },
  { slug: "owen-fraser", skin: "fair", hair: "short", hairColor: "#7a4a2b", hairShade: "#5f3820", stubble: true,
    attire: { jacket: "#5c6167", lapel: "#4b5056", shirt: "#f5f2ea" }, smile: 0.5 },
  { slug: "sophie-tremblay", skin: "fair", hair: "bob", hairColor: "#5b3a26", hairShade: "#452b1b", earrings: true,
    attire: { jacket: "#26262a", lapel: "#1b1b1f", shirt: "#f5f2ea" }, smile: 0.65 },
];

for (const p of TEAM) {
  const svgPath = join(OUT, `${p.slug}-illustrated.svg`);
  const pngPath = join(OUT, `${p.slug}-illustrated.png`);
  const webpPath = join(OUT, `${p.slug}-illustrated.webp`);
  writeFileSync(svgPath, portrait(p));
  execFileSync("rsvg-convert", ["-w", "800", "-h", "800", svgPath, "-o", pngPath]);
  execFileSync("cwebp", ["-q", "88", pngPath, "-o", webpPath], { stdio: "pipe" });
  unlinkSync(svgPath); unlinkSync(pngPath);
  console.log(`✓ ${p.slug}-illustrated.webp`);
}
console.log("done — 8 illustrated portraits");
