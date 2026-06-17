import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PACKAGES, waLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wedding Packages",
  description:
    "Three curated wedding collections from SimBells, Trichy — The Classic (₹1L), The Signature (₹3L) and The Grand (₹5L). Complete, customisable celebrations.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wedding Collections"
        title="Choose your"
        italic="chapter."
        image="/images/hero1.jpg"
        alt="Golden hour wedding couple"
        subtitle="Three complete celebrations — each a beginning, every detail customisable."
      />

      {/* Cards */}
      <section className="bg-ivory section-y section-x">
        <div className="wrap grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.1} className="h-full">
              <article
                className={`group h-full flex flex-col rounded-sm overflow-hidden border transition-all duration-500 ${
                  p.featured ? "border-gold shadow-2xl shadow-black/10 md:-translate-y-3" : "border-champagne hover:border-gold"
                }`}
              >
                <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                  <Image src={p.image} alt={`${p.name} collection`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 scrim-b" />
                  {p.featured && (
                    <span className="absolute top-4 right-4 eyebrow text-[0.55rem] bg-gold text-ink px-3 py-1.5 rounded-full">Most Chosen</span>
                  )}
                  <div className="absolute bottom-4 left-5">
                    <span className="eyebrow text-champagne text-[0.6rem]">{p.tamilNote}</span>
                    <h3 className="font-display text-ivory text-3xl leading-tight mt-1">{p.name}</h3>
                  </div>
                </div>

                <div className="flex flex-col flex-1 bg-white p-7">
                  <div className="flex items-baseline gap-2 pb-5 border-b border-champagne/60">
                    <span className="eyebrow text-stone text-[0.6rem]">{p.priceNote}</span>
                    <span className="font-display text-maroon text-3xl">{p.price}</span>
                  </div>
                  <p className="text-ink-soft text-sm leading-relaxed mt-5">{p.description}</p>
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-soft text-sm">
                        <span className="mt-2 w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(`Hello! I'm interested in the ${p.name} collection (${p.price}). Please share details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`eyebrow text-center mt-7 py-3.5 rounded-full transition-all ${
                      p.featured ? "bg-maroon text-ivory hover:bg-ink" : "border border-ink/30 text-ink hover:bg-ink hover:text-ivory"
                    }`}
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-center font-serif italic text-stone text-lg mt-12 max-w-2xl mx-auto">
            Prices vary with guest count, venue and bespoke requirements. Every collection is a
            starting point — we tailor each one to your family and your dream.
          </p>
        </Reveal>
      </section>

      {/* CTA band */}
      <section className="relative py-28 section-x overflow-hidden">
        <Image src="/images/si_floral_stage.jpg" alt="Wedding couple by the sea" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 scrim-full" />
        <div className="relative wrap-narrow text-center">
          <Reveal>
            <h2 className="font-display text-ivory text-4xl md:text-5xl leading-[1.05]">
              Not sure which fits? <span className="italic font-light text-gold-grad">Let&apos;s talk.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <Link href="/plan" className="eyebrow inline-block mt-8 bg-ivory text-ink px-10 py-4 rounded-full hover:bg-gold transition-colors">
              Start with Plan My Event
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
