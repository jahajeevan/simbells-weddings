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
  mapsQuery: "K.P.R.S+Towers,+Tennur+High+Road,+Tennur,+Trichy+620017",
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

// Service collections — grouped editorially
export const SERVICE_COLLECTIONS = [
  {
    key: "weddings",
    number: "01",
    title: "Weddings",
    italic: "Planning",
    blurb:
      "From the first muhurtham to the final farewell, we orchestrate every ritual, every detail, every emotion — so your family simply celebrates.",
    image: "/images/indian6.jpg",
    services: ["Wedding Planning", "Pre Wedding Shoot", "Post Wedding Shoot", "Welcome Entries"],
  },
  {
    key: "decoration",
    number: "02",
    title: "Decoration",
    italic: "& Stage",
    blurb:
      "Mandaps that take the breath away. Traditional grandeur and modern themes, designed around your story and built to be remembered.",
    image: "/images/candid1.jpg",
    services: ["Wedding Decoration", "Traditional Decoration", "Stage Decoration", "Theme Decoration", "Pandhal / Tent Setup"],
  },
  {
    key: "photography",
    number: "03",
    title: "Photography",
    italic: "& Film",
    blurb:
      "Cinematic frames that hold the goosebumps forever. Candid, traditional, aerial — the way your day actually felt.",
    image: "/images/hero2.jpg",
    services: ["Photography", "Videography", "Candid Photography", "Drone Photography", "360 Camera", "Mirror Camera"],
  },
  {
    key: "entertainment",
    number: "04",
    title: "Entertainment",
    italic: "& Shows",
    blurb:
      "Music, lights and spectacle that fill the room with joy. From Chenda Melam to a full DJ floor, the celebration never dips.",
    image: "/images/bride1.jpg",
    services: ["DJ", "Dance Shows", "Magic Shows", "Light Music Orchestra", "Chenda Melam", "Gun Shot Effects", "Celebrity Events", "Entertainment Events"],
  },
  {
    key: "events",
    number: "05",
    title: "Events",
    italic: "& Occasions",
    blurb:
      "Beyond the wedding — every milestone deserves its moment. Baby showers, birthdays, housewarmings and corporate evenings.",
    image: "/images/indian5.jpg",
    services: ["Baby Shower Events", "Birthday Events", "House Warming", "Corporate Events", "Kids Activities", "Ring Throw Games"],
  },
  {
    key: "experiences",
    number: "06",
    title: "Live",
    italic: "Experiences",
    blurb:
      "The little luxuries guests never forget — live counters, immersive lighting, crystalline sound and playful surprises.",
    image: "/images/indian11.jpg",
    services: ["Live Counters", "Audio Systems", "Lighting", "Jumping Balloon", "360 Camera"],
  },
];

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
  { src: "/images/flowers1.jpg", category: "Photography", span: "normal" },
  { src: "/images/ceremony1.jpg", category: "Decoration", span: "normal" },
  { src: "/images/couple2.jpg", category: "Wedding", span: "wide" },
  { src: "/images/decor1.jpg", category: "Decoration", span: "normal" },
];

export const GALLERY_CATEGORIES = ["All", "Wedding", "Reception", "Decoration", "Photography"];
