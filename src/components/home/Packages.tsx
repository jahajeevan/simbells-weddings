import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PACKAGES, waLink } from "@/lib/content";

export function Packages() {
  return (
    <section className="bg-ink section-y section-x relative overflow-hidden">
      {/* subtle texture */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #C9A24B 0%, transparent 45%), radial-gradient(circle at 80% 80%, #6E1023 0%, transparent 45%)" }} />

      <div className="wrap relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow text-gold">Wedding Collections</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-ivory text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-5">
              Choose your <span className="italic font-light text-gold-grad">chapter</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-cream/70 mt-6 leading-relaxed">
              Three curated collections — each a complete celebration, each
              tailored around your family. Every price is a beginning, not a ceiling.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.1} className="h-full">
              <article
                className={`group relative h-full flex flex-col rounded-sm overflow-hidden border transition-all duration-500 ${
                  p.featured
                    ? "border-gold lg:-translate-y-4 shadow-2xl shadow-black/40"
                    : "border-champagne/20 hover:border-champagne/50"
                }`}
              >
                {/* Image header */}
                <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} wedding collection`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 scrim-b" />
                  {p.featured && (
                    <span className="absolute top-4 right-4 eyebrow text-[0.55rem] bg-gold text-ink px-3 py-1.5 rounded-full">
                      Most Chosen
                    </span>
                  )}
                  <div className="absolute bottom-4 left-5">
                    <span className="eyebrow text-champagne text-[0.6rem]">{p.tamilNote}</span>
                    <h3 className="font-display text-ivory text-3xl leading-tight mt-1">{p.name}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 bg-[#221a12] p-7">
                  <div className="flex items-baseline gap-2 pb-5 border-b border-champagne/15">
                    <span className="eyebrow text-stone text-[0.6rem]">{p.priceNote}</span>
                    <span className="font-display text-gold-grad text-3xl">{p.price}</span>
                  </div>

                  <p className="text-cream/70 text-sm leading-relaxed mt-5">{p.description}</p>

                  <ul className="mt-5 space-y-2.5 flex-1">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-cream/85 text-sm">
                        <span className="mt-2 w-1 h-1 rounded-full bg-gold flex-shrink-0" />
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
                        ? "bg-gold text-ink hover:bg-champagne"
                        : "border border-champagne/40 text-champagne hover:bg-champagne/10"
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
          <p className="text-center text-stone text-sm mt-10 font-serif italic">
            Every collection is fully customisable — tell us your dream, and we&apos;ll shape the package around it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
