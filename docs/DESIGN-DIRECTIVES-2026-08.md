# DESIGN DIRECTIVES — August 2026

Actionable improvement plan for the X Group holdco site, synthesized from 5 research
reports (holdco architecture, CIS delegation trust, interactive diagrams, institutional
design, content integrity) against the current build. Terse and file-level: implement
top to bottom. Priorities: P1 = before any outreach, P2 = next pass, P3 = nice-to-have.

**Placeholder convention (site-wide, mandatory):** anything requiring owner-supplied
facts renders as a visually distinct block — `<span class="tbp">[TO BE PROVIDED: legal
entity number]</span>` — styled amber/bordered in `styles.css` (`.tbp{background:#fdf3e3;
border:1px dashed #c98a52;padding:0 .35em;border-radius:4px;font-family:var(--font-ui);
font-size:.9em}`). Never publish a placeholder styled as a fact. Replace the current
soft "(to be confirmed)" strings with this convention everywhere.

---

## A. Gap analysis — current site vs research

**Already right (keep, don't rebuild):** flat 8-item nav matching the blueprint; honest
"operating holding company" positioning; relationship labels per company (not
"subsidiary" everywhere); "as of August 2026" dated fact strip; purpose-routed contact
emails (hello@/partners@/international@...); compliance page set (conduct, anti-bribery
with the "never construct a false investment story" line, sanctions with Russia/Belarus
exclusion); dated Insights; printable group-profile; Organization JSON-LD with
subOrganization + parentOrganization both directions; Newsreader+Inter, warm paper +
navy + single clay accent; restrained reveal motion with reduced-motion + no-JS
failsafes. This is the "quiet Nordic" register — the work below is tightening, not
redesign.

**Gaps, as file-level actions:**

- **A1 (P1) `leadership.html`, `index.html`, `group-profile.html` — the leadership
  page is the site's biggest liability.** Eight named people with invented-looking
  names, monogram avatars, and rich bios reads exactly like the KYB "fabricated team"
  tell (research: a fake team is worse than no team page; CIS evaluators reverse-image
  and LinkedIn-check every face). Action: reduce to the people who verifiably exist,
  with real LinkedIn links (`[TO BE PROVIDED: LinkedIn URL]` blocks until supplied);
  wrap every unverified name/bio in the `.tbp` convention or cut the card. Do NOT ship
  8 executives with no LinkedIn footprint. "Head office is N of us; the rest are in the
  field" is the honest flex — add that line once headcount is confirmed.
- **A2 (P1) `index.html` fact strip + `group-profile.html` — reconcile counts.**
  "12 operating brands" vs "See all 13 companies" vs group.html "13 operating companies
  & brands". Standardize one formula everywhere: "12 operating brands · 1 technology
  affiliate" (or whatever the truth ledger says). Drop the filler "3 Sectors" stat;
  replace with a real operational count (technicians, jobs completed 2025, towns) once
  supplied — `[TO BE PROVIDED: verified technician count]` until then, or run 3 facts
  instead of 4. Every Est. year on company cards (2007/2016/2021/2022/2023...) must be
  owner-confirmed; flag unconfirmed ones `.tbp`.
- **A3 (P1) all pages, footer — no registry-grade legal line.** Research: footer legal
  line on every page is the #1 due-diligence pass signal. Add to the shared footer:
  "X Group Holdings Inc. `[TO BE PROVIDED: exact registered legal name]` · Incorporated
  in British Columbia, Canada · Registration No. `[TO BE PROVIDED: BC incorporation
  number]` · Registered office: `[TO BE PROVIDED: street address]`". Also fix the
  "© 2026 X Group Holdings Inc.." double-period typo (appears in every footer).
- **A4 (P1) `corporate-information.html` — upgrade to a rekvizity/verify page.** Add:
  CRA Business Number row, incorporation date row, registered-office street address row
  (all `.tbp`); a "Verify us" block with deep links to BC Registry search and
  Corporations Canada search plus one-line instructions on confirming each fact; a
  brand → legal-entity mapping table ("Steveston Garage Doors is an operating brand of
  `[TO BE PROVIDED: legal OpCo]`"); "last reviewed: 24 August 2026" stamp. Mirror the
  confirmed facts into Organization JSON-LD (`legalName`, `foundingDate`, `identifier`,
  full `address`) on `index.html`.
- **A5 (P1) `contact.html` — physical-presence signals.** Add street address block
  (`.tbp`), phone in international format `+1 778-800-0769`, office hours with timezone
  (PT / UTC−8), nearest airport note (YVR) — CIS audiences verify a phone line and a
  real address; "Vancouver, BC" alone reads as no substance.
- **A6 (P2) `index.html`, `assets/img/` — imagery audit.** `operators.webp` ("three
  generations of operators") is AI-generated people; delegation research: evaluators
  reverse-image-search faces, AI-glossy people destroy trust. Replace with equipment/
  van/premises imagery (no faces) or one genuine photo; keep the truck hero (no faces).
  Rule: AI imagery of objects tolerable short-term, AI imagery of people never.
- **A7 (P2) `companies/allegro-x-ai.html`, `index.html` — Allegro containment.** The
  current cautious copy ("applied AI and technology services", "Technology affiliate")
  is correct; keep it. Do NOT link Allegro's public claims (68 systems, $412M, SOC 2)
  or amplify its site until the blueprint's Allegro credibility audit is checked off.
  Add an internal HTML comment on both files pointing at the audit checklist.
- **A8 (P2) scale-honesty copy edit, all pages.** Grep for superlatives ("flagship",
  "premium", "mission-critical") and verify each passes the ASA rule: objective claims
  need evidence, else qualify or cut. The site is already mostly clean; this is a
  sweep, not a rewrite.
- **A9 (P3) `index.html` — move the inline `<style>` block (exec-strip) into
  `styles.css`.** Hygiene; keeps pages template-consistent.

---

## B. Interactive operating-model diagram spec (owner's explicit request)

Rebuild the static `GROUP PLATFORM` SVG on **`operating-model.html`** (primary,
full-featured) and **`index.html`** (same component, may omit the wires overlay on
mobile) as a state-driven cross-highlighting component. New file
`assets/js/capmap.js` (~90 lines, `defer`), CSS appended to `styles.css`. Zero
dependencies — do not use Motion for this.

### B1. DOM structure

```html
<section class="capmap" id="capmap" data-active="">
  <p class="eyebrow">Operating model</p>
  <h2 class="h2">Local accountability. Shared capability.</h2>
  <ul class="capmap-chips" role="list">
    <!-- one per capability; data-cap keys: finance procurement people
         technology growth operations strategy -->
    <li><button type="button" class="chip" data-cap="finance" aria-pressed="false">
      Finance</button></li>
    ...
  </ul>
  <svg class="capmap-wires" aria-hidden="true"><!-- paths injected by JS --></svg>
  <div class="capmap-cards">
    <!-- one card per brand-type; data-groups = space-separated caps it uses (here:
         all three use all seven — the mapping stays in HTML per research, so future
         asymmetry is a markup edit, not a JS edit) -->
    <article class="capmap-card" data-brand="doors"
             data-groups="finance procurement people technology growth operations strategy">
      <h3>Garage-door brands</h3>
      <p class="capmap-base">11 local brands · Greater Vancouver &amp; Lower Mainland</p>
      <!-- ALL captions permanently in DOM (screen readers + no-JS); CSS reveals the
           active one -->
      <p class="capmap-cap" data-for="finance">One financial standard across all brands</p>
      <p class="capmap-cap" data-for="procurement">Doors, springs and openers bought at scale</p>
      ... (7 captions, see matrix B6)
    </article>
    <article class="capmap-card" data-brand="hydraulic" data-groups="...">Hydraulic Hero ...</article>
    <article class="capmap-card" data-brand="allegro" data-groups="...">Allegro X AI ...</article>
  </div>
  <p class="capmap-live visually-hidden" aria-live="polite"></p>
  <p class="capmap-hint" data-js-only>Hover, tap or focus a capability to see what it
    does for each company. Press Esc to reset.</p>
</section>
```

Container `position:relative`; `.capmap-wires` absolutely positioned `inset:0`,
`pointer-events:none`, `z-index` above cards' background, below chips.

### B2. Wires (draw-in lines)

- JS builds one `<path>` per (chip, card) pair with `data-for="{cap}"` and
  `data-to="{brand}"`, attribute `pathLength="1"` (normalizes length — no
  `getTotalLength()`, fixes Safari dash scaling).
- Geometry: recomputed by a `ResizeObserver` on the section (throttled via
  `requestAnimationFrame`) — not `window.resize` only (fonts/reflow move cards). For
  each pair: `chipRect`/`cardRect` via `getBoundingClientRect()`, converted to
  section-local coords; `d = M x1 y1 C x1 (y1+y2)/2, x2 (y1+y2)/2, x2 y2` (vertical
  cubic, Magic-UI style). Set the SVG `viewBox` to the section's pixel size (1:1).
- Base style: `stroke:var(--accent-2); stroke-width:1.75; fill:none; opacity:0;
  stroke-dasharray:1; stroke-dashoffset:1`.

### B3. State machine (all state = ONE attribute)

- The ONLY mutable state is `section.dataset.active` = capability key or `""`. JS never
  toggles classes on cards or wires; CSS reads the ancestor attribute.
- Delegated listeners on the section:
  - `click` → `e.target.closest('.chip[data-cap]')`; toggle: same cap → clear, else set.
    **Tap-to-toggle with `aria-pressed` is the PRIMARY activation** (touch + keyboard
    via native button Enter/Space). On every state change: sync `aria-pressed` on all
    chips; set `.capmap-live` textContent to e.g. "Finance: one financial standard
    across all brands; consolidated reporting for Hydraulic Hero; controls and
    reporting for Allegro X AI." (polite announcer).
  - `pointerover`/`pointerout` (they bubble; never mouseenter/mouseleave) → hover
    preview, **gated**: attach only if
    `matchMedia('(hover:hover) and (pointer:fine)').matches`. `pointerout` clears only
    when leaving the whole section (check `relatedTarget`) AND no chip is pinned
    (pinned = last activation was a click; track one boolean). Hovering the caption or
    card must not dismiss (WCAG 1.4.13 hoverable — captions live inside the cards, so
    this holds automatically).
  - `focusin` → same as hover preview for keyboard; `focusout` clears only if focus
    leaves the section and nothing pinned.
  - `keydown` Escape on the section → clear state, keep focus in place (1.4.13
    dismissible). Document-level `click` outside `.capmap` → clear pinned state.
- No auto-hide timers anywhere (1.4.13 persistent).

### B4. CSS (all visuals keyed off `[data-active]`)

```css
/* dim floor .4, asymmetric timing: ~80ms in, 150ms out */
.capmap-card{transition:opacity .15s ease,filter .15s ease}
.capmap[data-active]:not([data-active=""]) .capmap-card{opacity:.4;filter:saturate(.6)}
/* related card back to full + accent ring, fast in */
.capmap[data-active="finance"] .capmap-card[data-groups~="finance"]{
  opacity:1;filter:none;outline:2px solid var(--accent);outline-offset:3px;
  transition:opacity .08s ease,filter .08s ease}
/* caption visibility — captions are in-flow but hidden when JS armed */
.js-anim .capmap-cap{display:none}
.js-anim .capmap[data-active="finance"] .capmap-cap[data-for="finance"]{display:block}
/* chips */
.capmap[data-active="finance"] .chip[data-cap="finance"],
.chip[aria-pressed="true"]{background:var(--brand);color:#fff}
.chip:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
/* wires draw in */
.capmap[data-active="finance"] .capmap-wires path[data-for="finance"]{
  stroke-dashoffset:0;opacity:.75;
  transition:stroke-dashoffset .45s ease-out .05s,opacity .08s ease}
.capmap-wires path{transition:opacity .15s ease}  /* out: fade, don't un-draw */
```

Generate the 7 per-capability rules with a small build-time repetition (they are
mechanical). Dimmed set is opacity-only — never `display:none` on cards (layout shift).
Animate only opacity/filter/outline/stroke-dashoffset.

### B5. Reduced motion, no-JS, SR

- `@media (prefers-reduced-motion: reduce){ .capmap-wires path{transition:none}
  .capmap *{transition-duration:.01ms} }` — lines and highlights still APPEAR
  (information preserved; only the drawing motion is removed).
- No-JS: `data-active` absent → all cards full opacity; captions visible because the
  hiding rule is scoped to `.js-anim` (the existing head script that arms reveals);
  `.capmap-hint[data-js-only]` hidden without JS; wires SVG stays empty. The section
  degrades to a legible chip list + three cards with all 21 captions as plain text.
- Wires SVG `aria-hidden="true"` (decoration). Cards are real content; the aria-live
  slot announces on toggle. Keep the existing static `role="img"` SVG's aria-label
  content as a visually-hidden intro sentence for the new section.
- Reverse highlighting: `pointerover`/`focusin` on `.capmap-card` sets
  `section.dataset.brand = card.dataset.brand`; CSS mirror:
  `.capmap[data-brand="doors"] .chip` dims to .4 except chips whose cap is in that
  card's `data-groups` (all seven here — still ship it; asymmetry arrives when the
  mapping does), and wires `[data-to="doors"]` draw in. Clear on the same events as B3.
- Test checklist before shipping: tab parity, Esc, iOS tap/re-tap, rotate recompute,
  reduce-motion, JS off, Safari dash rendering.

### B6. Capability → brand caption MATRIX (final copy, ≤8 words each)

| Capability | Garage-door brands | Hydraulic Hero | Allegro X AI |
|---|---|---|---|
| Finance | One financial standard across all brands | Consolidated reporting, budgeting and cash management | Group-level controls and reporting |
| Procurement | Doors, springs and openers bought at scale | Hydraulic components, vehicles and fuel at group rates | Shared software licences and vendor leverage |
| People | Shared recruiting, training and WorkSafeBC compliance | Field crews staffed through group hiring systems | Specialist and technical recruiting support |
| Technology | Shared CRM, dispatch and telephony | Same dispatch stack, industrial workflows | The Group's technology centre of gravity |
| Growth | Local brand systems, SEO and reputation | Industrial customer acquisition and analytics | Attribution and analytics across the portfolio |
| Operations | Shared dispatch, process design, field quality | One-hour response target, group-run dispatch | Turns operating data into better systems |
| Strategy | Where the next local brand launches | Proof the platform extends beyond doors | Core of the international technology thesis |

All phrases derive from blueprint/site language (e.g. "centre of gravity", "one-hour
response target", "proving ground"). Do not invent new claims in captions.

---

## C. Typography + color refinement (surgical)

Current system already matches the research's #1 recommendation (Newsreader variable
opsz + Inter, warm paper `#f7f5f0`, navy `#14425c`/`#0c2a3a`, single clay accent).
Keep it. Changes:

- **C1 (P2) `styles.css` — buttons.** Research: no pill buttons in the institutional
  register. Change `.btn` `border-radius:var(--r-pill)` → `6px`; keep sizes. Keep
  `.co-relationship`/`.tag`/`.exec-areas` pills (metadata chips are fine).
- **C2 (P2) `styles.css` — financial numerals.** Add `.fact b, .co-meta,
  .capmap-base, .deflist, table{font-variant-numeric:lining-nums tabular-nums}`.
- **C3 (P2) index.html + Google Fonts link — enable optical sizing.** Add
  `font-optical-sizing:auto` on `h1,h2,h3,.brand-word` and confirm the fonts URL keeps
  the `opsz` axis (it does). Display weight stays 500–600, never 700 (already correct).
- **C4 (P3) `styles.css` — eyebrow color.** Clay-on-paper eyebrows at `.78rem` are
  near the AA floor; verify `#b1592b` on `#f7f5f0` ≥ 4.5:1, else darken to `#9a4b22`.
- **C5 (P3) leave dark mode alone.** Light-first is the researched stance; do not add
  a toggle or a dark theme. Ink bands (hero, factstrip, CTA) already provide the
  "deep typographic contrast" signal.

---

## D. Audience features (post-Soviet delegations)

- **D1 (P1) Registry facts placement.** Covered by A3/A4 (footer legal line + upgraded
  corporate-information page). This is the proverka-kontragenta fast path: exact legal
  name, incorporation number, incorporation date, registered office, all `.tbp` until
  supplied, plus "verify us" registry deep links.
- **D2 (P1) `leadership.html` — rank legibility.** Order strictly by seniority (already
  done); after A1's verification pass, add one line under the Managing Director card:
  "First person of the company for official correspondence." Protocol officers must be
  able to identify rank-match in seconds. Real portraits (consistent crop) + LinkedIn
  links are prerequisites for outreach — keep as `.tbp` items.
- **D3 (P2) NEW `delegations.html` (+ nav under International or linked from it).**
  Content: the Group hosts trade delegations and issues IRCC-compliant letters of
  invitation on official letterhead (list what the letter contains: registered company
  name, full Canadian address, company description incl. employee count and year
  established, purpose, duration, cost responsibility, authorized signatory, two signed
  originals); protocol contact block — `[TO BE PROVIDED: protocol contact name and
  title]`, international@xgroupholdings.ca, `+1 778-800-0769`; a typical visit agenda
  (facility tour, technical presentation, meetings, MOU signing); YVR arrival note.
  Critical rule: the letterhead identity on this page must byte-match the footer legal
  line (A3) — consulates treat any mismatch as a discrepancy.
- **D4 (P2) Russian-language summary — YES, exactly one page: NEW `/ru/index.html`.**
  A single formal-register Russian summary of: who we are, portfolio in one paragraph,
  corporate details (mirroring D1 facts), compliance posture, contacts, with the line
  "Мы отвечаем на запросы на русском языке." Add `hreflang="ru"` /
  `hreflang="en"` link pairs on `/` and `/ru/`, and a small "RU" link in the footer
  (not the header — one page doesn't justify a switcher). MUST be professionally
  written/reviewed formal Russian (formal «Вы») — machine translation is worse than no
  page; until reviewed, do not publish (keep the file out of sitemap). Do not translate
  anything else. Add a one-line courtesy acknowledgment that correspondence in English
  is standard — avoid implying regional language politics.
- **D5 (P2) Downloadable fact sheet.** `group-profile.html` already exists with
  print CSS — add a real `assets/docs/x-group-profile.pdf` (letterhead-styled, EN;
  RU version after D4 review) and a download link on group-profile, international, and
  delegations pages. CIS document culture treats letterheaded PDFs as substance.
  Generate only after A2/A3 facts are final — a PDF with placeholders must not ship.
- **D6 (P3) `sanctions.html` + `anti-bribery.html` — signed PDF versions.** Offer each
  policy summary as a letterheaded PDF download with a named compliance contact
  (`governance@`). SOE compliance departments attach these to invitee files.
- **D7 (P3) `contact.html`/`corporate-information.html` — institutional affiliations
  strip.** Max 5–6, each linking to a verifiable listing (chamber of commerce, trade
  mission participation). Only once real; no unverifiable badges, ever.

---

## E. Content additions/edits (holdco architecture + integrity)

- **E1 (P1) `investments.html` — upgrade "Business owners" into a real sell-your-business
  section (or NEW `sell-your-business.html` linked from it).** Add: (a) explicit
  criteria box — trade/service businesses, Lower Mainland BC, revenue range `[TO BE
  PROVIDED: revenue range owner will stand behind]`, owner retiring or staying;
  (b) 5-step process with realistic timeline (first call → site visit → simple offer →
  30–60 day close → your name stays on the trucks); (c) "what changes / what stays"
  two-column table; (d) direct named contact + partners@ email, not a form. Highest-
  signal page in the genre; current three-audience layout keeps the funnel too vague.
- **E2 (P1) NEW `insights/founder-letter-2026.html` — inaugural founder letter.**
  800–1500 words, "why this group exists", at least one real number and one admitted
  mistake/setback, dated, signed `[TO BE PROVIDED: founder name + signature]`. Link
  from Insights index and group.html. The cheapest credibility asset in the genre;
  becomes an annual archive.
- **E3 (P2) `companies/index.html` — acquisition & launch log.** Static reverse-chron
  table at the bottom: Year · Brand · Town · one-line note ("2023 — Kitsilano Garage
  Doors, Vancouver — West Side specialist launched on the group platform"). Rows only
  for owner-verified dates (A2); one row per event forever. Also add the log (3 most
  recent rows) to group-profile.html.
- **E4 (P2) KPI strip honesty — `index.html`, `group-profile.html`.** Covered by A2:
  real counts only, `.tbp` where unknown, never sum employees+contractors as "team",
  keep the "Figures as of" footnote (already present) and update it whenever numbers
  change.
- **E5 (P2) News cadence — `insights/index.html`.** Rename nav label to "News &
  Insights"; add dated one-paragraph news items (brand launch, hire, letter published)
  — 4–8/year target; never a separate empty News tab. Add `<time datetime>` elements
  to all entries (currently plain text dates). Add "last reviewed" stamps to the four
  policy pages (freshness is a due-diligence signal).
- **E6 (P2) Cross-link footer badges on brand sites (fleet-wide task, not this repo).**
  Every operating brand site's footer gets: "An operating brand of `[legal OpCo]`, an
  X Group company" linking to `https://xgroupholdings.ca/companies`. Hub-and-spoke only
  (brand ↔ holdco, branded anchors); brands never sitewide-link each other. Harmonize
  Steveston's "independently owned & operated" footer to the blueprint's precise
  wording. Track rollout in `_shared/sites-registry.md`.
- **E7 (P2) Organization schema — `index.html`.** Present and good. Extend after A4:
  `legalName`, `foundingDate`, `identifier` (incorporation no.), full street `address`,
  `numberOfEmployees`, `sameAs` (registry listing, LinkedIn); add `founder` Person
  matching leadership. Keep LocalBusiness schema OFF this site (brands own local SEO;
  holdco ranks for its own name + "sell my business" terms only).
- **E8 (P3) `404.html`, `sitemap.xml`** — add new pages (delegations, sell-your-business,
  founder letter, /ru/ when live) to sitemap; verify canonical/OG on each new page
  matches the existing template.

---

## Execution order

1. A1–A5 truth/placeholder pass (blocks everything public-facing).
2. B diagram build (self-contained; can proceed in parallel).
3. E1, E2 (new high-signal content), then D3–D5.
4. C polish, remaining P2/P3.

After meaningful work: update `_shared/LESSONS.md`, `_shared/sites-registry.md`, and
push the shared brain per master instructions.
