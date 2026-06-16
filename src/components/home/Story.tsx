import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@/lib/content";

export function Story() {
  return (
    <section className="bg-ivory section-y section-x overflow-hidden">
      <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image collage */}
        <Reveal className="relative">
          <div className="img-zoom relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/flowers1.jpg"
              alt="A cinematic black-and-white portrait of a couple beneath the bridal veil"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Floating accent image */}
          <div className="hidden md:block absolute -bottom-10 -right-6 w-44 h-56 rounded-sm overflow-hidden border-4 border-ivory shadow-2xl img-zoom">
            <Image
              src="/images/indian11.jpg"
              alt="South Indian gold temple jewellery"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
          {/* Est badge */}
          <div className="absolute -top-5 -left-2 md:-left-5 bg-maroon text-ivory w-24 h-24 rounded-full flex flex-col items-center justify-center text-center">
            <span className="font-display text-2xl leading-none">{BUSINESS.establishedYear}</span>
            <span className="eyebrow text-[0.5rem] text-champagne mt-1">Since</span>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal>
            <div className="rule-gold-left mb-7 flex items-center gap-4">
              <span className="eyebrow text-gold-deep">Our Story</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
              A house built on
              <br />
              <span className="italic font-light text-maroon">celebration.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-ink-soft text-[1.02rem] leading-relaxed max-w-xl font-sans">
              <p>
                SimBells began with a single belief — that every family deserves a
                wedding that feels effortless, and looks unforgettable. What started
                as a boutique décor studio in Trichy has grown into a full
                wedding house, with more than thirty services under one roof.
              </p>
              <p>
                Led by <span className="text-ink font-medium">{BUSINESS.owner}</span>,
                our team treats each celebration as if it were our own — honouring
                tradition, embracing spectacle, and obsessing over the details that
                make a day truly yours.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                href="/about"
                className="eyebrow text-ink border-b-2 border-gold pb-1.5 hover:text-gold-deep transition-colors"
              >
                The full story →
              </Link>
              <div className="font-serif italic text-maroon text-2xl">
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
