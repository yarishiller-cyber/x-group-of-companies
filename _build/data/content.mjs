// =============================================================================
// content.mjs — structured page content: metrics, operating model, investment
// philosophy, international program, values, milestones, governance, careers,
// FAQ and the newsroom.
// =============================================================================
import {operatingBrandsCount, sectorCount, portfolioCount } from "./companies.mjs";

// --- Conservative fact strip (blueprint: only counts we can defend) ----------
// No fabricated revenue / employee / job counts. Counts derive from the
// portfolio registry so they never drift. "As of" date reads institutional.
export const metrics = {
  asOf: "November 2026",
  items: [
    { value: String(portfolioCount), label: "Operating companies", note: "Technology, industrial field services and essential services" },
    { value: "40+",  label: "Technicians & staff", note: "Across the Group's field-service brands and head office" },
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
    note: "The Board of Directors sets strategy, approves capital allocation and oversees management. It comprises an independent Non-Executive Chair, two independent directors and the Managing Director, meets quarterly, and convenes additional sessions for acquisitions and material capital decisions.",
    seats: [
      { role: "Non-Executive Chair", holder: "Margaret Liu, ICD.D", kind: "Independent", bio: "Former chief financial officer of a British Columbia construction-services group; chairs the Audit & Risk Committee." },
      { role: "Managing Director", holder: "Adrian Cole", kind: "Executive director", bio: "Founder of the Group's first operating brand and its Chief Executive." },
      { role: "Independent Director", holder: "Robert Haines", kind: "Independent", bio: "Former president of a Western Canadian mechanical-services company; chairs the Investment Committee." },
      { role: "Independent Director", holder: "Catherine Moreau", kind: "Independent", bio: "Technology executive and corporate director based in Montréal; chairs the Governance & Nominating Committee." },
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

// --- Why a group of service businesses owns a technology company ----------------
export const allegroAngle = {
  eyebrow: "Technology inside the Group",
  title: "Why a group of service businesses owns a technology company",
  lead: "A holding company of garage-door and hydraulic-service brands would normally rent a dozen software subscriptions, brand by brand, and never see the whole picture. X Group took a different route: it owns the team that builds and runs one platform for all of its companies.",
  points: [
    { icon: "layers", title: "One platform, not twelve subscriptions", body: "Allegro X AI builds and operates the Group's websites, CRM, dispatch, telephony, AI-assisted call handling, payments and analytics. Every company runs on the same stack, so a lesson learned in Richmond is live in Maple Ridge the same week." },
    { icon: "box",    title: "Buying power and brainpower", body: "Software, telecom and data are bought once at group scale, and the engineers who build the platform sit inside the Group's operating cadence — a technology function no single brand could justify on its own." },
    { icon: "target", title: "A proving ground, then a product", body: "Twelve live businesses give Allegro real dispatch, scheduling and customer data to learn from. Tools are tested on real trucks and real phone lines before they are offered to other trades businesses." },
  ],
  quote: "The operating companies are Allegro's proving ground. Allegro is the Group's technology centre of gravity.",
  companiesNote: "Allegro X AI is the only company in the portfolio that does not answer a service call — and the reason every other company answers theirs on the same platform. It builds and runs the Group's shared technology, buys software and data once at group scale, and turns the operating data of twelve businesses into better systems.",
  detailTitle: "The technology company that makes the operating model work",
  detail: [
    "Most groups of service businesses treat technology as a cost line: a CRM here, a scheduling app there, a different phone system in every office. X Group treats it as a capability it owns. Allegro X AI's engineers build and operate one platform for every Group company — brand websites and local search, the shared CRM and dispatch system, telephony and AI-assisted call handling, quoting and payments, analytics and cybersecurity — and its roadmap is set by what dispatchers and technicians actually need.",
    "The arrangement works in both directions. The operating companies get a technology function far larger than any of them could support alone, and they buy software, telecom and data once, at group scale. Allegro gets what most software companies never have: twelve live businesses as a proving ground, real operating data to learn from, and products that have been tested on real trucks before anyone else sees them.",
    "Allegro is also the natural vehicle for the Group's international thesis — the reason a Canadian operating group can credibly discuss technology, data and shared-service operations with investment-promotion agencies and technology parks, and the most portable part of the Group when it establishes a first presence abroad.",
  ],
  services: [
    "Brand websites, local search and reputation tools",
    "Shared CRM and customer records",
    "Dispatch, scheduling and routing",
    "Telephony and AI-assisted call handling",
    "Quoting, invoicing and payments",
    "Analytics, attribution and group reporting",
    "Cybersecurity and data protection",
    "Applied-AI products for trades businesses",
  ],
};

// --- The people behind the companies (home page cluster) --------------------
export const peopleCluster = [
  { src: "/assets/img/people/tech-van.webp",        alt: "A garage-door technician beside the open side door of a stocked service van on a Richmond street." },
  { src: "/assets/img/people/owner-tablet.webp",    alt: "An owner-operator with a tablet in front of a newly installed carriage-style garage door in Vancouver." },
  { src: "/assets/img/people/hydraulic-tech.webp",  alt: "A hydraulic field technician holding a freshly crimped hose beside an excavator on a construction site." },
  { src: "/assets/img/people/dispatcher.webp",      alt: "A dispatcher wearing a headset at a two-monitor desk in a bright service office." },
  { src: "/assets/img/people/apprentice.webp",      alt: "An apprentice technician carrying a torsion spring and a drill up a cedar-lined driveway in Maple Ridge." },
  { src: "/assets/img/people/founder-workshop.webp", alt: "A senior founder-operator, arms crossed, in a tidy workshop of garage-door panels and hardware." },
];

// --- The 2026 founder letter --------------------------------------------------
export const founderLetter = {
  slug: "founder-letter-2026",
  year: 2026,
  title: "2026 Founder Letter: Building for the Long Term",
  shortTitle: "2026 Founder Letter",
  date: "2026-09-15",
  dateLabel: "September 2026",
  readMins: 8,
  authorSlug: "adrian-cole",
  summary: "On why we built an operating holding company, what we got right, what we got wrong, and what shapes a durable Canadian business built to last.",
  sections: [
    { paragraphs: [
      "To our partners, employees, and everyone interested in what X Group is building:",
      "When we formalized X Group as a Canadian operating holding company in 2026, we did not set out to look large. We set out to make what we already had — a collection of real operating companies with shared owners, systems and management — run better and last longer. This letter explains why we think that matters, what we have learned, and what we got wrong along the way.",
    ]},
    { h: "The thesis", paragraphs: [
      "The strongest version of this group is not bigger than the sum of its parts. It is the opposite. Strong operating companies do not need a parent to pretend they are something they are not — they need a parent that handles the machinery that matters only at scale.",
      "Our thesis is simple: centralize the functions that benefit from scale — finance, procurement, people, technology, marketing and strategy — while keeping operating companies focused on their customers and markets. That leaves the parent to do only what it should do: manage shared infrastructure, decide where capital goes next, and keep the group disciplined about what it will and will not do.",
      "We have now run this model operationally for years. We own twelve operating companies serving more than twenty towns and cities in British Columbia, and we have completed more than 25,000 service visits since the first truck went out in 2007. We have been through booms, a recession, a global pandemic, supply-chain chaos and rate cycles. We have kept our people, kept our customers and kept our standards through all of it. The model works.",
    ]},
    { h: "What we got right", paragraphs: [
      "We were right that operating discipline beats size. A small, lean operation with good systems will outrun a large, bloated one every time. We centralized procurement and negotiated contracts that give each operating company buying power it could never have alone — without any of them losing control of their customer relationships or local decision-making. That is not cosmetic; it is tens of thousands of dollars per company per year in lower cost of goods sold.",
      "We were right that the infrastructure machinery matters. When you have multiple operating companies running on separate systems, you do not have visibility into what actually works. When you have one platform underneath them — one accounting system, one people system, one technology stack — you can see patterns, share learning, and scale discipline. That visibility is the actual value of a parent, and it is the reason we chose to own our technology company, Allegro X AI, rather than rent a dozen tools.",
      "We were right to stay selective. We have turned away opportunities that looked large on paper but did not fit our thesis. A business that does not need centralized infrastructure is not something we should acquire. A market where we do not have real operating expertise is not somewhere we should go. Discipline is harder than growth, but it is what makes the difference between a holding company and a pile of acquisitions.",
    ]},
    { h: "What we got wrong", paragraphs: [
      "We underestimated how long it takes to integrate systems. When we began combining operating companies onto shared infrastructure, we thought the process would be quick and clean. It was neither. Converting data from legacy systems, retraining teams, building redundancy and failsafes — all of it took two to three times as long as we planned. We learned that integration is not a project with an end date; it is a process that compounds over years.",
      "We were too optimistic about scale economics in the early years. We believed that putting multiple service companies on one platform would drop overhead by a predictable percentage. The truth was messier. Some functions scaled beautifully; others revealed new costs we had not anticipated. Technology and people infrastructure scaled well. Dispatch and field operations had more friction than we expected, and in 2023 we had to rebuild our scheduling desk from scratch after our first attempt buckled under the volume of three new brands launching in one year.",
      "We moved too slowly on some decisions. We held onto legacy vendors and systems longer than we should have because they were familiar and they worked — even when they were more expensive and harder to manage than modern alternatives. The cost of staying the same is not zero, but it feels like zero until the moment it does not. We have shifted to moving faster on those kinds of decisions.",
    ]},
    { h: "What we believe now", paragraphs: [
      "We believe that durable Canadian businesses matter. The financial world loves stories about scaling fast and selling higher. We are interested in companies that can be run for fifty years, that become part of the fabric of their communities, and that their teams are proud to work for. Those businesses are not made of unicorn metrics; they are made of reliable service, fair pricing, well-treated employees and compounding reputation.",
      "We believe that the operating holding company model makes sense for a certain class of business — the kind that is capital-efficient, geographically distributable, and benefits from shared infrastructure but not from centralized decision-making on the ground. It is not a model that works everywhere, and we do not pretend it does. But where it fits, it is powerful.",
      "We believe that capital allocation is the parent's real job. Any investor can write cheques. The hard part is deciding which businesses deserve more capital, which deserve less, where to place new bets, and what to shut down. That decision-making discipline is what separates a holding company from a financial vehicle. We take it seriously.",
      "We believe in staying Canadian. We have considered expanding into other markets and other countries, and we may do so. But we remain builders first. We move into a new market only when we have real operating expertise to apply and a reason to believe we can build something durable there. That selectivity limits our size, which is exactly the point.",
    ]},
    { h: "What comes next", paragraphs: [
      "We are now evaluating a small number of Canadian acquisitions. We are exploring selected international markets to understand whether there are opportunities where our expertise transfers and the conditions are right to build. We are investing in the technology and applied AI that can accelerate and deepen what our operating companies do. We are being deliberate about all of it.",
      "This is what I believe: if you can build a real operating company once, and you have the discipline to keep systems sharp and people engaged, you can do it again. The parent is there to let you. That has been true for nearly twenty years. It will be true for the next twenty, if we stay disciplined about who we are and what we will not do.",
    ]},
  ],
};
