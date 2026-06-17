import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FloralSprig } from "@/components/FloralDivider";
import { BUSINESS, IMG } from "@/lib/content";

const PILLARS = [
  { k: "600+", v: "Families served" },
  { k: "30+", v: "Services in-house" },
  { k: "8 yrs", v: "Quietly crafting" },
];

export function Story() {
  return (
    <section
      className="section-y section-x overflow-hidden relative"
      style={{
        background:
          "linear-gradient(180deg, var(--cream-luxe) 0%, var(--bg-luxe) 100%)",
      }}
    >
      <FloralSprig
        className="hidden md:block absolute -top-4 right-6 lg:right-16 opacity-25 w-16 h-16"
        color="var(--rose-gold-deep)"
      />
      <FloralSprig
        className="hidden md:block absolute bottom-4 left-6 lg:left-16 opacity-20 w-14 h-14 rotate-180"
        color="var(--rose-gold-deep)"
      />

      <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
        {/* Image collage */}
        <Reveal className="relative">
          <div className="img-zoom relative aspect-[4/5] rounded-sm overflow-hidden shadow-[0_30px_60px_-30px_rgba(43,29,26,0.35)]">
            <Image
              src={IMG.storyMain}
              alt="A luxury Indian wedding portrait — the SimBells story"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(43,29,26,0.35) 100%)" }} />
          </div>
          {/* Floating accent image */}
          <div className="hidden md:block absolute -bottom-10 -right-6 w-44 h-56 rounded-sm overflow-hidden border-4 border-cream-luxe shadow-2xl img-zoom card-tilt">
            <Image
              src={IMG.storyInset}
              alt="Bridal portrait — temple jewellery, candid frame"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
          {/* Est badge */}
          <div className="absolute -top-5 -left-2 md:-left-5 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center text-cream-luxe shadow-lg luxe-glow"
               style={{ background: "linear-gradient(135deg, var(--luxury-accent) 0%, var(--rose-gold-deep) 100%)" }}>
            <span className="font-display text-2xl leading-none">{BUSINESS.establishedYear}</span>
            <span className="eyebrow text-[0.5rem] mt-1 opacity-90">Since</span>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal>
            <div className="rule-gold-left mb-7 flex items-center gap-4">
              <span className="eyebrow text-rose-gold-deep tracking-[0.4em]">Our Story</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
              A house built on
              <br />
              <span className="italic font-light text-rose-grad">celebration.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-ink-soft text-[1.02rem] leading-relaxed max-w-xl font-sans">
              <p>
                SimBells began with a single belief — that every family deserves a
                wedding that feels effortless, and looks unforgettable. What began
                as a boutique décor studio on Tennur High Road has grown — quietly,
                deliberately — into a full luxury wedding house, with more than
                thirty services under one trusted roof.
              </p>
              <p>
                Led by <span className="text-ink font-medium">{BUSINESS.owner}</span>,
                our atelier treats each celebration as if it were our own —
                honouring tradition, embracing spectacle, and obsessing over the
                small details that turn a day into a memory the family re-tells
                for years.
              </p>
            </div>
          </Reveal>

          {/* Pillars strip */}
          <Reveal delay={0.13}>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {PILLARS.map((p) => (
                <div key={p.v} className="border-l-2 border-rose-gold pl-3">
                  <div className="font-display text-luxury-accent-deep text-2xl md:text-3xl">{p.k}</div>
                  <div className="eyebrow text-stone text-[0.55rem] mt-1 tracking-[0.3em]">{p.v}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                href="/about"
                className="eyebrow text-ink border-b-2 border-rose-gold pb-1.5 hover:text-luxury-accent-deep transition-colors tracking-[0.32em]"
              >
                The Full Story →
              </Link>
              <div className="font-serif italic text-luxury-accent-deep text-2xl">
                {BUSINESS.owner}
                <span className="block eyebrow not-italic text-stone text-[0.6rem] mt-1 font-sans">Founder</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
