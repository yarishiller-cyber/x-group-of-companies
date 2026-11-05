// =============================================================================
// build.mjs — renders the entire static site from the data files.
//   node _build/build.mjs
// Output: plain static HTML at the repo root (Hostinger web root). No runtime
// build step; the generator is a dev tool (blocked from serving by .htaccess).
// =============================================================================
import { writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { group, contactChannels } from "./data/group.mjs";
import { companies, publishedCompanies, categories, operatingBrandsCount, portfolioCount, essentialBrands } from "./data/companies.mjs";
import { executives, executiveBySlug } from "./data/executives.mjs";
import { metrics, capabilities, investmentModes, investmentAudiences, international,
         principles, milestones, governance, careers, faqs, newsroom, allegroAngle, peopleCluster, founderLetter } from "./data/content.mjs";
import { corporatePages } from "./data/site.mjs";
import { heroes } from "./data/heroes.mjs";
import { page, esc, siteGraph, breadcrumb, personSchema, faqSchema, articleSchema, orgRef, ORG_ID, ASSET_V } from "./lib/layout.mjs";
import { icon, avatar, monogramTile, platformDiagram, capitalFlowDiagram, reachSVG, faviconSVG } from "./lib/assets.mjs";
import * as pages from "./pages.mjs";


// Small shared partial: a soft note/callout box.
const noteBox = (html) => `<p class="note">${html}</p>`;

// Executive portrait, three tiers:
//   1. photoreal /assets/img/team/<slug>.webp   (gen-portraits.mjs — Nano Banana)
//   2. illustrated <slug>-illustrated.webp      (gen-illustrated.mjs — always available)
//   3. monogram avatar                          (never breaks)
// Whichever file exists highest in that order is used, so the site upgrades
// itself automatically the moment better portraits land on disk.
const fileExists = (webPath) => webPath && existsSync(join(ROOT, webPath.replace(/^\//, "")));
const portraitSrc = (e) => {
  if (fileExists(e.photo)) return e.photo;
  const ill = e.photo && e.photo.replace(".webp", "-illustrated.webp");
  if (fileExists(ill)) return ill;
  return null;
};
const hasPortrait = (e) => portraitSrc(e) !== null;
const portraitImg = (e, cls) =>
  `<img class="${cls}" src="${portraitSrc(e)}" width="800" height="800" alt="Portrait of ${esc(e.name)}, ${esc(e.title)}." loading="lazy" decoding="async">`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const out = (rel, html) => {
  const p = join(ROOT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, html);
  return rel;
};
const written = [];
const emit = (rel, html) => { written.push(out(rel, html)); };

const mail = (addr) => `<a class="email" href="mailto:${esc(addr)}">${esc(addr)}</a>`;

// ---------------------------------------------------------------- partials
function sectionHead({ eyebrow, title, lead, center, cls = "" }) {
  return `<div class="sec-head ${center ? "center" : ""} ${cls}">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
    <h2 class="h2">${title}</h2>
    ${lead ? `<p class="lead">${lead}</p>` : ""}
  </div>`;
}

function crumb(items) {
  return `<nav class="crumb" aria-label="Breadcrumb">${items.map((it, i) =>
    (i ? `<span>›</span>` : "") + (it.href ? `<a href="${it.href}">${esc(it.name)}</a>` : `<em>${esc(it.name)}</em>`)
  ).join("")}</nav>`;
}

// Every page-hero carries a page-specific Nano Banana background (see
// data/heroes.mjs + gen-heroes.mjs). Falls back to the plain band only if the
// image hasn't been generated yet, so the build never breaks.
const heroImg = (key) => `/assets/img/heroes/${key}.webp`;
function pageHero(heroKey, inner, { extra = "" } = {}) {
  const h = heroes[heroKey];
  if (!h || !fileExists(heroImg(heroKey)))
    return `<section class="page-hero"><div class="wrap">${inner}</div></section>${extra}`;
  return `<section class="page-hero page-hero--img">
  <img class="page-hero-bg" src="${heroImg(heroKey)}" alt="${esc(h.alt)}" width="1600" height="686" loading="eager" fetchpriority="high" decoding="async">
  <div class="page-hero-scrim" aria-hidden="true"></div>
  <div class="wrap">${inner}</div>
</section>${extra}`;
}
// preload target for a page's hero (undefined when the image doesn't exist)
const heroPreload = (key) => (heroes[key] && fileExists(heroImg(key)) ? heroImg(key) : undefined);

// Real-website screenshot for a company, captured from the live site
// (assets/img/sites/<slug>.webp). Companies without one (Allegro X AI) fall
// back to their monogram treatment.
const siteShot = (c) => (fileExists(`/assets/img/sites/${c.slug}.webp`) ? `/assets/img/sites/${c.slug}.webp` : null);
const siteShotImg = (c, cls = "co-shot-img") => {
  const s = siteShot(c);
  return s ? `<img class="${cls}" src="${s}" width="640" height="400" alt="Screenshot of the ${esc(c.name)} website, ${esc(c.domain)}." loading="lazy" decoding="async">` : "";
};

const companyCard = (c) => pages.companyCard(ctx, c);

function ctaBand({ title, body, actions }) {
  return `<section class="section"><div class="wrap"><div class="cta-band" data-reveal>
    <div><h2>${title}</h2><p>${body}</p></div>
    <div class="cta-actions">${actions}</div>
  </div></div></section>`;
}

// ---------------------------------------------------------------- render context
// Everything the templates in pages.mjs need: data + the partials above.
const ctx = {
  group, contactChannels, companies, publishedCompanies, categories, operatingBrandsCount, portfolioCount, essentialBrands,
  executives, executiveBySlug, metrics, capabilities, investmentModes, investmentAudiences, international, principles,
  milestones, governance, careers, faqs, newsroom, allegroAngle, peopleCluster, founderLetter, corporatePages, heroes,
  page, esc, siteGraph, breadcrumb, personSchema, faqSchema, articleSchema, orgRef, ORG_ID, ASSET_V,
  icon, avatar, monogramTile, platformDiagram, capitalFlowDiagram, reachSVG,
  noteBox, fileExists, portraitSrc, hasPortrait, portraitImg, mail, sectionHead, crumb, heroImg, pageHero, heroPreload,
  siteShot, siteShotImg, ctaBand,
};

// ---------------------------------------------------------------- HOME
function home() { return pages.home(ctx); }

// ---------------------------------------------------------------- GROUP
function groupPage() {
  const main = `
${pageHero("group", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Group" }])}
  <p class="eyebrow">The Group</p>
  <h1>Built from operating experience — organized to last</h1>
  <p class="lead">${esc(group.legalName)} is a ${esc(group.descriptor)} that builds, acquires and supports essential-service and technology businesses.</p>`)}

<section class="section"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Our thesis</p>
    <h2 class="h2">Local brands. Central operating infrastructure. Disciplined capital allocation.</h2>
    <p>The strongest version of this group is not a collection of businesses made to look larger than it is. It is the opposite: a set of real operating companies that now share owners, systems, purchasing power and management — so we built a parent to run the shared machinery well and to decide where capital goes next.</p>
    <p>We centralize the functions that benefit from scale — finance, procurement, people, technology, marketing and strategy — while our operating companies stay focused on their customers and local markets. We invest our own capital and operating expertise in durable businesses, and we evaluate acquisitions, partnerships and new-market opportunities in Canada and selected international markets.</p>
  </div>
  <div data-reveal="right">
    <ul class="vlist">
      ${group.creed.map(s => `<li>${icon("check")}<span><b>${esc(s)}</b></span></li>`).join("")}
    </ul>
    <div class="card" style="margin-top:1.4rem">
      <p class="eyebrow" style="margin-bottom:.5rem">At a glance</p>
      <dl class="deflist">
        <dt>Descriptor</dt><dd>${esc(group.descriptor)}</dd>
        <dt>Head office</dt><dd>${esc(group.headquarters)}</dd>
        <dt>Sectors</dt><dd>${group.sectors.map(esc).join(" · ")}</dd>
        <dt>Companies</dt><dd>${publishedCompanies.length} operating companies & brands</dd>
      </dl>
      <a class="textlink" href="/corporate-information">Corporate information ${icon("arrow","icon")}</a>
    </div>
  </div>
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "How value compounds", title: "The economic narrative", lead: "Shared infrastructure lets lean operating brands run with lower overhead, better execution and better data. That produces cash flow — which funds disciplined capital allocation into existing companies, acquisitions and new markets.", center: true })}
  <div style="max-width:880px;margin-inline:auto" data-reveal>${pages.flywheel()}</div>
</div></section>

<section class="section"><div class="wrap">
  ${sectionHead({ eyebrow: "What sits where", title: "A conventional Canadian structure" })}
  <div class="grid grid-3" data-stagger>
    <div class="card"><h3>Group services & management</h3><p>Finance, procurement, people, technology, growth and operations — supplied centrally to the operating companies.</p></div>
    <div class="card"><h3>Operating companies</h3><p>Essential home services, industrial field services and technology — each with its own team, market and brand.</p></div>
    <div class="card"><h3>Investments & international</h3><p>Canadian acquisitions, joint ventures, greenfield projects and selected international market development.</p></div>
  </div>
  <p class="note" style="margin-top:1.4rem;font-size:.87rem;color:var(--ink-faint);background:var(--surface-2);border-left:3px solid var(--brand-line);padding:.9rem 1.1rem;border-radius:0 8px 8px 0;max-width:70ch">Whether each function sits in a separate corporation is a legal and tax question, decided with Canadian counsel and a CPA — not by a website diagram. This page describes the functions the Group performs, which is what matters here.</p>
</div></section>

<section class="section section--alt"><div class="wrap">
  ${sectionHead({ eyebrow: "Our story", title: "How the Group came together", lead: "X Group was not designed to look large. It emerged because real operating businesses ended up sharing owners, systems and management — and that machinery deserved to be run well." })}
  <ol class="timeline" data-stagger>
    ${milestones.map(m => `<li class="tl-item"><div class="tl-year">${esc(m.year)}</div><div class="tl-body"><h3>${esc(m.title)}</h3><p>${esc(m.body)}</p></div></li>`).join("")}
  </ol>
</div></section>

<section class="section"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Governance</p>
    <h2 class="h2">Held to a standard beyond what a private group requires</h2>
    <p>Because our counterparties — banks, insurers, acquirers, partners and government agencies — expect it, we maintain a board, committee structure and a full policy framework: a Code of Conduct, anti-bribery and sanctions-compliance policies, and beneficial-ownership records designed to withstand third-party due diligence.</p>
    <p style="margin-top:1.3rem"><a class="btn btn-ghost" href="/governance">Governance & board ${icon("arrow","icon")}</a></p>
  </div>
  <div class="grid" data-reveal="right" style="gap:.8rem">
    ${governance.responsibility.map(r => `<div class="card" style="padding:1.1rem 1.3rem"><h3 style="font-size:1.02rem">${esc(r.title)}</h3><p style="margin:.35rem 0 0;color:var(--ink-soft);font-size:.92rem">${esc(r.body)}</p></div>`).join("")}
  </div>
</div></section>

${ctaBand({ title: "Understand the operating model", body: "See how a shared platform lets many local brands run lean — and why that makes the parent worth having.",
  actions: `<a class="btn btn-onDark" href="/operating-model">Operating model ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/leadership">Leadership</a>` })}
`;
  return page({ title: "Group", path: "/group",
    preloadImage: heroPreload("group"),
    description: `${group.brandName} is a ${group.descriptor}: local brands, central operating infrastructure and disciplined capital allocation, based in Vancouver, BC.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Group", href: "/group" }])], main });
}

// ---------------------------------------------------------------- COMPANIES (index)
function companiesPage() { return pages.companiesPage(ctx); }

// ---------------------------------------------------------------- COMPANY DETAIL
function companyDetail(c) { return pages.companyDetail(ctx, c); }

// ---------------------------------------------------------------- OPERATING MODEL
function operatingModelPage() { return pages.operatingModelPage(ctx); }

// ---------------------------------------------------------------- INVESTMENTS
function investmentsPage() { return pages.investmentsPage(ctx); }

// ---------------------------------------------------------------- INTERNATIONAL
function internationalPage() {
  const areas = international.evaluateAreas.map(a => `<article class="card" data-reveal><h3 style="font-size:1.1rem">${esc(a.title)}</h3><p style="color:var(--ink-soft);margin-top:.5rem">${esc(a.body)}</p></article>`).join("");
  const marketCards = international.markets.map(m => { const iso = (pages.REACH.markets.find(r => r.country === m.country) || {}).iso || ""; return `<article class="market" data-key="${iso}"><h3>${icon("pin")}${esc(m.country)}</h3><p>${esc(m.note)}</p></article>`; }).join("");
  const tags = international.agencyTopics.map(t => `<span class="tag">${esc(t)}</span>`).join("");
  const main = `
${pageHero("international", `
  ${crumb([{ name: "Home", href: "/" }, { name: "International" }])}
  <p class="eyebrow">International</p>
  <h1>International opportunities</h1>
  <p class="lead">${esc(international.intro[0])}</p>`)}

<section class="section"><div class="wrap measure">
  <p>${esc(international.intro[1])}</p>
</div></section>

${pages.reachSection(ctx)}

<section class="section"><div class="wrap">
  ${sectionHead({ eyebrow: "What we evaluate", title: "Areas we study before we commit" })}
  <div class="grid grid-3" data-stagger>${areas}</div>
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "Markets under study", title: international.region, lead: "One of several regions we are studying. We have not selected a destination, and this page deliberately does not rank markets. Russia and Belarus are excluded from our market-entry program; see our sanctions policy." })}
  <div class="markets" data-stagger data-hover-group="reach">${marketCards}</div>
  <p style="margin-top:1.3rem;color:var(--ink-soft);max-width:75ch">${esc(international.canadaNote)}</p>
</div></section>

<section class="section"><div class="wrap">
  <div class="card" data-reveal style="background:var(--brand-tint);border-color:var(--brand-line)">
    <p class="eyebrow" style="color:var(--brand)">For investment-promotion agencies</p>
    <h2 class="h2" style="font-size:var(--t-h3)">We welcome an introductory conversation</h2>
    <p style="color:var(--ink-soft);max-width:75ch">We welcome dialogue with national and regional investment agencies, technology parks, trade organizations and economic-development authorities regarding:</p>
    <div class="tags" style="margin:1rem 0 1.4rem">${tags}</div>
    <a class="btn btn-solid" href="/contact#international">Government & international partnerships ${icon("arrow","icon")}</a>
    <p style="margin-top:1rem;font-size:.9rem"><span style="color:var(--ink-faint)">Direct line:</span> ${mail(group.emails.international)}</p>
  </div>
</div></section>
`;
  return page({ title: "International", path: "/international",
    preloadImage: heroPreload("international"),
    description: `${group.brandName} evaluates selected international markets — shared services, technology and AI, partnerships and acquisitions. A direct line for investment-promotion agencies and technology parks.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "International", href: "/international" }])], main });
}

// ---------------------------------------------------------------- LEADERSHIP
function leadershipPage() { return pages.leadershipPage(ctx); }
const executivePage = (e) => pages.executivePage(ctx, e);
const insightsPage = () => pages.insightsPage(ctx);
const founderLetterPage = () => pages.founderLetterPage(ctx);
const delegationsPage = () => pages.delegationsPage(ctx);
const ruPage = () => pages.ruPage(ctx);

// ---------------------------------------------------------------- NEWSROOM
function newsroomPage() {
  const items = newsroom.map(n => `<a class="insight" href="/news/${n.slug}" data-reveal>
      <span class="insight-date">${esc(n.type)}<br>${esc(n.dateLabel)} · ${n.readMins} min</span>
      <div><h3>${esc(n.title)}</h3><p>${esc(n.summary)}</p><span class="insight-more textlink">Read ${icon("arrow","icon-xs")}</span></div>
    </a>`).join("");
  const main = `
${pageHero("news", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Newsroom" }])}
  <p class="eyebrow">Newsroom</p>
  <h1>News &amp; perspectives</h1>
  <p class="lead">Announcements from X Group and plain-language perspectives on the operating-holding-company model, shared infrastructure and how we approach new markets. For media inquiries, contact ${mail(group.emails.media)}.</p>`)}
<section class="section"><div class="wrap"><div class="insight-list">${items}</div></div></section>
`;
  return page({ title: "Newsroom", path: "/news",
    preloadImage: heroPreload("news"),
    description: `News and perspectives from ${group.brandName} — announcements and plain-language notes on operating-holding-company strategy, shared infrastructure and international market development.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Newsroom", href: "/news" }])], main });
}

function newsArticle(n) {
  const isNews = n.type === "Announcement";
  const body = n.body.map(par => `<p>${esc(par)}</p>`).join("");
  const main = `
${pageHero("news", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Newsroom", href: "/news" }, { name: n.title }])}
  <p class="eyebrow">${esc(n.type)} · ${esc(n.dateLabel)}</p>
  <h1>${esc(n.title)}</h1>
  <p class="lead">${esc(n.summary)}</p>`)}
<section class="section"><div class="wrap">
  <article class="article">
    <p class="article-meta">${esc(n.dateLabel)} · ${n.readMins} min read</p>
    ${body}
    <p style="margin-top:2rem"><a class="textlink" href="/news">${icon("arrow","icon-xs")} All news &amp; perspectives</a></p>
  </article>
</div></section>
`;
  return page({ title: n.title, path: `/news/${n.slug}`, description: n.summary, preloadImage: heroPreload("news"),
    jsonld: [articleSchema(n, isNews ? "Announcement" : "Perspective", isNews),
             breadcrumb([{ name: "Home", href: "/" }, { name: "Newsroom", href: "/news" }, { name: n.title, href: `/news/${n.slug}` }])], main });
}

// ---------------------------------------------------------------- GOVERNANCE
function governancePage() { return pages.governancePage(ctx); }

// ---------------------------------------------------------------- CAREERS
function careersPage() {
  const why = careers.why.map(w => `<article class="card cap" data-reveal>${icon(w.icon)}<h3>${esc(w.title)}</h3><p>${esc(w.body)}</p></article>`).join("");
  const areas = careers.areas.map(a => `<span class="tag">${esc(a)}</span>`).join("");
  const main = `
${pageHero("careers", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Careers" }])}
  <p class="eyebrow">Careers</p>
  <h1>Build a career across the Group</h1>
  <p class="lead">${esc(careers.lead)}</p>`)}

<section class="section"><div class="wrap">
  ${sectionHead({ eyebrow: "Why X Group", title: "A bigger platform behind local work" })}
  <div class="grid grid-3" data-stagger>${why}</div>
</div></section>

<section class="section section--alt"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Where we hire</p>
    <h2 class="h2">Across the Group and its brands</h2>
    <p>${esc(careers.where)}</p>
    <div class="tags" style="margin-top:1.2rem">${areas}</div>
  </div>
  <figure class="media--treated" data-reveal="right">
    <img src="/assets/img/technician-onsite.webp" width="900" height="600" alt="A technician in branded workwear servicing equipment on site." loading="lazy">
    <figcaption class="media-cap" style="padding:.6rem .9rem 0">Real work, real tools, real training.</figcaption>
  </figure>
</div></section>

${ctaBand({ title: "Interested in joining?", body: "Send a note and a résumé to our people team — tell us what you do and where you'd like to do it.",
  actions: `<a class="btn btn-onDark" href="mailto:${group.emails.careers}">${icon("mail","icon")} ${esc(group.emails.careers)}</a>` })}
`;
  return page({ title: "Careers", path: "/careers",
    preloadImage: heroPreload("careers"),
    description: `Careers at ${group.brandName} — field technicians, coordinators, brand managers, and central finance, technology, people and growth roles across British Columbia and beyond.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Careers", href: "/careers" }])], main });
}

// ---------------------------------------------------------------- FAQ
function faqPage() {
  const items = faqs.map(f => `<details class="faq-item" data-reveal>
      <summary><span>${esc(f.q)}</span>${icon("chevron","icon")}</summary>
      <div class="faq-a"><p>${esc(f.a)}</p></div>
    </details>`).join("");
  const main = `
${pageHero("faq", `
  ${crumb([{ name: "Home", href: "/" }, { name: "FAQ" }])}
  <p class="eyebrow">Frequently asked questions</p>
  <h1>About X Group</h1>
  <p class="lead">Straight answers to what people — customers, business owners, partners, journalists and investment agencies — most often ask about X Group, what it owns, and what it is trying to do.</p>`)}
<section class="section"><div class="wrap" style="max-width:820px">
  <div class="faq-list">${items}</div>
  <p style="margin-top:1.8rem"><a class="btn btn-ghost" href="/contact">Ask us something else ${icon("arrow","icon")}</a></p>
</div></section>
`;
  return page({ title: "FAQ", path: "/faq",
    preloadImage: heroPreload("faq"),
    description: `Answers to common questions about ${group.brandName} — what it is, what it owns, where it's based, whether it's acquiring or hiring, and its international plans.`,
    jsonld: [faqSchema(faqs), breadcrumb([{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }])], main });
}

// ---------------------------------------------------------------- CONTACT
function contactPage() { return pages.contactPage(ctx); }

// ---------------------------------------------------------------- GROUP PROFILE
function groupProfilePage() { return pages.groupProfilePage(ctx); }

// ---------------------------------------------------------------- DOC PAGES (legal/compliance)
function docPage(slug, data) {
  const blocks = data.blocks.map(b => {
    if (b.h) return `<h2>${esc(b.h)}</h2>`;
    if (b.p) return `<p>${esc(b.p)}</p>`;
    if (b.list) return `<ul class="bullets">${b.list.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
    if (b.note) return `<p class="note">${esc(b.note)}</p>`;
    if (b.defs) return `<dl class="deflist">${b.defs.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`;
    return "";
  }).join("");
  const main = `
${pageHero(slug, `
  ${crumb([{ name: "Home", href: "/" }, { name: data.title }])}
  <p class="eyebrow">Corporate</p>
  <h1>${esc(data.title)}</h1>
  ${data.lead ? `<p class="lead">${esc(data.lead)}</p>` : ""}`)}
<section class="section"><div class="wrap"><div class="doc" data-reveal>${blocks}</div></div></section>
`;
  return page({ title: data.title, path: `/${slug}`, description: data.lead || `${data.title} — ${group.brandName}.`,
    preloadImage: heroPreload(slug),
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: data.title, href: `/${slug}` }])], main });
}

// ---------------------------------------------------------------- 404
function notFound() {
  const main = pageHero("group", `
    <p class="eyebrow">404</p><h1>Page not found</h1>
    <p class="lead">The page you're looking for isn't here. Try the Group, our companies, or contact us.</p>
    <div class="hero-actions" style="margin-top:1.5rem">
      <a class="btn btn-onDark" href="/">Home</a>
      <a class="btn btn-lineDark" href="/companies">Our companies</a>
    </div>`);
  return page({ title: "Page not found", path: "/404", description: "Page not found.", main });
}

// ---------------------------------------------------------------- infra files
function robots() {
  // Maximum discoverability: allow both AI-search (citation) crawlers and
  // training crawlers. Explicit allows make intent unambiguous to each engine.
  const aiBots = ["OAI-SearchBot","ChatGPT-User","GPTBot","PerplexityBot","Perplexity-User",
    "ClaudeBot","Claude-SearchBot","Claude-User","Applebot","Applebot-Extended","Bingbot",
    "Googlebot","Google-Extended","CCBot","Amazonbot","Bytespider","cohere-ai","Meta-ExternalAgent"];
  return `# ${group.brandName} — robots.txt
# Search, answer-engine and AI crawlers are welcome across the whole site.
${aiBots.map(b => `User-agent: ${b}\nAllow: /`).join("\n")}

User-agent: *
Allow: /
Disallow: /_build/

Sitemap: ${group.baseUrl}/sitemap.xml
`;
}
function sitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.map(r => `  <url><loc>${group.baseUrl}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
function manifest() {
  return JSON.stringify({
    name: group.legalName, short_name: group.brandName, start_url: "/", display: "standalone",
    background_color: "#0c2a3a", theme_color: "#0c2a3a",
    icons: [
      { src: "/android-chrome-192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  }, null, 2);
}
function htaccess() {
  return `# ${group.brandName} — Hostinger (Apache) production config
Options +FollowSymLinks -Indexes
DirectoryIndex index.html
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Canonical host: www -> root
RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]

# Clean URLs: /page -> /page.html (only when no real dir/file matches).
# Directories with an index (/companies, /insights) are served by DirectoryIndex.
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^.]+?)/?$ $1.html [L]

# MIME
AddType image/webp .webp
AddType image/svg+xml .svg
AddType application/manifest+json .webmanifest

# Protect internals
RedirectMatch 404 ^/_build/
<FilesMatch "\\.(mjs|md|sh|gitignore)$">
  Require all denied
</FilesMatch>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/json
</IfModule>

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
<IfModule mod_headers.c>
  <FilesMatch "\\.(webp|png|jpe?g|svg|css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

ErrorDocument 404 /404.html
`;
}

// ================================================================ RUN
console.log("Building " + group.brandName + " site…");

// clean previously generated html (leave assets/_build/.git)
for (const f of ["index.html","group.html","operating-model.html","investments.html","international.html","leadership.html","governance.html","careers.html","faq.html","contact.html","group-profile.html","corporate-information.html","privacy.html","terms.html","code-of-conduct.html","anti-bribery.html","sanctions.html","accessibility.html","security.html","delegations.html","404.html"]) {
  const p = join(ROOT, f); if (existsSync(p)) rmSync(p);
}
for (const d of ["companies","insights","news","leadership","ru"]) {
  if (existsSync(join(ROOT, d))) rmSync(join(ROOT, d), { recursive: true });
}

emit("index.html", home());
emit("group.html", groupPage());
emit("companies/index.html", companiesPage());
for (const c of publishedCompanies) emit(`companies/${c.slug}.html`, companyDetail(c));
emit("operating-model.html", operatingModelPage());
emit("investments.html", investmentsPage());
emit("international.html", internationalPage());
emit("delegations.html", delegationsPage());
emit("leadership/index.html", leadershipPage());
for (const e of executives) emit(`leadership/${e.slug}.html`, executivePage(e));
emit("governance.html", governancePage());
emit("careers.html", careersPage());
emit("faq.html", faqPage());
emit("news/index.html", newsroomPage());
for (const n of newsroom) emit(`news/${n.slug}.html`, newsArticle(n));
emit("insights/index.html", insightsPage());
emit(`insights/${founderLetter.slug}.html`, founderLetterPage());
emit("contact.html", contactPage());
emit("group-profile.html", groupProfilePage());
for (const [slug, data] of Object.entries(corporatePages)) emit(`${slug}.html`, docPage(slug, data));
emit("ru/index.html", ruPage());
emit("404.html", notFound());

// infra
const routes = ["/","/group","/companies", ...publishedCompanies.map(c => `/companies/${c.slug}`),
  "/operating-model","/investments","/international","/delegations",
  "/leadership", ...executives.map(e => `/leadership/${e.slug}`),
  "/governance","/careers","/faq","/news",
  ...newsroom.map(n => `/news/${n.slug}`),
  "/insights", `/insights/${founderLetter.slug}`,
  "/contact","/group-profile","/corporate-information","/code-of-conduct","/anti-bribery","/sanctions",
  "/privacy","/terms","/accessibility","/security","/ru/"];
// RFC 9116 vulnerability-disclosure pointer (Contact + Expires required).
const expires = new Date(Date.now() + 364 * 24 * 3600 * 1000).toISOString().replace(/\.\d+Z$/, "Z");
emit(".well-known/security.txt", `Contact: mailto:${group.emails.security}
Expires: ${expires}
Policy: ${group.baseUrl}/security
Canonical: ${group.baseUrl}/.well-known/security.txt
Preferred-Languages: en, fr
`);
emit("robots.txt", robots());
emit("sitemap.xml", sitemap(routes));
emit("site.webmanifest", manifest());
emit(".htaccess", htaccess());
emit("favicon.svg", faviconSVG());

console.log(`✓ wrote ${written.length} files`);
console.log(`  pages: ${routes.length} routes`);
