"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BUSINESS, waLink } from "@/lib/content";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 -bottom-[22%]">
        <Image
          src="/images/hero1.jpg"
          alt="A bride and groom at golden hour, captured by SimBells Weddings & Events"
          fill
          priority
          sizes="100vw"
          className="object-cover ken-burns"
        />
        <div className="absolute inset-0 scrim-full" />
      </motion.div>

      {/* Top thin gold frame line */}
      <div className="absolute top-24 inset-x-6 md:inset-x-10 lg:inset-x-16 h-px bg-champagne/30 z-10" />

      {/* Vertical caption */}
      <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <span className="eyebrow text-champagne/80 [writing-mode:vertical-rl]">
          Cinematic Wedding Films · Trichy
        </span>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 h-full wrap section-x flex flex-col justify-end pb-20 md:pb-28"
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="eyebrow text-champagne">{BUSINESS.city} · Est. {BUSINESS.establishedYear}</span>
            <span className="h-px w-16 bg-gold" />
            <span className="eyebrow text-champagne">№ 01</span>
          </div>

          <h1 className="font-display text-ivory leading-[0.92] text-[3.4rem] sm:text-7xl lg:text-[7.5rem]">
            The Art of
            <br />
            <span className="italic font-light text-gold-grad">Forever.</span>
          </h1>

          <p className="font-serif italic text-cream/90 text-xl md:text-2xl mt-7 max-w-xl">
            {BUSINESS.tagline} A wedding worthy of a magazine cover — designed,
            decorated and filmed entirely by SimBells.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/plan"
              className="eyebrow text-center bg-ivory text-ink px-9 py-4 rounded-full hover:bg-gold transition-colors duration-300"
            >
              Plan My Event
            </Link>
            <a
              href={waLink(`Hello ${BUSINESS.owner}! I'd love to plan my wedding with SimBells.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow flex items-center justify-center gap-3 border border-ivory/60 text-ivory px-9 py-4 rounded-full hover:bg-ivory/10 transition-colors duration-300"
            >
              <WhatsAppGlyph className="w-4 h-4" />
              WhatsApp Simon
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="eyebrow text-ivory/60 text-[0.6rem]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </div>
    </section>
  );
}
