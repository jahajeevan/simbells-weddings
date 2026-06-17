import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FloralDivider } from "@/components/FloralDivider";
import { SERVICE_COLLECTIONS } from "@/lib/content";

export function Services() {
  return (
    <section className="bg-cream section-y section-x">
      <div className="wrap">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow text-gold-deep">What We Create</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-5">
              Six worlds, <span className="italic font-light text-maroon">one</span> celebration
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <FloralDivider className="mt-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-soft mt-6 leading-relaxed">
              Every element of your day, composed by a single team. Explore the
              collections that come together to make a SimBells wedding.
            </p>
          </Reveal>
        </div>

        {/* Editorial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICE_COLLECTIONS.map((c, i) => (
            <Reveal key={c.key} delay={(i % 3) * 0.08}>
              <Link href={`/services/${c.key}`} className="group block">
                <article className="img-zoom relative aspect-[3/4] rounded-sm overflow-hidden">
                  <Image
                    src={c.image}
                    alt={`${c.title} ${c.italic} by SimBells`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 scrim-b" />

                  {/* Number */}
                  <span className="absolute top-5 left-5 font-display italic text-ivory/70 text-xl">
                    {c.number}
                  </span>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-ivory text-2xl md:text-3xl leading-tight">
                      {c.title}{" "}
                      <span className="italic font-light text-champagne">{c.italic}</span>
                    </h3>
                    <p className="text-cream/80 text-sm mt-2 leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500">
                      {c.blurb}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.services.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="eyebrow text-[0.55rem] text-ivory/90 border border-ivory/30 rounded-full px-3 py-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="text-center mt-14">
            <Link
              href="/services"
              className="eyebrow inline-block text-ink border border-ink/30 rounded-full px-9 py-4 hover:bg-ink hover:text-ivory transition-all duration-300"
            >
              View All
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
