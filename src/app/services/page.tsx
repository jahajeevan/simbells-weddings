import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SERVICE_COLLECTIONS, waLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Over 33 wedding and event services under one roof in Trichy — planning, décor, photography, entertainment, live counters and more. SimBells Weddings & Events.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Create"
        title="Everything, under"
        italic="one roof."
        image="/images/candid1.jpg"
        alt="Elegant wedding decoration"
        subtitle="Thirty-three services, one trusted team — so your family can simply celebrate."
      />

      {/* Alternating editorial spreads */}
      <section className="bg-ivory">
        {SERVICE_COLLECTIONS.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={c.key} className={`section-x py-16 md:py-24 ${i % 2 === 1 ? "bg-cream" : "bg-ivory"}`}>
              <div className={`wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <Link href={`/services/${c.key}`} className="block img-zoom relative aspect-[5/4] rounded-sm overflow-hidden group">
                    <Image
                      src={c.image}
                      alt={`${c.title} ${c.italic}`}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="eyebrow text-ivory bg-ink/70 px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        View collection →
                      </span>
                    </div>
                  </Link>
                </Reveal>

                <div className={flip ? "lg:order-1" : ""}>
                  <Reveal>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display italic text-gold text-3xl">{c.number}</span>
                      <span className="h-px w-12 bg-gold" />
                    </div>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="font-display text-ink text-4xl md:text-5xl leading-[1.03] mt-4">
                      {c.title} <span className="italic font-light text-maroon">{c.italic}</span>
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="text-ink-soft leading-relaxed mt-5 max-w-lg">{c.blurb}</p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <ul className="flex flex-wrap gap-2.5 mt-7">
                      {c.services.map((s) => (
                        <li key={s} className="eyebrow text-[0.6rem] text-ink-soft border border-champagne rounded-full px-4 py-2 bg-ivory">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <div className="mt-8 flex flex-wrap items-center gap-6">
                      <Link
                        href={`/services/${c.key}`}
                        className="eyebrow bg-maroon text-ivory px-7 py-3.5 rounded-full hover:bg-ink transition-colors"
                      >
                        Explore {c.title.toLowerCase()} →
                      </Link>
                      <a
                        href={waLink(`Hello! I'd like to know more about ${c.title} ${c.italic} services.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eyebrow text-ink border-b-2 border-gold pb-1.5 hover:text-gold-deep transition-colors"
                      >
                        Enquire on WhatsApp
                      </a>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="bg-ink section-y section-x text-center">
        <div className="wrap-narrow">
          <Reveal>
            <h2 className="font-display text-ivory text-4xl md:text-5xl leading-[1.05]">
              Can&apos;t find it here? <span className="italic font-light text-gold-grad">Just ask.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-cream/70 mt-5 max-w-lg mx-auto">
              We customise everything. Tell us your vision and we&apos;ll build the celebration around it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
              <Link href="/plan" className="eyebrow bg-ivory text-ink px-9 py-4 rounded-full hover:bg-gold transition-colors">
                Plan My Event
              </Link>
              <a href={waLink("Hello! I have a custom requirement for my event.")} target="_blank" rel="noopener noreferrer"
                className="eyebrow border border-ivory/60 text-ivory px-9 py-4 rounded-full hover:bg-ivory/10 transition-colors">
                WhatsApp Simon
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
