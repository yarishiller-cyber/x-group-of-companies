# X Group — corporate website

Institutional website for **X Group** (legal placeholder: *X Group Holdings Inc.*), a
Canadian operating holding company that owns and supports businesses across essential
services, industrial field services and technology.

The site is built as a **due-diligence document disguised as a corporate website** — every
page answers a question a bank, lawyer, counterparty or foreign investment-promotion agency
would ask after receiving an inquiry from the Group. It is derived from the research
blueprint in `docs/` (a *Research Blueprint for a Credible Canadian Operating Holding Company
and International Investment Platform*).

## Stack

Static **HTML / CSS / vanilla JS** — no framework, no runtime build step. Deploys straight to
Hostinger from Git. Pages are generated **once, locally** by a small Node script from
structured data files, then committed as plain static HTML (the same pattern the operating-
company sites in this fleet use).

```
_build/
  build.mjs           the generator: reads data/ -> writes static .html at repo root
  data/
    group.mjs         ← THE single source of truth for name, domain, emails, HQ (rebrand here)
    companies.mjs     the portfolio registry (relationship labels, POCs, backlinks)
    executives.mjs    the leadership team (bios + placeholder avatars)
    content.mjs       metrics, operating model, investment philosophy, international, insights
    site.mjs          nav + the compliance/legal page bodies
  lib/
    layout.mjs        <head>, header, footer, JSON-LD graph
    assets.mjs        inline SVG: logo mark, icons, avatars, monogram tiles, diagrams, map
assets/               css, js, curated imagery, logos, OG image
companies/            generated company index + one page per company
news/                 generated newsroom index + one page per announcement/perspective
*.html                generated top-level pages (group, operating-model, investments,
                        international, leadership, governance, careers, faq, contact,
                        group-profile, and the corporate/compliance pages)
```

Top navigation uses a "Group" mega-menu (Overview · Operating model · Leadership ·
Governance · Careers) so the bar stays clean while every corporate section is reachable.

## Build

```bash
node _build/build.mjs      # regenerates every .html + sitemap.xml + robots.txt + manifest + .htaccess
```

No `npm install` needed (Node 18+). Bump `ASSET_V` in `_build/lib/layout.mjs` whenever you
change `assets/css` or `assets/js` (cache-busting `?v=`).

## Rebranding (the name is deliberately replaceable)

The whole site renders from data, so changing the identity is a one-file edit. In
`_build/data/group.mjs` set `brandName`, `legalName`, `domain`, `baseUrl` and the `emails.*`,
then run `node _build/build.mjs`. Nothing else hard-codes the name. (The blueprint recommends
`[Name] Holdings Inc.`, styled simply as `[Name] Group`, over "X Group of Companies" — this
is set up so you can decide later without touching templates.)

## What is real vs. placeholder

The architecture follows the blueprint's "truth ledger" discipline — publish only what can be
defended. Items marked below are **placeholders to finalize before any outreach**:

- **Group domain / legal name / registration** — `xgroupholdings.ca` and *X Group Holdings
  Inc.* are placeholders (`group.mjs`, and the "to be confirmed" fields on
  `/corporate-information`).
- **Executives** — real functions and understated, credible bios, but the **names are
  placeholders and the portraits are generated monogram avatars**. Drop real professional
  photographs into `executives[].photo` and real profile URLs into `executives[].linkedin`.
  Person JSON-LD is emitted for each, so a real LinkedIn URL in `linkedin` immediately wires
  the people↔organization entity graph (add the LinkedIn company page to `group.sameAs` too).
- **Board of Directors** — the Governance page shows an independent Non-Executive Chair and
  independent director seats as *"appointment in progress"*; fill `governance.board.seats`
  in `content.mjs` with real directors as they are appointed.
- **Company points of contact** — each operating brand has a named local contact at
  `info@<that-brand-domain>` (`companies[].poc`); swap for the real people.
- **Metrics** — kept intentionally conservative and dated ("as of August 2026"); only counts
  we can actually defend. No fabricated revenue, jobs, or headcount.
- **Allegro X AI** — presented understated as a *technology affiliate* pending the blueprint's
  "Allegro credibility audit"; do not amplify unverified claims on this site.

## Imagery

Real operating-business photography reused from the fleet (a Hydraulic Hero service truck on a
job site, three-generation operators, an on-site technician), unified with a consistent
grayscale institutional treatment applied in CSS. Company logos are clean SVG monogram tiles.
Executive portraits are placeholder avatars (see above). No AI-generated executives, stock
handshakes, skylines or jets — per the blueprint's design rules.

## The operating companies (outbound backlinks)

The Group links out to each operating company; the companies should eventually add a small
reciprocal "A X Group company" footer link back (that change lives in each company's own repo,
not here). Portfolio and relationships are defined in `_build/data/companies.mjs`.

## Deploy

Push to `main` — Hostinger auto-deploys. `.htaccess` provides clean URLs (`/group`,
`/companies/hydraulic-hero`), HTTPS + www→root redirects, caching, and blocks `/_build/`.
After deploy, submit `sitemap.xml` in Google Search Console + Bing.
