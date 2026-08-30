// =============================================================================
// preview.mjs — bundle the whole built site into ONE self-contained HTML file
// (hash-routed, images inlined) so it can be previewed anywhere — e.g. as a
// Claude artifact — before a real domain is connected.
//
//   node _build/build.mjs && node _build/preview.mjs
//   → writes _build/preview.html   (never deployed; _build/ is blocked)
// =============================================================================
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, relative } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ---- collect built pages ----------------------------------------------------
function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    if (["_build", ".git", "node_modules", "docs"].includes(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (extname(p) === ".html") acc.push(p);
  }
  return acc;
}
const files = walk(ROOT);

const routeOf = (file) => {
  let rel = relative(ROOT, file).replace(/\\/g, "/").replace(/\.html$/, "");
  if (rel === "index") return "/";
  if (rel.endsWith("/index")) return "/" + rel.slice(0, -"/index".length);
  return "/" + rel;
};

// ---- inline images as data URIs --------------------------------------------
const IMG_DIR = join(ROOT, "assets/img");
const dataUris = {};
(function walkImgs(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { walkImgs(p); continue; }
    const mime = f.endsWith(".webp") ? "image/webp" : f.endsWith(".png") ? "image/png" : null;
    if (!mime) continue;
    const url = "/" + relative(ROOT, p).replace(/\\/g, "/");
    dataUris[url] = `data:${mime};base64,${readFileSync(p).toString("base64")}`;
  }
})(IMG_DIR);
const inlineImages = (html) => {
  for (const [src, uri] of Object.entries(dataUris)) html = html.split(`src="${src}"`).join(`src="${uri}"`);
  return html;
};

// ---- shared chrome from the home page ---------------------------------------
const homeHtml = readFileSync(join(ROOT, "index.html"), "utf8");
const headerHtml = homeHtml.match(/<header class="site-header"[\s\S]*?<\/header>/)[0];
const footerHtml = inlineImages(homeHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0]);
const css = readFileSync(join(ROOT, "assets/css/styles.css"), "utf8");

// ---- per-page templates ------------------------------------------------------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const templates = files.map((file) => {
  const html = readFileSync(file, "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/) || [, "X Group"])[1];
  const main = (html.match(/<main id="main">([\s\S]*?)<\/main>\s*<footer/) || html.match(/<main id="main">([\s\S]*?)<\/main>/))[1];
  return `<template data-route="${esc(routeOf(file))}" data-title="${esc(title)}">${inlineImages(main)}</template>`;
}).join("\n");

// ---- the preview shell -------------------------------------------------------
const out = `<title>X Group Preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter:wght@400;500;600;700&display=swap">
<style>
${css}
/* ---- preview-only chrome ---- */
.pv-banner{background:#081a22;color:#9fbccb;font:600 .78rem/1 "Inter",system-ui,sans-serif;letter-spacing:.04em;
  padding:.55rem 1rem;text-align:center}
.pv-banner b{color:#e6c9a8;font-weight:700}
</style>
<div class="pv-banner">PREVIEW · X Group corporate website — deploys from GitHub <b>main</b>; not yet on a public domain</div>
<a class="skip" href="#main">Skip to content</a>
${headerHtml}
<main id="main"><div id="app"></div></main>
${footerHtml}
${templates}
<script>
(function () {
  "use strict";
  document.documentElement.className += " js-anim";
  var app = document.getElementById("app");
  var tpls = {};
  document.querySelectorAll("template[data-route]").forEach(function (t) { tpls[t.dataset.route] = t; });

  // ---- reveal engine (per render) ----
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var io = null, failsafe = null;
  function arm() {
    if (io) io.disconnect();
    if (failsafe) clearTimeout(failsafe);
    document.documentElement.classList.remove("reveal-all");
    var els = Array.prototype.slice.call(app.querySelectorAll("[data-reveal]"));
    app.querySelectorAll("[data-stagger]").forEach(function (g) {
      Array.prototype.slice.call(g.children).forEach(function (c, i) {
        if (!c.hasAttribute("data-reveal")) c.setAttribute("data-reveal", "");
        c.style.transitionDelay = Math.min(i * 70, 500) + "ms";
        if (els.indexOf(c) === -1) els.push(c);
      });
    });
    function all() { els.forEach(function (el) { el.classList.add("is-in"); }); }
    if (reduce || !("IntersectionObserver" in window)) { all(); return; }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
    failsafe = setTimeout(all, 2600);
  }

  // ---- router ----
  function parse() {
    var h = location.hash.slice(1) || "/";
    var parts = h.split("~");
    return { route: parts[0] || "/", anchor: parts[1] };
  }
  function render() {
    var st = parse();
    var tpl = tpls[st.route] || tpls["/404"];
    app.innerHTML = tpl.innerHTML;
    document.title = tpl.dataset.title;
    document.querySelectorAll(".primary a, .mobile-nav a, .dd a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === st.route) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    arm();
    if (st.anchor) {
      var t = document.getElementById(st.anchor);
      if (t) { t.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", render);

  // ---- intercept internal links ----
  var toggle = document.querySelector(".nav-toggle");
  var mnav = document.getElementById("mobile-nav");
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (a) {
      var href = a.getAttribute("href");
      if (href && href.charAt(0) === "/") {
        e.preventDefault();
        var parts = href.split("#");
        var next = "#" + parts[0] + (parts[1] ? "~" + parts[1] : "");
        if (next === location.hash) render(); else location.hash = next;
        if (mnav && a.closest("#mobile-nav")) { toggle.setAttribute("aria-expanded", "false"); mnav.hidden = true; }
      }
    }
    if (!e.target.closest(".has-dd")) {
      document.querySelectorAll(".nav-top").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    }
  });

  // ---- header behaviours (static shell, bind once) ----
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.setAttribute("data-scrolled", "");
      else header.removeAttribute("data-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  if (toggle && mnav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mnav.hidden = open;
    });
  }
  document.querySelectorAll(".nav-top").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var open = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".nav-top").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      btn.setAttribute("aria-expanded", String(!open));
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.querySelectorAll(".nav-top").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
  });

  render();
})();
</script>
`;

writeFileSync(join(ROOT, "_build/preview.html"), out);
console.log(`✓ _build/preview.html — ${files.length} pages bundled, ${(out.length / 1024 / 1024).toFixed(2)} MB`);
