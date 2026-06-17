import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { WHY_US, IMG } from "@/lib/content";

export function WhyUs() {
  return (
    <section className="relative section-y section-x overflow-hidden">
      {/* Full-bleed cinematic background — rose-gold graded */}
      <div className="absolute inset-0">
        <Image
          src={IMG.whyUsBg}
          alt="A floral mandap at dusk — SimBells signature décor"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(43,29,26,0.85) 0%, rgba(43,29,26,0.7) 45%, rgba(142,79,90,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(217,162,115,0.25), transparent 60%)",
          }}
        />
      </div>

      <div className="wrap relative">
        <div className="max-w-2xl mb-16">
          <Reveal>
            <span className="eyebrow text-rose-gold tracking-[0.4em]">Why Families Choose Us</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-cream-luxe text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-5">
              Trusted with the
              <br />
              <span
                className="italic font-light"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg,#E8C7C1 0%,#D9A273 50%,#FAF5F0 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                biggest day.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-cream-luxe/75 mt-6 max-w-xl leading-relaxed">
              Eight years, hundreds of mandaps, one quiet promise — your family
              gets to be present, while we hold every detail.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={(i % 4) * 0.08}>
              <div
                className="group relative p-8 lg:p-9 h-full rounded-2xl border border-rose-gold/25 backdrop-blur-md card-tilt overflow-hidden"
                style={{ background: "rgba(43,29,26,0.45)" }}
              >
                {/* corner glow */}
                <span
                  aria-hidden="true"
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(217,162,115,0.7), transparent 70%)",
                  }}
                />
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-[2.6rem] leading-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg,#D9A273 0%,#E8C7C1 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {w.stat}
                  </span>
                </div>
                <div className="eyebrow text-rose-gold/80 text-[0.55rem] tracking-[0.3em] mt-1.5">
                  {w.statLabel}
                </div>
                <div className="h-px w-12 bg-rose-gold/40 my-5" />
                <h3 className="font-display text-cream-luxe text-xl leading-tight">{w.title}</h3>
                <p className="text-cream-luxe/75 text-sm leading-relaxed mt-3">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
