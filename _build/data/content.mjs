// =============================================================================
// content.mjs — structured page content: metrics, operating model, investment
// philosophy, international program, values, milestones, governance, careers,
// FAQ and the newsroom.
// =============================================================================
import { operatingBrandsCount, sectorCount } from "./companies.mjs";

// --- Conservative fact strip (blueprint: only counts we can defend) ----------
// No fabricated revenue / employee / job counts. Counts derive from the
// portfolio registry so they never drift. "As of" date reads institutional.
export const metrics = {
  asOf: "August 2026",
  items: [
    { value: String(operatingBrandsCount), label: "Operating brands", note: "Across essential and industrial field services" },
    { value: String(sectorCount), label: "Sectors", note: "Essential services · industrial · technology" },
    { value: "20+",  label: "BC communities served",    note: "Across Greater Vancouver & the Lower Mainland" },
    { value: "Since 2007", label: "Longest-running brand", note: "Steveston Garage Doors, Richmond BC" },
  ],
  // Additional honest markers (used on /group)
  hqLine: "Headquartered in Vancouver, British Columbia",
};

// --- The seven group capabilities (Operating Model page) ----------------------
export const capabilities = [
  { key: "finance",     title: "Finance & Accounting", icon: "chart",
    body: "Financial controls, consolidated reporting, budgeting and the administrative infrastructure that lets many small brands run to one disciplined standard." },
  { key: "procurement", title: "Procurement", icon: "box",
    body: "Group purchasing, vendor relationships and supply-chain coordination — doors, springs, motors, hydraulic components, vehicles, telecom, software and insurance, bought at scale." },
  { key: "people",      title: "People", icon: "people",
    body: "Recruiting, workforce planning, training and organizational support, plus a shared approach to safety culture and WorkSafeBC compliance." },
  { key: "technology",  title: "Technology & Data", icon: "cpu",
    body: "Core business systems, CRM and dispatch, telephony, cybersecurity, automation, data and applied AI — with Allegro X AI as the Group's technology centre of gravity." },
  { key: "growth",      title: "Growth", icon: "trend",
    body: "Digital platforms, customer acquisition, brand systems, reputation and analytics — while each operating brand keeps its own local personality." },
  { key: "operations",  title: "Operations", icon: "gear",
    body: "Shared dispatch, process design, field quality and performance improvement across residential, commercial and industrial work." },
  { key: "strategy",    title: "Strategy & Capital", icon: "compass",
    body: "Long-term planning, business development, acquisitions and capital allocation — the decisions about where retained cash and operating expertise go next." },
];

// --- Investment philosophy (Investments page) ---------------------------------
export const investmentModes = [
  { verb: "Acquire", body: "Established Canadian businesses where the existing team, customers and reputation deserve a long-term home." },
  { verb: "Build",   body: "New operating businesses adjacent to our existing capabilities, launched on the Group's shared platform." },
  { verb: "Partner", body: "Joint ventures and strategic relationships with qualified operators." },
  { verb: "Expand",  body: "Selected international markets where talent, demand and operating conditions create a compelling reason to establish a presence." },
];

export const investmentAudiences = [
  { title: "Business owners",
    body: "We consider acquisitions of established Canadian businesses where the existing team, customers and reputation deserve a long-term home — not a flip.",
    cta: { label: "Talk to us about your business", emailKey: "acquisitions" } },
  { title: "Entrepreneurs & partners",
    body: "We consider joint ventures and new businesses where our operating platform — finance, procurement, people, technology and dispatch — can accelerate execution.",
    cta: { label: "Propose a partnership", emailKey: "acquisitions" } },
  { title: "Governments & economic-development organizations",
    body: "We evaluate selected jurisdictions for operating investments, service centres, technology operations and strategic partnerships. We welcome dialogue with investment-promotion agencies, technology parks and regional economic-development organizations.",
    cta: { label: "Government & partnership inquiries", emailKey: "international" } },
];

// --- International program (International page) --------------------------------
// Presented deliberately WITHOUT a public ranking or a "chosen" country. Facts
// about each agency are drawn from the research blueprint (public mandates).
export const international = {
  intro: [
    "Our home market is Canada. As the Group grows, we evaluate selected international markets where our operating capabilities can be paired with skilled people, strong local partners and supportive business environments.",
    "We approach international expansion deliberately. Before entering a market, we study its talent base, regulatory framework, operating costs, infrastructure, customer opportunity, technology ecosystem and long-term alignment with our businesses.",
  ],
  evaluateAreas: [
    { title: "Shared services & business operations", body: "Finance, customer operations, technology, data and other functions supporting our portfolio." },
    { title: "Technology & AI", body: "Engineering, applied AI, software and technology-enabled service delivery." },
    { title: "Operating partnerships", body: "Joint ventures with qualified local operators." },
    { title: "Acquisitions", body: "Established businesses where the Group can contribute operating expertise and long-term capital." },
    { title: "Specialized field services", body: "Opportunities adjacent to our Canadian industrial and essential-service experience." },
  ],
  // Markets under study — Central Asia & the Caucasus (Russia/Belarus deliberately
  // excluded per sanctions guidance; no public ranking).
  region: "Central Asia & the Caucasus",
  markets: [
    { country: "Uzbekistan", note: "A national investment-promotion agency operating as a one-stop shop for foreign investors, and an IT Park actively courting international technology operations through soft-landing programmes." },
    { country: "Kazakhstan", note: "A mature national investor agency (KAZAKH INVEST) offering full-cycle investor support, plus Astana Hub for qualified technology companies." },
    { country: "Kyrgyzstan", note: "A presidential National Investment Agency with a single-window mechanism, alongside an export-oriented High Technology Park regime." },
    { country: "Azerbaijan", note: "A single-window FDI-promotion agency focused on diversified, non-oil investment." },
    { country: "Georgia",    note: "An established FDI-promotion ecosystem and regional business positioning." },
    { country: "Armenia",    note: "A technology-talent angle under continued diligence." },
  ],
  agencyTopics: [
    "market-entry requirements", "skilled-workforce availability", "operating locations",
    "investment incentives", "local partnerships", "technology ecosystems",
    "business establishment", "supplier networks",
  ],
  canadaNote: "We conduct this work as a Canadian company — engaging Canada's Trade Commissioner Service and following the Group's sanctions-screening and anti-bribery policies at every step.",
};

// --- Principles / values (every corporate site has these) --------------------
export const principles = [
  { icon: "hand",   title: "Operators, not spectators", body: "We have built and run real service businesses. Every decision at the Group is made by people who have answered the phone, quoted the job and stood behind the work." },
  { icon: "layers", title: "Local brands, central strength", body: "Our companies keep their names, teams and communities. The Group carries the finance, technology, purchasing and systems that no single local brand should have to build alone." },
  { icon: "compass",title: "Long-term ownership", body: "We are not a fund with an exit clock. We buy and build businesses we intend to own for a long time, and we manage them that way." },
  { icon: "chart",  title: "Disciplined capital allocation", body: "Cash generated by the portfolio is reinvested deliberately — into the businesses we have, the ones we acquire, and the markets we choose to enter." },
  { icon: "shield", title: "Integrity that survives scrutiny", body: "Honest pricing for customers, accurate books, real safety standards, and a public story that matches the private one. We design everything to reconcile under diligence." },
  { icon: "people", title: "People make the platform", body: "Recruiting, training and a genuine safety culture are the product. The businesses are only as good as the crews and coordinators who run them." },
];

// --- History / milestones (timeline) -----------------------------------------
export const milestones = [
  { year: "2007", title: "The first brand", body: "Steveston Garage Doors begins serving Richmond, BC — three generations on Lulu Island and the reference standard for local, honest service." },
  { year: "2009", title: "New installations", body: "New Garage Doors Vancouver launches as a new-door and opener specialist across the Lower Mainland." },
  { year: "2021", title: "Beyond garage doors", body: "Hydraulic Hero extends the operating model into industrial field services — 24/7 mobile hydraulic repair across Greater Vancouver." },
  { year: "2022–24", title: "A family of local brands", body: "Kitsilano, Pitt Meadows, Maple Ridge, West Vancouver, YVR Garage Door Springs and the transparency-first trio (Probably Fine, Good Enough, Sketchy) launch on shared infrastructure." },
  { year: "2025", title: "A technology capability", body: "Allegro X AI joins as the Group's technology and applied-AI affiliate, based in Montréal." },
  { year: "2026", title: "X Group", body: "The operating group is formalized as X Group — centralizing finance, procurement, people, technology and strategy — and begins an exploratory international market-development program." },
];

// --- Governance --------------------------------------------------------------
export const governance = {
  intro: "X Group is a privately held company. We hold ourselves to governance standards beyond what a private group requires, because our counterparties — banks, insurers, acquirers, partners and government agencies — expect it.",
  board: {
    note: "The Board of Directors sets strategy, approves capital allocation and oversees management. It currently comprises the Managing Director and is expanding to include an independent Non-Executive Chair and independent directors; those appointments are in progress.",
    seats: [
      { role: "Non-Executive Chair", holder: "Appointment in progress", kind: "Independent" },
      { role: "Managing Director", holder: "Adrian Cole", kind: "Executive director" },
      { role: "Independent Director", holder: "Appointment in progress", kind: "Independent" },
      { role: "Independent Director", holder: "Appointment in progress", kind: "Independent" },
    ],
  },
  committees: [
    { name: "Audit & Risk Committee", body: "Oversees financial reporting, internal controls, insurance, and enterprise and operational risk across the portfolio." },
    { name: "Governance & Nominating Committee", body: "Oversees board composition, governance policies, the Code of Conduct, and the Group's anti-bribery and sanctions-compliance framework." },
    { name: "Investment Committee", body: "Reviews acquisitions, joint ventures, greenfield projects and material capital allocation, including international market-entry proposals." },
  ],
  principles: [
    "Clear separation between the Board's oversight role and management's operating role.",
    "Accurate, consolidated financial reporting across every operating company.",
    "A single Code of Conduct applied to every brand and market.",
    "Anti-bribery, sanctions-screening and international-engagement policies in force before any government-facing activity.",
    "Beneficial-ownership and corporate records maintained to withstand third-party due diligence.",
  ],
  policies: [
    { label: "Code of Conduct", href: "/code-of-conduct" },
    { label: "Anti-Bribery & Corruption Policy", href: "/anti-bribery" },
    { label: "Sanctions Compliance Policy", href: "/sanctions" },
    { label: "Corporate Information", href: "/corporate-information" },
  ],
  // Responsibility markers (folded into governance rather than a separate page)
  responsibility: [
    { title: "Safety", body: "Every operating company works to WorkSafeBC standards. Nobody is asked to cut a safety corner to save time." },
    { title: "People", body: "Local jobs, real training, and fair, transparent pay frameworks across the Group's brands." },
    { title: "Communities", body: "Our brands are embedded in the BC communities they serve, from Richmond to the North Shore." },
    { title: "Compliance", body: "We obey the law in every jurisdiction we operate in, and we ask our partners to do the same." },
  ],
};

// --- Careers -----------------------------------------------------------------
export const careers = {
  lead: "We hire operators, coordinators, technicians and specialists across the Group and its brands — plus the finance, technology, people and growth roles that run centrally.",
  why: [
    { icon: "trend",  title: "Real growth", body: "A growing group means real paths — a coordinator can become an operations lead; a technician can become a trainer or brand manager." },
    { icon: "gear",   title: "Better tools", body: "You work with the Group's shared systems — dispatch, CRM, training — instead of fighting spreadsheets at a one-off shop." },
    { icon: "shield", title: "Done right", body: "Licensed, insured and WorkSafeBC-covered. Honest pricing, real safety standards, and a name you can stand behind." },
  ],
  areas: [
    "Field technicians & installers", "Service coordinators & dispatch", "Branch & brand managers",
    "Finance & accounting", "Technology, data & AI", "People & recruiting",
    "Procurement & supply chain", "Marketing & growth",
  ],
  where: "Greater Vancouver and the Lower Mainland today, with central roles based in Vancouver and technology roles with Allegro X AI in Montréal.",
};

// --- FAQ (front-loaded, self-contained answers — for people and AI engines) --
export const faqs = [
  { q: "What is X Group?",
    a: "X Group is a Canadian operating holding company, headquartered in Vancouver, British Columbia. It builds, acquires and supports businesses across essential services, industrial field services and technology, and centralizes the functions that benefit from scale — finance, procurement, people, technology and strategy — while its operating companies stay close to their customers and local markets." },
  { q: "What companies does X Group own?",
    a: "X Group's portfolio spans industrial field services (Hydraulic Hero), a family of essential home-services garage-door brands across Greater Vancouver (including Steveston Garage Doors, YVR Garage Door Springs, West Vancouver, Kitsilano, Pitt Meadows and Maple Ridge among others), and a technology affiliate (Allegro X AI in Montréal). Each company's relationship to the Group is labelled precisely on the Companies page." },
  { q: "Where is X Group based?",
    a: "X Group is headquartered in Vancouver, British Columbia, Canada. Its operating companies serve communities across Greater Vancouver and the Lower Mainland, and its technology affiliate operates from Montréal, Québec." },
  { q: "Is X Group a private-equity firm or a fund?",
    a: "No. X Group is an operator-led holding company that invests its own capital and operating expertise. It is not a private-equity firm, investment fund or institutional investor, and it has no fixed exit timeline — it intends to own the businesses it builds and acquires for the long term." },
  { q: "Is X Group acquiring businesses?",
    a: "Yes. X Group considers acquisitions of established Canadian businesses — particularly in essential services, industrial and field services, and technology-enabled operations — where the existing team, customers and reputation deserve a long-term home. Owners can reach the corporate-development team through the Investments page." },
  { q: "What is X Group's international plan?",
    a: "X Group is conducting an exploratory evaluation of selected international markets — currently in Central Asia and the Caucasus — for shared services, technology and AI operations, operating partnerships and potential acquisitions. No destination has been selected, and the Group engages investment-promotion agencies and Canada's Trade Commissioner Service as part of genuine, compliant diligence." },
  { q: "How do the local brands relate to X Group?",
    a: "Each local brand keeps its own name, team, phone number and community relationships. X Group provides the shared infrastructure behind them — finance, procurement, people, technology, dispatch and strategy. Relationship labels (group operating company, operating brand, technology affiliate) are stated precisely for each business." },
  { q: "How can I contact X Group?",
    a: "X Group publishes direct lines for each purpose: general inquiries, business owners and acquisitions, international and government relations, suppliers, careers and media. See the Contact page for the right address for your inquiry." },
];

// --- Newsroom: announcements (typed) -----------------------------------------
export const announcements = [
  {
    slug: "x-group-formed",
    type: "Announcement",
    title: "X Group is formalized as a Canadian operating holding company",
    date: "2026-08-18",
    dateLabel: "August 2026",
    readMins: 2,
    summary: "Several operating businesses that already shared owners, systems and management are brought together under a single parent — X Group — headquartered in Vancouver.",
    body: [
      "X Group has been formalized as a Canadian operating holding company, bringing together a portfolio of essential-service, industrial field-service and technology businesses that already shared owners, infrastructure and management.",
      "The parent centralizes the capabilities that benefit from scale — finance, procurement, people, technology, marketing and strategy — while its operating companies keep their local names, teams and customer relationships. The move formalizes an operating model the Group has run for years: local brands, central operating infrastructure, disciplined capital allocation.",
      "“We did not create a parent to look bigger,” said Adrian Cole, Managing Director. “We created it because the machinery behind our individual brands had become more valuable than any single brand, and it deserved to be run well.”",
    ],
  },
  {
    slug: "international-market-study",
    type: "Announcement",
    title: "X Group begins an exploratory international market-development program",
    date: "2026-08-10",
    dateLabel: "August 2026",
    readMins: 3,
    summary: "The Group opens a deliberate study of selected international markets for shared services, technology operations and partnerships — starting with dialogue, not commitments.",
    body: [
      "X Group has begun an exploratory international market-development program, evaluating selected markets in Central Asia and the Caucasus for shared services, technology and AI operations, operating partnerships and potential acquisitions.",
      "The Group is engaging national investment-promotion agencies, technology parks and Canada's Trade Commissioner Service as part of genuine exploratory diligence. No destination has been selected, and the program operates under the Group's anti-bribery, sanctions-screening and international-engagement policies.",
      "“We are studying, not promising,” said Sophie Tremblay, Director of Corporate Development & International Partnerships. “We want to understand what a first-stage project would actually involve before anyone commits capital.”",
    ],
  },
  {
    slug: "hydraulic-hero-industrial-services",
    type: "Announcement",
    title: "Hydraulic Hero anchors the Group's industrial field-services sector",
    date: "2026-07-30",
    dateLabel: "July 2026",
    readMins: 2,
    summary: "The Group's 24/7 mobile hydraulic operation shows the operating platform extending well beyond garage doors into mission-critical industrial service.",
    body: [
      "Hydraulic Hero, the Group's 24/7 mobile hydraulic hose and field-repair company, anchors X Group's industrial field-services sector — demonstrating that the Group's operating platform extends beyond home services into mission-critical industrial work.",
      "Serving construction, agriculture, forestry, marine, material-handling, trucking and warehousing customers across Greater Vancouver, Hydraulic Hero brings on-site hose fabrication, fitting supply, cylinder work and marine hydraulics to customers where a machine down is money lost by the hour.",
    ],
  },
];

// --- Perspectives (thought-leadership) ---------------------------------------
export const insights = [
  {
    slug: "why-an-operating-holding-company",
    title: "Why we built an operating holding company",
    date: "2026-08-12",
    dateLabel: "August 2026",
    readMins: 4,
    summary: "A group emerged because several operating businesses now share owners, infrastructure and management. Here is the thesis behind the parent — and what it is deliberately not.",
    body: [
      "X Group did not begin as a plan to look large. It began the way most groups do: several operating businesses ended up sharing owners, systems, purchasing power and the people who make strategic decisions. At some point the machinery behind the individual brands — recruiting, dispatch, accounting, procurement, technology — became more valuable than any single brand. Formalizing that machinery as a holding company is a conventional, well-understood step.",
      "Our model is deliberately more centralized than a classic decentralized holding company. Customer relationships, local teams and brand identities stay with the operating companies. The capabilities that benefit from scale move to the Group: finance, procurement, people, technology, growth, operations and, above all, strategy and capital allocation.",
      "The result is a simple thesis — local brands, central operating infrastructure, disciplined capital allocation. It is strong enough that we do not need to pretend to be anything bigger than we are.",
    ],
  },
  {
    slug: "local-brands-central-infrastructure",
    title: "Local brands, central infrastructure",
    date: "2026-08-05",
    dateLabel: "August 2026",
    readMins: 3,
    summary: "The economic case for a lean operating brand sitting on top of shared services — lower overhead, better execution, better data.",
    body: [
      "A garage-door brand in one town does not need its own finance department, its own procurement function or its own technology stack. It needs to answer the phone, show up, and do excellent work. Everything else is overhead that a shared platform can carry better and cheaper.",
      "When shared infrastructure sits underneath many lean operating brands, three things compound: lower overhead per brand, more consistent execution, and far better data — because the Group can see patterns across markets that no single brand could. That data flows back into scheduling, pricing, marketing and the decision about which business to build or buy next.",
      "It is not a glamorous idea. It is a durable one.",
    ],
  },
  {
    slug: "how-we-evaluate-new-markets",
    title: "How we evaluate a new market",
    date: "2026-07-28",
    dateLabel: "July 2026",
    readMins: 4,
    summary: "Our approach to international market development: study first, commit later, and never construct a story to induce a decision.",
    body: [
      "We are operators first. When we look at a new market — in Canada or abroad — we study its talent base, regulatory framework, operating costs, infrastructure, customer opportunity and technology ecosystem before anyone commits capital. Most of the time the honest answer is 'not yet,' and that is a perfectly good answer.",
      "Internationally, that means engaging the organizations built for exactly this conversation — national investment-promotion agencies, technology parks and economic-development bodies — as a Canadian company conducting genuine exploratory diligence. We tell every market the same true thing: we are studying, we have not chosen, and we would like to understand what a first-stage project would actually involve.",
      "We hold ourselves to a clear line: never construct a false investment story to induce a government to provide travel, benefits or advantage. A real exploratory process, documented and compliant, is both the right thing and the more persuasive one.",
    ],
  },
];

// --- Unified newsroom: announcements + perspectives, newest first ------------
export const newsroom = [
  ...announcements,
  ...insights.map(p => ({ ...p, type: "Perspective" })),
].sort((a, b) => (a.date < b.date ? 1 : -1));
