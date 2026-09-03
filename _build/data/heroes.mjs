// =============================================================================
// heroes.mjs — one unique, wide-format hero image per page.
//
// Every page-hero on the site carries a background image generated for that
// page's content (Nano Banana / gemini-2.5-flash-image, 21:9). The `prompt`
// is the page-specific subject; STYLE is appended to every prompt so the set
// shares one photographic grade (cool PNW light, harbour blue + clay amber)
// and reads as a single commissioned series.
//
// key = the heroKey used by build.mjs templates → /assets/img/heroes/<key>.webp
// =============================================================================

export const HERO_STYLE =
  "Cinematic wide-format corporate photography in a consistent editorial series: " +
  "cool Pacific Northwest overcast-to-golden light, deep harbour-blue and slate " +
  "tones with restrained warm amber highlights, muted professional colour grade, " +
  "photorealistic, crisp detail. Ultra-wide panoramic horizontal banner " +
  "composition, main subject weighted to the right two-thirds of the frame, " +
  "calmer and darker toward the left edge (text will overlay there). No people " +
  "looking at the camera, absolutely no readable text, no signage, no logos, " +
  "no watermark.";

export const heroes = {
  group: {
    alt: "Vancouver's industrial harbour waterfront at dawn — cranes, water and the working coastline the Group's companies serve.",
    prompt:
      "Vancouver industrial harbour waterfront at dawn: calm dark water in the " +
      "foreground, working docks, gantry cranes and moored tugboats in the middle " +
      "distance, north-shore mountains behind a low bank of cloud, first warm " +
      "light breaking on the water",
  },
  "operating-model": {
    alt: "A row of clean service vans lined up in a yard at first light, ready for morning dispatch.",
    prompt:
      "A disciplined row of clean, unmarked dark-blue service vans parked in " +
      "perfect alignment in a gravel-and-concrete service yard at first light, " +
      "light morning mist, wet ground reflections, one van door open with " +
      "organized shelving of tools and parts just visible",
  },
  investments: {
    alt: "Growth rings of old-growth Pacific timber in close detail — patient, compounding, built over decades.",
    prompt:
      "Extreme close-up of the cross-section of an old-growth Pacific Douglas fir " +
      "log: dense concentric growth rings in warm amber and deep brown, side-lit " +
      "so the ring texture reads clearly, dark slate background, shallow focus " +
      "falling off toward the left",
  },
  international: {
    alt: "Container terminal cranes and a cargo ship at the Port of Vancouver — trade routes beyond home markets.",
    prompt:
      "Port of Vancouver container terminal at dusk: towering red-and-slate " +
      "gantry cranes over a loaded container ship, stacked containers in muted " +
      "blues and rust, harbour water in the foreground, moody overcast sky with " +
      "a strip of warm light on the horizon",
  },
  leadership: {
    alt: "An empty boardroom table in morning light with a harbour view — where operating experience becomes direction.",
    prompt:
      "A long dark-walnut boardroom table with empty leather chairs in a modern " +
      "office, floor-to-ceiling windows on the right looking onto a hazy " +
      "harbour with cranes and mountains, soft morning side-light raking across " +
      "the table surface, one notebook and a carafe of water",
  },
  governance: {
    alt: "The ordered structure of a mass-timber and steel building interior — governance as visible structure.",
    prompt:
      "Architectural interior of a modern mass-timber building: a precise grid " +
      "of glulam beams and black steel connection plates receding in " +
      "perspective, warm wood against cool concrete and slate shadow, " +
      "even diffuse skylight from above, strong orderly geometry",
  },
  careers: {
    alt: "A technician's workbench, tools shadow-boarded and ordered — the trades craft behind every Group company.",
    prompt:
      "A professional technician's workbench in a tidy service workshop: " +
      "shadow-board wall of hand tools perfectly ordered, torsion springs and " +
      "brass fittings laid out on a worn wood bench top, a pair of work gloves, " +
      "warm task lighting over cool workshop shadow",
  },
  faq: {
    alt: "A calm office reception detail in soft light — straight answers, no runaround.",
    prompt:
      "A calm, minimal corporate reception detail: warm oak counter edge, a " +
      "ceramic cup of coffee and a small green plant, soft window light from " +
      "the right, deep blue-grey wall fading to shadow on the left, shallow " +
      "depth of field, quiet and unhurried mood",
  },
  news: {
    alt: "A desk by the window at dusk, city skyline beyond — perspectives from inside the Group.",
    prompt:
      "A clean desk beside a large office window at blue-hour dusk: closed " +
      "laptop, reading glasses and a plain notebook, the Vancouver skyline and " +
      "harbour lights softly out of focus beyond the glass, cool blue interior " +
      "with warm city lights outside",
  },
  contact: {
    alt: "A dispatch desk with phone headset in the evening — a real person picks up.",
    prompt:
      "A service-dispatch desk in the early evening: a telephone headset " +
      "resting beside dual monitors glowing softly out of focus, a mug and a " +
      "handwritten route board blurred in the background, warm desk lamp " +
      "against cool blue office dusk, human and ready",
  },
  "group-profile": {
    alt: "A bound corporate profile document on a boardroom table — the Group on paper.",
    prompt:
      "A thick, plain dark-blue clothbound report with blank cover lying " +
      "closed on a dark boardroom table beside a fountain pen, dramatic soft " +
      "side-light, cool slate background falling to shadow, macro detail of " +
      "the cloth texture and page edges",
  },
  "corporate-information": {
    alt: "The disciplined geometry of a modern Vancouver office facade.",
    prompt:
      "Looking up at the facade of a modern mid-rise Vancouver office " +
      "building: rhythmic grid of glass, steel and warm wood fins, overcast " +
      "silver sky reflected in the glazing, strong repeating geometry, " +
      "slight perspective convergence",
  },
  "code-of-conduct": {
    alt: "A machinist's level and square resting on steel — plumb, level and true.",
    prompt:
      "A precision machinist's spirit level and steel try-square resting on a " +
      "brushed steel plate, macro photography, the level's amber vial glowing " +
      "softly, cool blue-grey metal tones, single warm accent light, " +
      "everything exactly aligned to the frame",
  },
  "anti-bribery": {
    alt: "A clear glass-walled office in even light — business done in the open.",
    prompt:
      "A modern office of floor-to-ceiling clear glass partitions in even " +
      "daylight: transparent meeting rooms receding in perspective, nothing " +
      "hidden, clean sight-lines all the way through the space, cool blue " +
      "glass with warm wood floor reflections",
  },
  sanctions: {
    alt: "Brass dividers resting on a softly blurred nautical chart — navigating trade lawfully.",
    prompt:
      "Antique brass navigation dividers and a compass resting on a nautical " +
      "chart that is softly defocused into abstract blue and parchment tones " +
      "with no readable markings, warm brass against deep navy, dramatic " +
      "low side-light, shallow macro focus",
  },
  privacy: {
    alt: "Frosted glass panels diffusing light and silhouettes — personal information kept guarded.",
    prompt:
      "A wall of tall frosted-glass panels diffusing cool daylight into soft " +
      "gradients, the faint abstract silhouette of a standing figure far " +
      "behind the glass, aluminum panel joints making a calm vertical rhythm, " +
      "blue-grey palette with one warm interior light glowing through",
  },
  accessibility: {
    alt: "A smooth accessible entrance ramp with a steel handrail at a modern building.",
    prompt:
      "A gently sloping concrete accessibility ramp curving toward the " +
      "entrance of a modern timber-and-glass building, brushed stainless " +
      "handrail catching warm evening light, tactile paving detail in the " +
      "foreground, cool dusk tones around a welcoming lit doorway",
  },
  security: {
    alt: "The machined locking mechanism of a steel industrial door in close detail.",
    prompt:
      "Macro photograph of a heavy machined steel industrial door locking " +
      "mechanism: hardened bolt, precise levers and a brushed steel plate, " +
      "cool blue metal with warm amber edge-light tracing the machined " +
      "surfaces, deep shadow background, engineered and impenetrable",
  },
  terms: {
    alt: "A fountain pen resting on a thick stack of blank pages — plain terms, put in writing.",
    prompt:
      "A dark fountain pen resting diagonally on a thick stack of heavy blank " +
      "cream paper on a dark desk, soft raking window light showing the paper " +
      "texture, deep blue-slate shadows, calm and contractual, macro focus on " +
      "the nib",
  },
};
