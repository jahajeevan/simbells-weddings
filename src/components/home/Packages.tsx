import { Reveal } from "@/components/Reveal";
import { FloralDivider } from "@/components/FloralDivider";
import { PACKAGES, waLink } from "@/lib/content";

function CrestIcon({ featured }: { featured?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`mx-auto ${featured ? "text-luxury-accent" : "text-rose-gold-deep"}`}
      width="48"
      height="48"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crest-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 C 38 14, 50 14, 50 26 C 50 38, 38 44, 32 60 C 26 44, 14 38, 14 26 C 14 14, 26 14, 32 4 Z"
        fill="none"
        stroke="url(#crest-g)"
        strokeWidth="1.4"
      />
      <circle cx="32" cy="26" r="3" fill="currentColor" opacity="0.85" />
      <path d="M22 50 Q32 44 42 50" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function Packages() {
  return (
    <section
      className="section-y section-x relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--cream-luxe) 0%, var(--bg-luxe) 50%, var(--cream-luxe) 100%)",
      }}
    >
      {/* Soft blush spotlight behind the featured card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,199,193,0.6), rgba(232,199,193,0))",
        }}
      />

      <div className="wrap relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow text-rose-gold-deep tracking-[0.4em]">Signature Collections</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-5">
              A-to-Z <span className="italic font-light text-rose-grad">Wedding Packages</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <FloralDivider className="mt-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-soft mt-6 leading-relaxed">
              Starting from <span className="font-medium text-ink">₹1 Lakh</span> ·{" "}
              <span className="italic font-serif">fully customisable</span>
            </p>
          </Reveal>
        </div>

        {/* Cards — pricing-first, no imagery */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.1} className="h-full">
              <article
                className={`group relative h-full flex flex-col rounded-[20px] overflow-hidden card-tilt ${
                  p.featured
                    ? "bg-gradient-to-b from-white to-[#FBEFEA] border border-luxury-accent/35 lg:-translate-y-6 shadow-[0_30px_60px_-25px_rgba(183,110,121,0.35)]"
                    : "bg-white/90 backdrop-blur border border-rose-gold/25 shadow-[0_18px_44px_-30px_rgba(43,29,26,0.25)]"
                }`}
              >
                {/* Gold filigree corner */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 w-24 h-24 opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(217,162,115,0.4), transparent 60%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 w-24 h-24 opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle at bottom right, rgba(183,110,121,0.3), transparent 60%)",
                  }}
                />

                {p.featured && (
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 eyebrow bg-luxury-accent text-cream-luxe px-5 py-1.5 rounded-full text-[0.55rem] tracking-[0.4em] shadow-md">
                    ★ Most Loved
                  </div>
                )}

                {/* Top — crest, tier, name */}
                <div className="px-8 pt-14 pb-6 text-center relative">
                  <CrestIcon featured={p.featured} />
                  <span className="eyebrow text-stone text-[0.55rem] tracking-[0.42em] mt-5 block">
                    {p.tamilNote}
                  </span>
                  <h3
                    className={`font-display text-3xl md:text-[2.1rem] mt-2 ${
                      p.featured ? "text-luxury-accent-deep" : "text-ink"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-rose-gold" />
                    <span className="font-serif italic text-rose-gold-deep text-[0.85rem]">
                      Collection {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-rose-gold" />
                  </div>
                </div>

                {/* Price block */}
                <div className="px-8 py-6 text-center border-y border-rose-gold/20 bg-gradient-to-b from-transparent to-[#FAF5F0]/60">
                  <div className="eyebrow text-stone text-[0.55rem] tracking-[0.4em]">
                    {p.priceNote}
                  </div>
                  <div
                    className={`font-display mt-2 leading-none ${
                      p.featured ? "text-luxury-accent-deep text-[3.2rem]" : "text-ink text-[2.8rem]"
                    }`}
                  >
                    {p.price}
                  </div>
                  <div className="eyebrow text-stone text-[0.55rem] tracking-[0.3em] mt-2">
                    Onwards · GST extra
                  </div>
                </div>

                {/* Description + features */}
                <div className="px-8 pt-6 pb-8 flex flex-col flex-1">
                  <p className="text-ink-soft text-sm leading-relaxed text-center font-serif italic">
                    {p.description}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-soft text-[0.92rem] leading-snug">
                        <svg
                          viewBox="0 0 16 16"
                          className={`mt-1 w-3.5 h-3.5 flex-shrink-0 ${
                            p.featured ? "text-luxury-accent" : "text-rose-gold-deep"
                          }`}
                          aria-hidden="true"
                        >
                          <path
                            d="M2 8 L 6 12 L 14 3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waLink(
                      `Hello! I'm interested in the ${p.name} collection (${p.price}). Could you share more details?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`eyebrow text-center mt-8 py-4 rounded-full transition-all duration-300 text-[0.65rem] tracking-[0.35em] ${
                      p.featured
                        ? "btn-rose"
                        : "border border-luxury-accent/40 text-luxury-accent-deep hover:bg-luxury-accent hover:text-cream-luxe hover:border-luxury-accent"
                    }`}
                  >
                    Enquire on WhatsApp →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="text-center text-stone text-sm mt-14 font-serif italic max-w-xl mx-auto">
            Every collection is fully customisable — tell us your dream, and we&apos;ll shape the
            package around it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
