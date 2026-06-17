// Central SimBells business data — single source of truth

export const BUSINESS = {
  name: "SimBells",
  fullName: "SimBells Weddings & Events",
  tagline: "You Dream It. We Make It.",
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
  whatsapp: "919965057920",
  instagram: { handle: "@simbells_event_planner", url: "https://instagram.com/simbells_event_planner" },
  facebook: { handle: "SimBells Events", url: "https://www.facebook.com/profile.php?id=100063786083655" },
  mapsQuery: "SimBells+Wedding+And+Events,+Tennur+High+Road,+Tennur,+Trichy",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.6!2d78.6833499!3d10.8170537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf56699c780bf%3A0x65b5cb9af3b35c82!2sSimBells%20Wedding%20And%20Events!5e0!3m2!1sen!2sin!4v1718000000000",
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
  { href: "/contact", label: "Contact" },
];

// Service collections — grouped editorially.
// prefillEvent + prefillServices feed the Plan My Event wizard when the
// "Plan My Event" button is clicked inside a service detail page.
export const SERVICE_COLLECTIONS = [
  {
    key: "weddings",
    number: "01",
    title: "Weddings",
    italic: "Planning",
    blurb:
      "From the first muhurtham to the final farewell, we orchestrate every ritual, every detail, every emotion — so your family simply celebrates.",
    longBlurb:
      "A SimBells wedding is a single, calm choreography of dozens of moving pieces — booked, briefed, dressed and timed by one team. We work with families across Trichy to honour the traditions that matter, design the moments worth remembering, and quietly handle everything in between.",
    image: "/images/mandap1.jpg",
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
      "Mandaps that take the breath away. Traditional grandeur and modern themes, designed around your story and built to be remembered.",
    longBlurb:
      "Our décor team builds mandaps, stages and welcome entries that feel personal — from traditional gold and jasmine to florals, fabrics and bespoke themes. Every backdrop is designed for both the family in the hall and the camera in the corner.",
    image: "/images/florals1.jpg",
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
      "Cinematic frames that hold the goosebumps forever. Candid, traditional, aerial — the way your day actually felt.",
    longBlurb:
      "From traditional album coverage to candid storytelling, cinematic films and drone aerials — our in-house photo and film team keeps the camera quiet, the lighting kind, and the resulting album something you'll re-open for years.",
    image: "/images/hero2.jpg",
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
      "Music, lights and spectacle that fill the room with joy. From Chenda Melam to a full DJ floor, the celebration never dips.",
    longBlurb:
      "We curate the evening — from the auspicious entry of Nadaswaram and Chenda Melam, through dance and magic shows, to a closing DJ floor under colour-mapped lighting. Every act sized to your space and guest list.",
    image: "/images/bride1.jpg",
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
      "Beyond the wedding — every milestone deserves its moment. Baby showers, birthdays, housewarmings and corporate evenings.",
    longBlurb:
      "Baby showers, first birthdays, housewarmings, anniversaries, corporate evenings — the smaller occasions matter to us as much as the grand ones. Same team, same care, scaled to suit.",
    image: "/images/candid1.jpg",
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
      "The little luxuries guests never forget — live counters, immersive lighting, crystalline sound and playful surprises.",
    longBlurb:
      "Live counters, chocolate fountains, 360 cameras, jumping balloons, audio rigs that fill the room without overpowering it — the playful and the practical touches your guests will tell their friends about.",
    image: "/images/indian11.jpg",
    services: ["Live Counters", "Audio Systems", "Lighting", "Jumping Balloon", "360 Camera"],
    prefillEvent: "Wedding",
    prefillServices: ["Live Counters", "Lighting & Audio"],
  },
];

export function getCollection(slug: string) {
  return SERVICE_COLLECTIONS.find((c) => c.key === slug);
}

// Flat list of every service (for the services page index)
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

export const PACKAGES = [
  {
    key: "classic",
    name: "The Classic",
    tamilNote: "Intimate & Traditional",
    price: "₹1,00,000",
    priceNote: "Starting from",
    image: "/images/indian4.jpg",
    description:
      "A complete, beautifully traditional wedding for close family — every essential, gracefully handled.",
    includes: [
      "Muhurtham garland & rituals",
      "Nadaswaram (1 set)",
      "Classic stage decoration",
      "Cooking team — gold menu for 200 guests",
      "Photography & videography",
      "200-page premium album",
    ],
    accent: "var(--champagne)",
  },
  {
    key: "signature",
    name: "The Signature",
    tamilNote: "Most Chosen",
    price: "₹3,00,000",
    priceNote: "Starting from",
    image: "/images/hero1.jpg",
    description:
      "Our most-loved celebration — elevated décor, candid storytelling and an evening of entertainment.",
    includes: [
      "Everything in The Classic",
      "Premium themed stage & mandap",
      "Candid + drone photography",
      "Cinematic wedding film",
      "Bridal makeup & saree draping",
      "DJ, lighting & two live counters",
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
    image: "/images/indian5.jpg",
    description:
      "No detail spared. A landmark wedding with bespoke themes, full entertainment and white-glove management.",
    includes: [
      "Everything in The Signature",
      "Bespoke theme design",
      "Celebrity MC & live shows",
      "Five live counters & welcome entries",
      "360° camera & full film team",
      "Dedicated event manager",
    ],
    accent: "var(--maroon)",
  },
];

export const WHY_US = [
  {
    title: "One trusted family",
    body: "Over thirty services under a single roof. No chasing vendors — Simon and his team carry it all, so yours can simply be present.",
  },
  {
    title: "Eight years, hundreds of mandaps",
    body: "Since 2016, we have shaped weddings and celebrations across Trichy and beyond — quietly becoming the name families recommend.",
  },
  {
    title: "Rooted in tradition",
    body: "From Nadaswaram to Chenda Melam, we honour every ritual with the reverence it deserves — and the polish a premium event demands.",
  },
  {
    title: "Always one message away",
    body: "Plan, ask, adjust — Simon answers personally on WhatsApp. Real people, real responses, right when you need them.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "SimBells turned our daughter's wedding into something out of a film. The mandap, the lights, the way they handled every elder's request — we only had to enjoy the day.",
    name: "Lakshmi & Family",
    event: "Wedding · Trichy",
    image: "/images/bride1.jpg",
  },
  {
    quote:
      "We booked the Signature package and it exceeded every expectation. The candid film still gives us goosebumps. Simon is a true professional.",
    name: "Priya & Karthik",
    event: "Wedding & Reception",
    image: "/images/indian5.jpg",
  },
  {
    quote:
      "From the welcome entry to the live counters, our guests kept asking who planned it. Effortless, elegant, and worth every rupee.",
    name: "Meena & Suresh",
    event: "Reception · Trichy",
    image: "/images/stage1.jpg",
  },
];

export const GALLERY = [
  { src: "/images/hero1.jpg", category: "Wedding", span: "tall" },
  { src: "/images/indian2.jpg", category: "Photography", span: "wide" },
  { src: "/images/candid1.jpg", category: "Decoration", span: "normal" },
  { src: "/images/indian4.jpg", category: "Wedding", span: "tall" },
  { src: "/images/bride1.jpg", category: "Reception", span: "normal" },
  { src: "/images/indian11.jpg", category: "Decoration", span: "wide" },
  { src: "/images/couple3.jpg", category: "Photography", span: "tall" },
  { src: "/images/stage1.jpg", category: "Wedding", span: "normal" },
  { src: "/images/indian6.jpg", category: "Reception", span: "wide" },
  { src: "/images/hero2.jpg", category: "Photography", span: "normal" },
  { src: "/images/indian5.jpg", category: "Wedding", span: "tall" },
  { src: "/images/florals1.jpg", category: "Decoration", span: "normal" },
  { src: "/images/mandap1.jpg", category: "Wedding", span: "tall" },
  { src: "/images/ceremony1.jpg", category: "Decoration", span: "normal" },
  { src: "/images/couple2.jpg", category: "Wedding", span: "wide" },
  { src: "/images/decor1.jpg", category: "Decoration", span: "normal" },
];

export const GALLERY_CATEGORIES = ["All", "Wedding", "Reception", "Decoration", "Photography"];
