"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BUSINESS, waLink } from "@/lib/content";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { FloatingPetals } from "@/components/FloatingPetals";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Subtle parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink"
    >
      {/* Parallax floral arch — the image IS the hero */}
      <motion.div style={{ y }} className="absolute inset-0 -bottom-[16%]">
        <Image
          src="/images/si_floral_arch.jpg"
          alt="A breathtaking floral arch mandap built by SimBells — pink and lavender roses, hydrangeas and hanging garlands"
          fill
          priority
          sizes="100vw"
          className="object-cover ken-burns"
        />
        {/* Soft scrim — darkens only the edges to keep text legible without
            obscuring the floral image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(58,42,34,0.5) 0%, rgba(58,42,34,0.08) 22%, rgba(58,42,34,0.0) 45%, rgba(58,42,34,0.55) 75%, rgba(58,42,34,0.88) 100%)",
          }}
        />
      </motion.div>

      {/* Floating petals — subtle */}
      <FloatingPetals count={8} />

      {/* TOP — eyebrow with gold rules */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 wrap section-x pt-28 md:pt-32 flex justify-center"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold/70" />
          <span className="eyebrow text-ivory/90 text-[0.6rem]">
            {BUSINESS.city} · Est. {BUSINESS.establishedYear} · A Floral-Couture Atelier
          </span>
          <span className="h-px w-10 bg-gold/70" />
        </div>
      </motion.div>

      {/* Vertical right caption */}
      <div className="hidden md:block absolute right-7 top-1/2 -translate-y-1/2 z-10">
        <span className="eyebrow text-ivory/70 [writing-mode:vertical-rl] text-[0.55rem]">
          Cinematic Wedding Films · Trichy
        </span>
      </div>

      {/* BOTTOM — editorial headline + CTAs, no container box */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="absolute inset-x-0 bottom-0 z-10 wrap section-x pb-16 md:pb-20"
      >
        <div className="max-w-3xl">
          {/* Small italic prelude */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif italic text-blush text-[1.05rem] md:text-xl mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            Where every petal becomes a memory
          </motion.p>

          {/* Big editorial headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-ivory leading-[0.95] text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
          >
            Weddings <span className="italic font-light text-blush">crafted</span>
            <br />
            with <span className="italic font-light text-blush">grace.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="font-sans text-ivory/85 text-base md:text-lg mt-7 max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            A South-Indian wedding house in Trichy designing mandaps, films
            and live experiences for families who only marry off a daughter once.
          </motion.p>

          {/* CTAs — floating pills, no enclosing box */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-3 mt-9"
          >
            <Link
              href="/plan"
              className="eyebrow btn-peach px-9 py-4 rounded-full text-[0.7rem]"
            >
              Book a Consultation →
            </Link>
            <Link
              href="/packages"
              className="eyebrow inline-flex items-center justify-center border border-ivory/40 text-ivory px-9 py-4 rounded-full hover:bg-ivory/15 backdrop-blur-sm transition-colors duration-300 text-[0.7rem]"
            >
              View Wedding Packages
            </Link>
            <a
              href={waLink(`Hello ${BUSINESS.owner}! I'd love to plan my wedding with SimBells.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center justify-center gap-2 text-ivory/85 hover:text-blush transition-colors text-[0.6rem] sm:ml-2"
            >
              <WhatsAppGlyph className="w-3.5 h-3.5" />
              Or chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="eyebrow text-ivory/60 text-[0.55rem]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-7 bg-gradient-to-b from-gold to-transparent"
        />
      </div>
    </section>
  );
}
