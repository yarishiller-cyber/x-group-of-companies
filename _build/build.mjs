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
import { companies, publishedCompanies, categories, operatingBrandsCount } from "./data/companies.mjs";
import { executives } from "./data/executives.mjs";
import { metrics, capabilities, investmentModes, investmentAudiences, international,
         principles, milestones, governance, careers, faqs, newsroom } from "./data/content.mjs";
import { corporatePages } from "./data/site.mjs";
import { heroes } from "./data/heroes.mjs";
import { page, esc, siteGraph, breadcrumb, personSchema, faqSchema, articleSchema, orgRef, ORG_ID, ASSET_V } from "./lib/layout.mjs";
import { icon, avatar, monogramTile, platformDiagram, capitalFlowDiagram, reachSVG, faviconSVG } from "./lib/assets.mjs";

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

function companyCard(c, id) {
  const founded = c.founded ? `<span>${icon("build", "icon-xs")} Est. ${c.founded}</span>` : "";
  const shot = siteShot(c)
    ? `<a class="co-shot" href="${c.website}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">${siteShotImg(c)}<span class="co-shot-domain">${esc(c.domain)}</span></a>`
    : `<div class="co-shot co-shot--mono" style="--tint:${c.tint}" aria-hidden="true"><span class="co-shot-mono">${esc(c.monogram)}</span><span class="co-shot-domain">${esc(c.domain)}</span></div>`;
  return `<article class="card co-card" data-reveal>
    ${shot}
    <div class="co-head">
      ${monogramTile(c, id)}
      <div class="co-title">
        <h3>${esc(c.name)}</h3>
        <span class="co-relationship">${esc(c.relationshipLabel)}</span>
      </div>
    </div>
    <span class="co-sector">${esc(c.category)} · ${esc(c.geography.join(", "))}</span>
    <p>${esc(c.short)}</p>
    <div class="co-meta">${founded}</div>
    <div class="co-foot">
      <a class="co-visit textlink" href="/companies/${c.slug}">Company profile ${icon("arrow","icon-xs")}</a>
      <a class="textlink" href="${c.website}" target="_blank" rel="noopener">Visit ${icon("ext","icon-xs")}</a>
    </div>
  </article>`;
}

function ctaBand({ title, body, actions }) {
  return `<section class="section"><div class="wrap"><div class="cta-band" data-reveal>
    <div><h2>${title}</h2><p>${body}</p></div>
    <div class="cta-actions">${actions}</div>
  </div></div></section>`;
}

// ---------------------------------------------------------------- HOME
function home() {
  const featured = publishedCompanies.filter(c => c.featured);
  const facts = metrics.items.map(m =>
    `<div class="fact"><b>${esc(m.value)}</b><span class="fact-label">${esc(m.label)}</span><span class="fact-note">${esc(m.note)}</span></div>`).join("");
  const modes = investmentModes.map(m => `<div class="mode"><b>${esc(m.verb)}</b><p>${esc(m.body)}</p></div>`).join("");
  const execStrip = executives.slice(0, 5).map((e, i) =>
    `<div class="exec-mini">${hasPortrait(e) ? portraitImg(e, "exec-avatar") : avatar(e.initials, "h" + i)}<div><b>${esc(e.name)}</b><span>${esc(e.title)}</span></div></div>`).join("");

  const main = `
<section class="hero">
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <p class="eyebrow hero-eyebrow">${esc(group.descriptor)}</p>
      <h1 data-reveal>${esc(group.tagline)}</h1>
      <p class="lead" data-reveal data-reveal-delay="0.08">${esc(group.positioning)} We centralize the capabilities that benefit from scale while keeping our operating companies close to the customers and communities they serve.</p>
      <div class="hero-actions" data-reveal data-reveal-delay="0.16">
        <a class="btn btn-onDark" href="/companies">Explore our companies ${icon("arrow","icon")}</a>
        <a class="btn btn-lineDark" href="/operating-model">Our operating model</a>
      </div>
    </div>
    <figure class="hero-media" data-reveal="right" data-reveal-delay="0.1">
      <div class="frame"><img src="/assets/img/hero-field-service.webp" width="1200" height="900"
        alt="A branded Hydraulic Hero service truck on an industrial job site beside heavy equipment in British Columbia." loading="eager" fetchpriority="high" decoding="async"></div>
      <div class="hero-badge">${icon("pin")}<div><b>Vancouver, Canada</b><span>Operator-led, since our first service brand</span></div></div>
    </figure>
  </div>
</section>

<section class="factstrip"><div class="wrap">${facts}</div></section>
<p class="factstrip-note">Figures as of ${esc(metrics.asOf)}. ${esc(metrics.hqLine)}.</p>

<section class="section">
  <div class="wrap split split--wide">
    <div data-reveal>
      <p class="eyebrow">What we are</p>
      <h2 class="h2">An operating group, not a brand exercise</h2>
      <p class="lead">A real group emerged because several operating businesses now share owners, infrastructure, management, purchasing power, technology, dispatch, finance, recruiting and strategy. The parent exists to make that reality easier to understand — and to run.</p>
      <ul class="vlist" style="margin-top:1.4rem">
        ${group.creed.map(s => `<li>${icon("check")}<span>${esc(s)}</span></li>`).join("")}
      </ul>
    </div>
    <figure class="media--treated" data-reveal="right">
      <img src="/assets/img/operators.webp" width="1200" height="900"
        alt="Three generations of operators standing in front of a service van — the family roots behind the group's brands.">
      <figcaption class="media-cap" style="padding:.6rem .9rem 0">Operators first: the group grew out of real service businesses.</figcaption>
    </figure>
  </div>
</section>

<section class="section section--cool">
  <div class="wrap">
    ${sectionHead({ eyebrow: "What we believe", title: "Principles we run the Group by", center: true })}
    <div class="grid grid-3" data-stagger>
      ${principles.map(p => `<article class="card principle"><div class="p-ico">${icon(p.icon)}</div><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`).join("")}
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Companies", title: "A portfolio built from operating experience", lead: "Our companies serve homeowners, commercial operators and enterprises in markets where reliability, responsiveness and execution matter." })}
    <div class="grid grid-3" data-stagger>${featured.map((c, i) => companyCard(c, "f" + i)).join("")}</div>
    <p style="margin-top:1.8rem"><a class="btn btn-ghost" href="/companies">See all ${publishedCompanies.length} companies ${icon("arrow","icon")}</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Operating model", title: "Local accountability. Shared capability.", lead: "Our companies keep their customer relationships, specialist teams and market identities. The Group provides centralized infrastructure in finance, procurement, people, technology, marketing, analytics and strategy.", center: true })}
    <div class="diagram-wrap" data-reveal>${platformDiagram()}</div>
    <p class="center" style="margin-top:1.6rem"><a class="textlink" href="/operating-model">Why the parent exists ${icon("arrow","icon")}</a></p>
  </div>
</section>

<section class="section section--cool">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Investment philosophy", title: "We invest where operating expertise matters", lead: "We evaluate businesses and opportunities where disciplined operations, technology, centralized support and patient ownership can create long-term value." })}
    <div class="modes" data-reveal>${modes}</div>
    <p style="margin-top:1.6rem"><a class="textlink" href="/investments">How we invest ${icon("arrow","icon")}</a></p>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap split split--wide">
    <div data-reveal>
      <p class="eyebrow">International</p>
      <h2 class="h2">Canadian by origin. Selective about where we go next.</h2>
      <p class="lead">As the Group grows, we evaluate selected international markets where our operating capabilities can be paired with skilled people, strong local partners and supportive business environments. We study before we commit — and we welcome dialogue with investment-promotion agencies and technology parks.</p>
      <p style="margin-top:1.5rem"><a class="btn btn-onDark" href="/international">International opportunities ${icon("arrow","icon")}</a></p>
    </div>
    <div data-reveal="right">${reachSVG()}</div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Leadership", title: "Operators you can actually meet", lead: "The Group is run by people who have built and operated field-service businesses in British Columbia." })}
    <div class="exec-strip" data-stagger>${execStrip}</div>
    <p style="margin-top:1.6rem"><a class="textlink" href="/leadership">Meet the leadership team ${icon("arrow","icon")}</a> &nbsp;·&nbsp; <a class="textlink" href="/governance">Board &amp; governance ${icon("arrow","icon")}</a></p>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Newsroom", title: "Latest from X Group" })}
    <div class="grid grid-3" data-stagger>
      ${newsroom.slice(0, 3).map(n => `<a class="card news-card" href="/news/${n.slug}">
        <span class="news-type">${esc(n.type)} · ${esc(n.dateLabel)}</span>
        <h3>${esc(n.title)}</h3>
        <p>${esc(n.summary)}</p>
        <span class="textlink">Read ${icon("arrow","icon-xs")}</span>
      </a>`).join("")}
    </div>
    <p style="margin-top:1.8rem"><a class="btn btn-ghost" href="/news">Visit the newsroom ${icon("arrow","icon")}</a></p>
  </div>
</section>

${ctaBand({
  title: "Let's talk.",
  body: "Whether you're a homeowner researching one of our brands, a business owner considering a long-term home, a supplier, or an investment-promotion agency — there's a direct line for you.",
  actions: `<a class="btn btn-onDark" href="/contact">Contact the Group ${icon("arrow","icon")}</a>
            <a class="btn btn-lineDark" href="/companies">Our companies</a>`,
})}
`;
  // small extra styles for the two home-only mini components
  const extra = `<style>
    .exec-mini,.exec-strip>div{display:flex;align-items:center;gap:.85rem}
    .exec-strip{display:flex;flex-wrap:wrap;gap:1.4rem 2rem}
    .exec-strip .exec-avatar{width:56px;height:56px;border-radius:50%}
    .exec-strip b{font-family:var(--font-display);font-size:1.02rem;display:block}
    .exec-strip span{font-size:.83rem;color:var(--ink-soft)}
  </style>`;
  return page({
    title: "Home", path: "/",
    description: `${group.legalName} is a Canadian operating holding company that builds, acquires and supports essential-service and technology businesses. Based in Vancouver, BC.`,
    jsonld: [siteGraph()],
    preloadImage: "/assets/img/hero-field-service.webp",
    main: extra + main,
  });
}

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
  <div class="diagram-wrap" data-reveal style="max-width:760px;margin-inline:auto">${capitalFlowDiagram()}</div>
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
function companiesPage() {
  const byCat = categories.map(cat => {
    const list = publishedCompanies.filter(c => c.category === cat.key);
    if (!list.length) return "";
    return `<div class="cat-block" data-reveal>
      <div class="cat-head">
        <h2>${esc(cat.key)}</h2>
        <span class="cat-count">${list.length} ${list.length === 1 ? "company" : "companies"}</span>
        <p class="cat-blurb">${esc(cat.blurb)}</p>
      </div>
      <div class="grid grid-3" data-stagger>${list.map((c, i) => companyCard(c, cat.key.slice(0,2) + i)).join("")}</div>
    </div>`;
  }).join("");

  const wall = publishedCompanies.map((c) => {
    const media = siteShot(c)
      ? siteShotImg(c, "wall-shot")
      : `<span class="wall-mono" style="--tint:${c.tint}">${esc(c.monogram)}</span>`;
    return `<a class="wall-tile${siteShot(c) ? "" : " wall-tile--mono"}" href="/companies/${c.slug}">
      ${media}
      <span class="wall-scrim" aria-hidden="true"></span>
      <span class="wall-label"><b>${esc(c.name)}</b><span class="wall-sector">${esc(c.category)}</span></span>
    </a>`;
  }).join("");

  const main = `
<section class="page-hero page-hero--wall">
  <div class="wrap">
    ${crumb([{ name: "Home", href: "/" }, { name: "Companies" }])}
    <p class="eyebrow">Portfolio</p>
    <h1>Our companies</h1>
    <p class="lead">${publishedCompanies.length} operating companies and brands — essential home services, industrial field services and technology. Each keeps its own local identity; the Group carries the shared infrastructure.</p>
  </div>
  <div class="wrap wall" data-stagger aria-label="All ${group.brandName} companies">${wall}</div>
</section>
<section class="section"><div class="wrap">
  ${byCat}
  <p class="note" style="margin-top:2.5rem;font-size:.87rem;color:var(--ink-faint);background:var(--surface-2);border-left:3px solid var(--brand-line);padding:.9rem 1.1rem;border-radius:0 8px 8px 0;max-width:75ch">Relationship labels are deliberately precise. “Operating brand” means a trade name and website operated under a Group company; “Group operating company” means a company the Group owns and operates; “Technology affiliate” denotes a strategic technology relationship. See <a href="/corporate-information">Corporate information</a>.</p>
</div></section>
${ctaBand({ title: "Own an established business?", body: "We consider acquisitions of established Canadian businesses where the team, customers and reputation deserve a long-term home.",
  actions: `<a class="btn btn-onDark" href="/investments">How we invest ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/contact#acquisitions">Talk to us</a>` })}
`;
  return page({ title: "Companies", path: "/companies",
    description: `The ${group.brandName} portfolio: ${publishedCompanies.length} operating companies and brands across essential services, industrial field services and technology in British Columbia and beyond.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Companies", href: "/companies" }])], main });
}

// ---------------------------------------------------------------- COMPANY DETAIL
function companyDetail(c) {
  const cells = [
    ["Relationship", c.relationshipLabel],
    ["Sector", c.category],
    ["Principal market", c.geography.join(", ")],
    c.founded ? ["Established", String(c.founded)] : null,
    ["Website", `<a href="${c.website}" target="_blank" rel="noopener">${esc(c.domain)} ${icon("ext","icon-xs")}</a>`],
  ].filter(Boolean).map(([k, v]) => `<div class="cell"><div class="k">${esc(k)}</div><div class="v">${k === "Website" ? v : esc(v)}</div></div>`).join("");
  const metricsHtml = (c.metrics && c.metrics.length)
    ? `<div class="co-detail-meta">${c.metrics.map(m => `<div class="cell"><div class="k">${esc(m.label)}</div><div class="v">${esc(m.value)}</div></div>`).join("")}</div>` : "";
  const body = c.long.map(p => `<p>${esc(p)}</p>`).join("");

  const main = `
<section class="page-hero page-hero--detail"><div class="wrap co-detail-hero">
  <div class="co-detail-main">
    ${crumb([{ name: "Home", href: "/" }, { name: "Companies", href: "/companies" }, { name: c.name }])}
    <div class="co-detail-head" style="margin-top:.5rem">
      ${monogramTile(c, "d")}
      <div>
        <span class="co-relationship" style="background:rgba(255,255,255,.14);color:#dbe8ef">${esc(c.relationshipLabel)}</span>
        <h1 style="margin-top:.5rem">${esc(c.name)}</h1>
        <p class="lead" style="margin-top:.6rem">${esc(c.tagline)}</p>
      </div>
    </div>
  </div>
  ${siteShot(c) ? `<a class="co-detail-shot" href="${c.website}" target="_blank" rel="noopener" data-reveal="right">
    <span class="co-detail-shot-bar" aria-hidden="true"><i></i><i></i><i></i><em>${esc(c.domain)}</em></span>
    ${siteShotImg(c, "co-detail-shot-img")}
  </a>` : `<div class="co-detail-shot co-detail-shot--mono" style="--tint:${c.tint}" data-reveal="right" aria-hidden="true">
    <span class="co-detail-shot-bar"><i></i><i></i><i></i><em>${esc(c.domain)}</em></span>
    <span class="co-detail-mono">${esc(c.monogram)}</span>
  </div>`}
</div></section>

<section class="section"><div class="wrap" style="max-width:840px">
  <div class="co-detail-meta">${cells}</div>
  ${metricsHtml}
  <div class="measure" style="max-width:70ch">${body}</div>

  <div class="poc">
    <div class="who"><b>${esc(c.poc.name)}</b><span>${esc(c.poc.role)}, ${esc(c.name)}</span></div>
    <div class="contact">${icon("mail","icon-xs")} ${mail(c.poc.email)}</div>
  </div>

  <div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.8rem">
    <a class="btn btn-solid" href="${c.website}" target="_blank" rel="noopener">Visit ${esc(c.domain)} ${icon("ext","icon")}</a>
    <a class="btn btn-ghost" href="/companies">All companies</a>
  </div>
  <p style="margin-top:1.6rem;color:var(--ink-faint);font-size:.9rem">${esc(c.name)} is an operating ${c.relationship === "strategic-investment" ? "affiliate" : "business"} within ${esc(group.brandName)}.</p>
</div></section>
`;
  const ld = {
    "@context": "https://schema.org", "@type": "Organization", name: c.name, url: c.website,
    parentOrganization: { "@type": "Organization", name: group.legalName, url: group.baseUrl + "/" },
    areaServed: c.geography, disambiguatingDescription: c.relationshipLabel,
  };
  return page({ title: c.name, path: `/companies/${c.slug}`,
    description: `${c.name} — ${c.relationshipLabel} within ${group.brandName}. ${c.short}`,
    jsonld: [ld, breadcrumb([{ name: "Home", href: "/" }, { name: "Companies", href: "/companies" }, { name: c.name, href: `/companies/${c.slug}` }])], main });
}

// ---------------------------------------------------------------- OPERATING MODEL
function operatingModelPage() {
  const caps = capabilities.map(c => `<article class="card cap" data-reveal>${icon(c.icon)}<h3>${esc(c.title)}</h3><p>${esc(c.body)}</p></article>`).join("");
  const main = `
${pageHero("operating-model", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Operating model" }])}
  <p class="eyebrow">Operating model</p>
  <h1>Local accountability. Shared capability.</h1>
  <p class="lead">Our companies retain their customer relationships, specialist teams and market identities. The Group provides centralized infrastructure — and that is precisely why the parent exists.</p>`)}

<section class="section"><div class="wrap">
  <div class="diagram-wrap" data-reveal>${platformDiagram()}</div>
  <p class="center measure" style="margin:1.4rem auto 0;color:var(--ink-soft)">Decentralized customer ownership; centralized administrative leverage. Each brand answers the phone and does the work; the Group carries the overhead that benefits from scale.</p>
</div></section>

<section class="section section--alt"><div class="wrap">
  ${sectionHead({ eyebrow: "Group capabilities", title: "Seven capabilities we run centrally" })}
  <div class="grid grid-3" data-stagger>${caps}</div>
</div></section>

<section class="section"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Why it works</p>
    <h2 class="h2">Lower overhead. Better execution. Better data.</h2>
    <p>A single garage-door brand does not need its own finance department, procurement function or technology stack. It needs to answer the phone, show up and do excellent work. Everything else is overhead a shared platform can carry better and cheaper.</p>
    <p>When one platform sits beneath many lean brands, advantages compound: lower overhead per brand, more consistent execution, and far better data — patterns visible across markets that no single brand could see. That data flows back into scheduling, pricing, marketing and the decision about what to build or buy next.</p>
  </div>
  <div class="diagram-wrap" data-reveal="right">${capitalFlowDiagram()}</div>
</div></section>

${ctaBand({ title: "See the portfolio the model supports", body: `${operatingBrandsCount} operating brands across three sectors, all running on the same shared infrastructure.`,
  actions: `<a class="btn btn-onDark" href="/companies">Our companies ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/investments">Investment philosophy</a>` })}
`;
  return page({ title: "Operating model", path: "/operating-model",
    preloadImage: heroPreload("operating-model"),
    description: `How ${group.brandName} works: a shared platform of finance, procurement, people, technology, growth, operations and strategy beneath lean local operating brands.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Operating model", href: "/operating-model" }])], main });
}

// ---------------------------------------------------------------- INVESTMENTS
function investmentsPage() {
  const modes = investmentModes.map(m => `<div class="mode"><b>${esc(m.verb)}</b><p>${esc(m.body)}</p></div>`).join("");
  const auds = investmentAudiences.map(a => `<article class="card" data-reveal>
      <h3 style="font-size:1.2rem">${esc(a.title)}</h3>
      <p style="color:var(--ink-soft);margin:.7rem 0 1.1rem">${esc(a.body)}</p>
      <a class="textlink" href="/contact#${a.cta.emailKey}">${esc(a.cta.label)} ${icon("arrow","icon")}</a>
    </article>`).join("");
  const main = `
${pageHero("investments", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Investments" }])}
  <p class="eyebrow">Investments</p>
  <h1>We are operators first</h1>
  <p class="lead">We are interested in businesses where ownership, operating discipline and shared infrastructure can create value over a long time horizon.</p>`)}

<section class="section"><div class="wrap">
  <div class="modes" data-reveal>${modes}</div>
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "Who we talk to", title: "Three conversations we welcome" })}
  <div class="grid grid-3" data-stagger>${auds}</div>
</div></section>

<section class="section"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Our areas of interest</p>
    <h2 class="h2">Where our capabilities give us an advantage</h2>
    <p>Essential services, industrial and field services, specialized B2B services, technology-enabled operations and adjacent categories where our existing platform provides an edge.</p>
    <p style="color:var(--ink-faint);font-size:.92rem">We do not describe ourselves as a private-equity firm, fund or institutional investor. We are an operator-led group that deploys its own capital and operating expertise. Metrics on this site are kept conservative and dated; we publish figures only once we can stand behind them.</p>
  </div>
  <ul class="vlist" data-reveal="right">
    <li>${icon("build")}<span><b>Essential & home services</b> — the category we know best.</span></li>
    <li>${icon("gear")}<span><b>Industrial & field services</b> — mission-critical, mobile, recurring.</span></li>
    <li>${icon("cpu")}<span><b>Technology-enabled operations</b> — software and applied AI that scale service.</span></li>
    <li>${icon("hand")}<span><b>Adjacent B2B services</b> — where shared infrastructure lowers cost to serve.</span></li>
  </ul>
</div></section>

${ctaBand({ title: "Considering a long-term home for your business?", body: "We move deliberately and we keep our word. Start a confidential conversation.",
  actions: `<a class="btn btn-onDark" href="/contact#acquisitions">Business owners & acquisitions ${icon("arrow","icon")}</a>` })}
`;
  return page({ title: "Investments", path: "/investments",
    preloadImage: heroPreload("investments"),
    description: `${group.brandName} invests where operating expertise matters — acquiring, building and partnering with durable Canadian businesses, and evaluating selected international markets.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Investments", href: "/investments" }])], main });
}

// ---------------------------------------------------------------- INTERNATIONAL
function internationalPage() {
  const areas = international.evaluateAreas.map(a => `<article class="card" data-reveal><h3 style="font-size:1.1rem">${esc(a.title)}</h3><p style="color:var(--ink-soft);margin-top:.5rem">${esc(a.body)}</p></article>`).join("");
  const marketCards = international.markets.map(m => `<article class="market"><h3>${icon("pin")}${esc(m.country)}</h3><p>${esc(m.note)}</p></article>`).join("");
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

<section class="section section--dark section--tight"><div class="wrap">${reachSVG()}</div></section>

<section class="section"><div class="wrap">
  ${sectionHead({ eyebrow: "What we evaluate", title: "Areas we study before we commit" })}
  <div class="grid grid-3" data-stagger>${areas}</div>
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "Markets under study", title: international.region, lead: "One of several regions we are studying. We have not selected a destination, and this page deliberately does not rank markets. Russia and Belarus are excluded from our market-entry program; see our sanctions policy." })}
  <div class="markets" data-stagger>${marketCards}</div>
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
function leadershipPage() {
  const cards = executives.map((e, i) => {
    const areas = e.areas.map(a => `<span>${esc(a)}</span>`).join("");
    const link = e.linkedin ? `<a class="exec-link textlink" href="${e.linkedin}" target="_blank" rel="noopener">LinkedIn ${icon("ext","icon-xs")}</a>` : "";
    const portrait = hasPortrait(e) ? portraitImg(e, "exec-photo") : avatar(e.initials, "L" + i);
    return `<article class="exec" data-reveal>
      ${portrait}
      <div class="exec-body">
        <h3>${esc(e.name)}</h3>
        <p class="exec-role">${esc(e.title)}</p>
        <p class="exec-bio">${esc(e.bio)}</p>
        <div class="exec-areas">${areas}</div>
        ${link}
      </div>
    </article>`;
  }).join("");
  const main = `
${pageHero("leadership", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Leadership" }])}
  <p class="eyebrow">Leadership</p>
  <h1>The people who run the Group</h1>
  <p class="lead">X Group is led by an executive team of operators, each accountable for a real function — strategy and capital allocation, operations, finance, technology, people, procurement and corporate development. Every leader has hands-on experience building and running field-service businesses in British Columbia.</p>`)}
<section class="section"><div class="wrap">
  <div class="exec-grid" data-stagger>${cards}</div>
  <div class="lead-govern card" data-reveal>
    <div><p class="eyebrow" style="margin-bottom:.4rem">Governance</p><h3 style="font-size:1.15rem">The Board oversees management</h3><p style="margin:.5rem 0 0;color:var(--ink-soft);max-width:60ch">A Board of Directors, an independent Chair and committee structure sit above the executive team. See how the Group is governed.</p></div>
    <a class="btn btn-ghost" href="/governance">Governance & board ${icon("arrow","icon")}</a>
  </div>
  <p class="note" style="margin-top:1.5rem;font-size:.87rem;color:var(--ink-faint);background:var(--surface-2);border-left:3px solid var(--brand-line);padding:.9rem 1.1rem;border-radius:0 8px 8px 0;max-width:78ch">Portraits shown are placeholders; professional photographs and LinkedIn profiles are added as each is finalized. Biographies describe real responsibilities within the Group.</p>
</div></section>
${ctaBand({ title: "Talk to the team", body: "For acquisitions, partnerships, international inquiries, media or careers — reach the right person directly.",
  actions: `<a class="btn btn-onDark" href="/contact">Contact the Group ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/careers">Careers</a>` })}
`;
  return page({ title: "Leadership", path: "/leadership",
    preloadImage: heroPreload("leadership"),
    description: `Meet the ${group.brandName} leadership team — the executive operators responsible for strategy, finance, operations, technology, people, procurement and corporate development.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Leadership", href: "/leadership" }]), ...executives.map(personSchema)], main });
}

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
<section class="section"><div class="wrap">
  ${crumb([{ name: "Home", href: "/" }, { name: "Newsroom", href: "/news" }, { name: n.title }])}
  <article class="article">
    <p class="eyebrow">${esc(n.type)} · ${esc(n.dateLabel)}</p>
    <h1>${esc(n.title)}</h1>
    <p class="article-meta">${esc(n.dateLabel)} · ${n.readMins} min read</p>
    ${body}
    <p style="margin-top:2rem"><a class="textlink" href="/news">${icon("arrow","icon-xs")} All news &amp; perspectives</a></p>
  </article>
</div></section>
`;
  return page({ title: n.title, path: `/news/${n.slug}`, description: n.summary,
    jsonld: [articleSchema(n, isNews ? "Announcement" : "Perspective", isNews),
             breadcrumb([{ name: "Home", href: "/" }, { name: "Newsroom", href: "/news" }, { name: n.title, href: `/news/${n.slug}` }])], main });
}

// ---------------------------------------------------------------- GOVERNANCE
function governancePage() {
  const seats = governance.board.seats.map(s =>
    `<div class="seat"><div class="seat-role">${esc(s.role)}</div><div class="seat-holder">${esc(s.holder)}</div><span class="seat-kind">${esc(s.kind)}</span></div>`).join("");
  const committees = governance.committees.map(c =>
    `<article class="card" data-reveal><h3 style="font-size:1.08rem">${esc(c.name)}</h3><p style="margin:.5rem 0 0;color:var(--ink-soft);font-size:.95rem">${esc(c.body)}</p></article>`).join("");
  const principlesList = governance.principles.map(p => `<li>${icon("check")}<span>${esc(p)}</span></li>`).join("");
  const policies = governance.policies.map(p => `<a class="policy-link" href="${p.href}">${icon("doc","icon")}<span>${esc(p.label)}</span>${icon("arrow","icon-xs")}</a>`).join("");
  const resp = governance.responsibility.map(r => `<article class="card" data-reveal><h3 style="font-size:1.02rem">${esc(r.title)}</h3><p style="margin:.35rem 0 0;color:var(--ink-soft);font-size:.92rem">${esc(r.body)}</p></article>`).join("");
  const main = `
${pageHero("governance", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Governance" }])}
  <p class="eyebrow">Governance</p>
  <h1>Corporate governance</h1>
  <p class="lead">${esc(governance.intro)}</p>`)}

<section class="section"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Board of Directors</p>
    <h2 class="h2">Oversight, separate from management</h2>
    <p>${esc(governance.board.note)}</p>
    <ul class="vlist" style="margin-top:1.3rem">${principlesList}</ul>
  </div>
  <div class="board" data-reveal="right">${seats}</div>
</div></section>

<section class="section section--alt"><div class="wrap">
  ${sectionHead({ eyebrow: "Committees", title: "Three standing committees" })}
  <div class="grid grid-3" data-stagger>${committees}</div>
</div></section>

<section class="section"><div class="wrap">
  ${sectionHead({ eyebrow: "Responsibility", title: "How we operate responsibly" })}
  <div class="grid grid-4" data-stagger>${resp}</div>
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "Policies", title: "Our published policy framework", lead: "Summaries are published here; full policies are provided to counterparties on request." })}
  <div class="policy-grid" data-stagger>${policies}</div>
</div></section>
`;
  return page({ title: "Governance", path: "/governance",
    preloadImage: heroPreload("governance"),
    description: `${group.brandName}'s corporate governance — Board of Directors, Audit & Risk, Governance & Nominating and Investment committees, and a published policy framework (Code of Conduct, anti-bribery, sanctions).`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Governance", href: "/governance" }])], main });
}

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
function contactPage() {
  const channels = contactChannels.map(ch => `<article class="channel" id="${ch.key}" data-reveal>
      <h3>${icon("mail")}${esc(ch.label)}</h3>
      <p>${esc(ch.note)}</p>
      ${mail(ch.email)}
    </article>`).join("");
  const main = `
${pageHero("contact", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Contact" }])}
  <p class="eyebrow">Contact</p>
  <h1>The right line for every purpose</h1>
  <p class="lead">We route inquiries to the part of the Group that actually handles them — not a single anonymous inbox.</p>`)}
<section class="section"><div class="wrap">
  <div class="channels" data-stagger>${channels}</div>
  <div class="card" style="margin-top:1.6rem;display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center;justify-content:space-between" data-reveal>
    <div>
      <p class="eyebrow" style="margin-bottom:.4rem">Head office</p>
      <p style="margin:0;font-weight:600;font-size:1.05rem">${esc(group.headquarters)}</p>
    </div>
    <div style="display:flex;gap:.7rem;flex-wrap:wrap">
      <a class="btn btn-ghost" href="tel:${group.phoneE164}">${icon("phone","icon")} ${esc(group.phoneDisplay)}</a>
      <a class="btn btn-solid" href="mailto:${group.emails.general}">${icon("mail","icon")} ${esc(group.emails.general)}</a>
    </div>
  </div>
</div></section>
`;
  return page({ title: "Contact", path: "/contact",
    preloadImage: heroPreload("contact"),
    description: `Contact ${group.brandName} — direct lines for general inquiries, business owners and acquisitions, international and government relations, suppliers, careers and media.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }])], main });
}

// ---------------------------------------------------------------- GROUP PROFILE
function groupProfilePage() {
  const facts = metrics.items.map(m => `<div class="cell"><div class="k">${esc(m.label)}</div><div class="v">${esc(m.value)}</div></div>`).join("");
  const list = publishedCompanies.map(c => `<li><b>${esc(c.name)}</b> — <span style="color:var(--ink-soft)">${esc(c.relationshipLabel)}, ${esc(c.category)}, ${esc(c.geography.join(", "))}</span></li>`).join("");
  const execList = executives.map(e => `<li><b>${esc(e.name)}</b> — ${esc(e.title)}</li>`).join("");
  const main = `
${pageHero("group-profile", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Group profile" }])}
  <p class="eyebrow">One-page overview</p>
  <h1>Group profile</h1>
  <p class="lead">A concise overview of ${esc(group.legalName)} — the page to share with a bank, a lawyer, a counterparty or an investment agency.</p>
  <p style="margin-top:1rem"><a class="btn btn-onDark" href="javascript:window.print()">${icon("arrow","icon")} Print / save as PDF</a></p>`)}
<section class="section"><div class="wrap" style="max-width:860px">
  <div class="doc">
    <h2 style="margin-top:0">Who we are</h2>
    <p>${esc(group.legalName)} (“${esc(group.brandName)}”) is a ${esc(group.descriptor)} based in ${esc(group.headquarters)}. We build, acquire and support businesses across essential services, industrial field services and technology. Local brands, central operating infrastructure, disciplined capital allocation.</p>

    <h2>At a glance</h2>
    <div class="co-detail-meta" style="margin-top:.5rem">${facts}</div>
    <p style="font-size:.85rem;color:var(--ink-faint)">Figures as of ${esc(metrics.asOf)}.</p>

    <h2>Operating model</h2>
    <p>Centralized group services — finance, procurement, people, technology, growth, operations and strategy — support lean operating brands that keep their own customers, teams and local identity.</p>

    <h2>Portfolio</h2>
    <ul class="bullets" style="list-style:none">${list}</ul>

    <h2>Leadership</h2>
    <ul class="bullets" style="list-style:none">${execList}</ul>

    <h2>International interests</h2>
    <p>Shared services, technology and AI operations, operating partnerships, acquisitions and specialized field services in selected markets. We engage investment-promotion agencies and technology parks as a Canadian company conducting genuine exploratory diligence, following our anti-bribery and sanctions policies.</p>

    <h2>Contact</h2>
    <div class="deflist">
      <dt>General</dt><dd>${mail(group.emails.general)}</dd>
      <dt>Acquisitions</dt><dd>${mail(group.emails.acquisitions)}</dd>
      <dt>International</dt><dd>${mail(group.emails.international)}</dd>
      <dt>Head office</dt><dd>${esc(group.headquarters)}</dd>
      <dt>Web</dt><dd><a href="/">${esc(group.domain)}</a></dd>
    </div>
    <p class="note">Some values on this profile are provisional and will be replaced with verified corporate-registry information before formal outreach.</p>
  </div>
</div></section>
`;
  return page({ title: "Group profile", path: "/group-profile",
    preloadImage: heroPreload("group-profile"),
    description: `A one-page overview of ${group.legalName}: who we are, our operating model, portfolio, leadership, international interests and contacts.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Group profile", href: "/group-profile" }])], main });
}

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
for (const f of ["index.html","group.html","operating-model.html","investments.html","international.html","leadership.html","governance.html","careers.html","faq.html","contact.html","group-profile.html","corporate-information.html","privacy.html","terms.html","code-of-conduct.html","anti-bribery.html","sanctions.html","404.html"]) {
  const p = join(ROOT, f); if (existsSync(p)) rmSync(p);
}
for (const d of ["companies","insights","news"]) {
  if (existsSync(join(ROOT, d))) rmSync(join(ROOT, d), { recursive: true });
}

emit("index.html", home());
emit("group.html", groupPage());
emit("companies/index.html", companiesPage());
for (const c of publishedCompanies) emit(`companies/${c.slug}.html`, companyDetail(c));
emit("operating-model.html", operatingModelPage());
emit("investments.html", investmentsPage());
emit("international.html", internationalPage());
emit("leadership.html", leadershipPage());
emit("governance.html", governancePage());
emit("careers.html", careersPage());
emit("faq.html", faqPage());
emit("news/index.html", newsroomPage());
for (const n of newsroom) emit(`news/${n.slug}.html`, newsArticle(n));
emit("contact.html", contactPage());
emit("group-profile.html", groupProfilePage());
for (const [slug, data] of Object.entries(corporatePages)) emit(`${slug}.html`, docPage(slug, data));
emit("404.html", notFound());

// infra
const routes = ["/","/group","/companies", ...publishedCompanies.map(c => `/companies/${c.slug}`),
  "/operating-model","/investments","/international","/leadership","/governance","/careers","/faq","/news",
  ...newsroom.map(n => `/news/${n.slug}`),
  "/contact","/group-profile","/corporate-information","/code-of-conduct","/anti-bribery","/sanctions",
  "/privacy","/terms","/accessibility","/security"];
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
