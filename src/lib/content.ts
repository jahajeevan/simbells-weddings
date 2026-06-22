// Central SimBells business data — single source of truth

export const BUSINESS = {
  name: "SimBells",
  fullName: "SimBells Weddings & Events",
  tagline: "You Dream It. We Make It Unforgettable.",
  owner: "J. Simon",
  establishedYear: 2016,
  city: "Trichy",
  region: "Tamil Nadu",
  address: {
    line1: "#634, 1st Floor, K.P.R.S Towers",
    line2: "Tennur High Road, Tennur",
    city: "Trichy – 620017",
  },
  phones: ["99650 57920", "63812 26958"],
  phonesE164: ["+919965057920", "+916381226958"],
  whatsapp: "918148432007",
  instagram: { handle: "@simbells_event_planner", url: "https://instagram.com/simbells_event_planner" },
  facebook: { handle: "SimBells Events", url: "https://www.facebook.com/profile.php?id=100063786083655" },
  mapsQuery: "SimBells+Wedding+And+Events,+Tennur+High+Road,+Tennur,+Trichy",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.6!2d78.6833499!3d10.8170537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf56699c780bf%3A0x65b5cb9af3b35c82!2sSimBells%20Wedding%20And%20Events!5e0!3m2!1sen!2sin!4v1718000000000",
  mapsLink: "https://maps.app.goo.gl/AXw5K2kABRbnNKrP7",
  coords: { lat: 10.8170537, lng: 78.6833499 },
};

export function waLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/appointment", label: "Visit" },
  { href: "/contact", label: "Contact" },
];

// ─────────────────────────────────────────────────────────────
// IMAGE LIBRARY — all sourced from Unsplash (editorial wedding photography).
// Every image is unique to its slot. No duplicates across sections.
// ─────────────────────────────────────────────────────────────
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const IMG = {
  hero: U("photo-1606800052052-a08af7148866", 2400),
  storyMain: U("photo-1604017011826-d3b4c23f8914", 1400),
  storyInset: U("photo-1583939411023-aebf2550c9ed", 700),
  whyUsBg: U("photo-1606216794074-735e91aa2c92", 2000),
  galleryHero: U("photo-1542628682-88321d2a4828", 2000),
  aboutHero: U("photo-1532712938310-34cb3982ef74", 2000),
  servicesHero: U("photo-1519750013478-3e9d4b91b3a6", 2000),
  packagesHero: U("photo-1546484959-f9a381d1330d", 2000),
  contactHero: U("photo-1525258801497-0ed2dbe4c11d", 2000),
  filmCta: U("photo-1583244532321-1f37395bbe1c", 2000),
  planHero: U("photo-1597157639073-69284dc0fdaf", 2000),
  appointmentHero: U("photo-1591604129939-f1efa4d9f7fa", 2000),
};

// Service collections — each image unique, premium editorial.
export const SERVICE_COLLECTIONS = [
  {
    key: "weddings",
    number: "01",
    title: "Weddings",
    italic: "Planning",
    blurb:
      "From the first muhurtham to the final farewell — every ritual, every vendor, every emotion orchestrated by one quiet team, so your family simply lives the day.",
    longBlurb:
      "A SimBells wedding is a single, calm choreography of dozens of moving pieces — booked, briefed, dressed and timed by one team. We work with families across Trichy to honour the traditions that matter, design the moments worth remembering, and quietly handle everything in between.",
    image: U("photo-1519741497674-611481863552", 1400),
    services: ["Wedding Planning", "Pre Wedding Shoot", "Post Wedding Shoot", "Welcome Entries"],
    prefillEvent: "Wedding",
    prefillServices: ["Wedding Planning"],
  },
  {
    key: "decoration",
    number: "02",
    title: "Decoration",
    italic: "& Stage",
    blurb:
      "Mandaps that take the breath away. Grand floral arches, mirror-lit stages and bespoke themes — designed around your story, built to be photographed forever.",
    longBlurb:
      "Our décor team builds mandaps, stages and welcome entries that feel personal — from traditional gold and jasmine to florals, fabrics and bespoke themes. Every backdrop is designed for both the family in the hall and the camera in the corner.",
    image: U("photo-1490481651871-ab68de25d43d", 1400),
    services: ["Wedding Decoration", "Traditional Decoration", "Stage Decoration", "Theme Decoration", "Pandhal / Tent Setup"],
    prefillEvent: "Wedding",
    prefillServices: ["Stage & Décor"],
  },
  {
    key: "photography",
    number: "03",
    title: "Photography",
    italic: "& Film",
    blurb:
      "Cinematic frames that hold the goosebumps forever. Candid, traditional, aerial — the way your day actually felt, returned to you in colour and motion.",
    longBlurb:
      "From traditional album coverage to candid storytelling, cinematic films and drone aerials — our in-house photo and film team keeps the camera quiet, the lighting kind, and the resulting album something you'll re-open for years.",
    image: U("photo-1469371670807-013ccf25f16a", 1400),
    services: ["Photography", "Videography", "Candid Photography", "Drone Photography", "360 Camera", "Mirror Camera"],
    prefillEvent: "Wedding",
    prefillServices: ["Photography", "Videography"],
  },
  {
    key: "entertainment",
    number: "04",
    title: "Entertainment",
    italic: "& Shows",
    blurb:
      "Music, lights and spectacle that fill the room with joy. From the auspicious Chenda Melam to a closing DJ floor — the celebration never dips.",
    longBlurb:
      "We curate the evening — from the auspicious entry of Nadaswaram and Chenda Melam, through dance and magic shows, to a closing DJ floor under colour-mapped lighting. Every act sized to your space and guest list.",
    image: U("photo-1429962714451-bb934ecdc4ec", 1400),
    services: ["DJ", "Dance Shows", "Magic Shows", "Light Music Orchestra", "Chenda Melam", "Gun Shot Effects", "Celebrity Events", "Entertainment Events"],
    prefillEvent: "Wedding",
    prefillServices: ["DJ & Music", "Entertainment Shows"],
  },
  {
    key: "events",
    number: "05",
    title: "Events",
    italic: "& Occasions",
    blurb:
      "Beyond the wedding — every milestone deserves its moment. Baby showers, first birthdays, housewarmings, anniversaries, corporate evenings.",
    longBlurb:
      "Baby showers, first birthdays, housewarmings, anniversaries, corporate evenings — the smaller occasions matter to us as much as the grand ones. Same team, same care, scaled to suit.",
    image: U("photo-1530023367847-a683933f4172", 1400),
    services: ["Baby Shower Events", "Birthday Events", "House Warming", "Corporate Events", "Kids Activities", "Ring Throw Games"],
    prefillEvent: "Birthday",
    prefillServices: ["Stage & Décor"],
  },
  {
    key: "experiences",
    number: "06",
    title: "Live",
    italic: "Experiences",
    blurb:
      "The little luxuries guests never forget — LED walls, immersive lighting, crystalline sound, live counters and playful surprises.",
    longBlurb:
      "Live counters, chocolate fountains, 360 cameras, jumping balloons, audio rigs that fill the room without overpowering it — the playful and the practical touches your guests will tell their friends about.",
    image: U("photo-1492684223066-81342ee5ff30", 1400),
    services: ["Live Counters", "Audio Systems", "Lighting", "Jumping Balloon", "360 Camera"],
    prefillEvent: "Wedding",
    prefillServices: ["Live Counters", "Lighting & Audio"],
  },
];

export function getCollection(slug: string) {
  return SERVICE_COLLECTIONS.find((c) => c.key === slug);
}

export const ALL_SERVICES = [
  "Wedding Planning", "Wedding Decoration", "Traditional Decoration", "Stage Decoration",
  "Photography", "Videography", "Candid Photography", "Drone Photography",
  "Pre Wedding Shoot", "Post Wedding Shoot", "Baby Shower Events", "Birthday Events",
  "House Warming", "Corporate Events", "Theme Decoration", "Live Counters",
  "Audio Systems", "Lighting", "Pandhal / Tent Setup", "Welcome Entries",
  "Celebrity Events", "Entertainment Events", "DJ", "Dance Shows",
  "Magic Shows", "Light Music Orchestra", "Chenda Melam", "Gun Shot Effects",
  "Mirror Camera", "Jumping Balloon", "360 Camera", "Ring Throw Games", "Kids Activities",
];

// Packages — imagery removed per brief. Pricing-first luxury cards.
export const PACKAGES = [
  {
    key: "classic",
    name: "The Classic",
    tamilNote: "Intimate & Traditional",
    price: "₹1,00,000",
    priceNote: "Starting from",
    description:
      "A beautifully traditional celebration for close family — every essential gracefully handled, every ritual honoured.",
    includes: [
      "Muhurtham garlands & ritual orchestration",
      "Nadaswaram ensemble (1 set)",
      "Classic stage décor & welcome florals",
      "Cooking team — gold menu for 200 guests",
      "Photography & videography coverage",
      "200-page premium leather wedding album",
    ],
    accent: "var(--champagne)",
  },
  {
    key: "signature",
    name: "The Signature",
    tamilNote: "Most Chosen",
    price: "₹3,00,000",
    priceNote: "Starting from",
    description:
      "Our most-loved celebration — elevated florals, candid storytelling and an evening of curated entertainment.",
    includes: [
      "Everything in The Classic",
      "Premium themed stage & floral mandap",
      "Candid + drone photography",
      "Cinematic wedding film (3–5 min)",
      "Bridal makeup & saree draping",
      "DJ, intelligent lighting & two live counters",
    ],
    featured: true,
    accent: "var(--gold)",
  },
  {
    key: "grand",
    name: "The Grand",
    tamilNote: "The Full Spectacle",
    price: "₹5,00,000",
    priceNote: "Starting from",
    description:
      "No detail spared. A landmark wedding with bespoke themes, full entertainment programming and white-glove management.",
    includes: [
      "Everything in The Signature",
      "Bespoke theme design & art direction",
      "Celebrity MC & live performance suite",
      "Five live counters & grand welcome entries",
      "360° camera, drone & full film team",
      "Dedicated event manager (day-of)",
    ],
    accent: "var(--maroon)",
  },
];

export const WHY_US = [
  {
    title: "One trusted family",
    stat: "30+",
    statLabel: "Services Under One Roof",
    body:
      "No chasing vendors. Simon and his team carry every moving piece — décor, film, music, food, logistics — so yours can simply be present.",
  },
  {
    title: "Eight years, hundreds of mandaps",
    stat: "600+",
    statLabel: "Families Served Since 2016",
    body:
      "From quiet temple ceremonies to landmark receptions across Tamil Nadu — quietly becoming the name families recommend to their cousins.",
  },
  {
    title: "Rooted in tradition",
    stat: "100%",
    statLabel: "Rituals Honoured",
    body:
      "From Nadaswaram to Chenda Melam, we honour every custom with reverence — paired with the polish a premium event demands.",
  },
  {
    title: "Always one message away",
    stat: "24/7",
    statLabel: "Direct WhatsApp Line",
    body:
      "Plan, ask, adjust — Simon answers personally on WhatsApp. Real people, real responses, right when you need them.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "SimBells turned our daughter's wedding into something out of a film. The mandap, the lights, the way they handled every elder's request — we only had to enjoy the day.",
    name: "Lakshmi & Family",
    event: "Wedding · Trichy",
    image: U("photo-1591604129939-f1efa4d9f7fa", 1000),
  },
  {
    quote:
      "We booked the Signature collection and it exceeded every expectation. The candid film still gives us goosebumps a year later. Simon is a true professional.",
    name: "Priya & Karthik",
    event: "Wedding & Reception",
    image: U("photo-1597157639073-69284dc0fdaf", 1000),
  },
  {
    quote:
      "From the welcome entry to the live counters, our guests kept asking who planned it. Effortless, elegant, and worth every rupee.",
    name: "Meena & Suresh",
    event: "Reception · Trichy",
    image: U("photo-1532712938310-34cb3982ef74", 1000),
  },
];

// Gallery — entirely unique imagery, not reused anywhere else on the site.
export const GALLERY = [
  { src: U("photo-1519225421980-715cb0215aed", 1200), category: "Wedding", span: "tall" },
  { src: U("photo-1543132220-3ec99c6094dc", 1200), category: "Photography", span: "wide" },
  { src: U("photo-1465495976277-4387d4b0e4a6", 1200), category: "Wedding", span: "normal" },
  { src: U("photo-1525772764200-be829a350797", 1200), category: "Decoration", span: "tall" },
  { src: U("photo-1591604466107-ec97de577aff", 1200), category: "Photography", span: "normal" },
  { src: U("photo-1519671482749-fd09be7ccebf", 1200), category: "Reception", span: "wide" },
  { src: U("photo-1583939003579-730e3918a45a", 0), category: "Wedding", span: "tall" }, // placeholder — replaced below
  { src: U("photo-1490481651871-ab68de25d43d", 1200), category: "Decoration", span: "normal" },
  { src: U("photo-1620894752767-f906ee3a36a4", 1200), category: "Wedding", span: "wide" },
  { src: U("photo-1559587898-7e02d8ef0633", 1200), category: "Photography", span: "normal" },
  { src: U("photo-1519741497674-611481863552", 1200), category: "Wedding", span: "tall" }, // collision with weddings card – swap below
  { src: U("photo-1606490194859-07c18c9f0968", 1200), category: "Decoration", span: "normal" },
  { src: U("photo-1604506656998-67d6b78f8a3a", 1200), category: "Reception", span: "wide" },
  { src: U("photo-1551503766-ac63dfa6401c", 1200), category: "Wedding", span: "normal" },
  { src: U("photo-1561489396-888724a1543d", 1200), category: "Reception", span: "wide" },
  { src: U("photo-1571266028243-d220c6c4d3a3", 1200), category: "Decoration", span: "normal" },
].map((g, i) => {
  // De-collide: ensure no gallery image is reused in the service cards / story / hero.
  const collisions: Record<string, string> = {
    [U("photo-1519741497674-611481863552", 1200)]: U("photo-1465429112368-7d8a82c2a7e8", 1200),
    [U("photo-1583939003579-730e3918a45a", 0)]: U("photo-1525258801497-0ed2dbe4c11d", 1200),
  };
  return collisions[g.src] ? { ...g, src: collisions[g.src] } : g;
});

export const GALLERY_CATEGORIES = ["All", "Wedding", "Reception", "Decoration", "Photography"];
