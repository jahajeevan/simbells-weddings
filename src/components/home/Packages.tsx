import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PACKAGES, waLink } from "@/lib/content";

export function Packages() {
  return (
    <section className="bg-ivory section-y section-x relative overflow-hidden">
      <div className="wrap relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal>
            <span className="eyebrow text-gold-deep">Signature Collections</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-5">
              A-to-Z <span className="italic font-light text-blush-grad">Wedding Packages</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-soft mt-5 leading-relaxed">
              Starting from ₹1 Lakh · <span className="italic font-serif">fully customisable</span>
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.1} className="h-full">
              <article
                className={`group relative h-full flex flex-col rounded-2xl overflow-hidden bg-white card-luxe ${
                  p.featured
                    ? "border-2 border-blush-deep lg:-translate-y-4 shadow-xl shadow-blush-deep/15"
                    : "border border-champagne"
                }`}
              >
                {p.featured && (
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 eyebrow bg-blush-deep text-ivory px-5 py-1.5 rounded-b-md text-[0.55rem]"
                  >
                    ★ Most Loved
                  </div>
                )}

                {/* Header */}
                <div className="px-7 pt-9 pb-5 text-center">
                  <span className="eyebrow text-stone text-[0.55rem]">{p.tamilNote}</span>
                  <h3 className="font-display text-ink text-3xl mt-3">{p.name}</h3>
                </div>

                {/* Image */}
                <div className="img-zoom mx-6 mb-6 relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} collection`}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Body */}
                <div className="px-7 pb-7 flex flex-col flex-1">
                  <div className="text-center pb-5 border-b border-champagne">
                    <div className="eyebrow text-stone text-[0.55rem]">{p.priceNote}</div>
                    <div className={`font-display text-4xl mt-1 ${p.featured ? "text-maroon" : "text-ink"}`}>
                      {p.price}
                    </div>
                  </div>

                  <p className="text-ink-soft text-sm leading-relaxed mt-5 text-center">{p.description}</p>

                  <ul className="mt-5 space-y-2.5 flex-1">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-soft text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blush-deep flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waLink(`Hello! I'm interested in the ${p.name} collection (${p.price}). Could you share more details?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`eyebrow text-center mt-7 py-3.5 rounded-full transition-all duration-300 ${
                      p.featured
                        ? "btn-peach"
                        : "border border-maroon/30 text-maroon hover:bg-maroon hover:text-ivory"
                    }`}
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="text-center text-stone text-sm mt-10 font-serif italic max-w-xl mx-auto">
            Every collection is fully customisable — tell us your dream, and we&apos;ll shape the package around it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
