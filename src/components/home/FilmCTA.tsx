import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FloralDivider } from "@/components/FloralDivider";
import { BUSINESS, waLink, IMG } from "@/lib/content";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";

export function FilmCTA() {
  return (
    <section className="relative min-h-[80vh] flex items-center section-x py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMG.filmCta}
          alt="A couple at sunset, veil flowing in the golden light"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 scrim-full" />
      </div>

      <div className="wrap relative w-full text-center">
        <Reveal>
          <FloralDivider className="mb-8 mx-auto" color="var(--gold)" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-ivory text-5xl md:text-6xl lg:text-7xl leading-[0.98]">
            Your story
            <br />
            <span className="italic font-light text-gold-grad">begins here.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-serif italic text-cream/90 text-xl md:text-2xl mt-7 max-w-xl mx-auto">
            {BUSINESS.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/plan"
              className="eyebrow bg-ivory text-ink px-10 py-4 rounded-full hover:bg-gold transition-colors duration-300"
            >
              Plan My Event
            </Link>
            <a
              href={waLink(`Hello ${BUSINESS.owner}! I'd love to begin planning with SimBells.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow flex items-center justify-center gap-3 border border-ivory/60 text-ivory px-10 py-4 rounded-full hover:bg-ivory/10 transition-colors duration-300"
            >
              <WhatsAppGlyph className="w-4 h-4" />
              WhatsApp Simon
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-12">
            {BUSINESS.phones.map((p) => (
              <a key={p} href={`tel:+91${p.replace(/\s/g, "")}`} className="eyebrow text-champagne hover:text-gold transition-colors">
                {p}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
