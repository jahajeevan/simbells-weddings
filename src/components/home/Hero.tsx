"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BUSINESS, waLink, IMG } from "@/lib/content";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { FloatingPetals } from "@/components/FloatingPetals";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FBF2E9 0%, #F8EDE3 60%, #F0CFA8 100%)" }}
    >
      {/* Floral mandap background — image-forward */}
      <motion.div style={{ y: yMain }} className="absolute inset-0">
        <Image
          src={IMG.hero}
          alt="A floral mandap with hanging garlands of pink roses, marigolds and jasmine — SimBells signature"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center breathe-zoom"
          style={{ filter: "saturate(1.08) contrast(1.02)" }}
        />
        {/* Rose-gold colour grade */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(232,199,193,0.55) 0%, rgba(217,162,115,0.35) 35%, rgba(43,29,26,0.0) 70%)",
          }}
        />
        {/* Centered dark wash so the headline reads cleanly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 55%, rgba(43,29,26,0.55) 0%, rgba(43,29,26,0.2) 50%, rgba(43,29,26,0) 80%)",
          }}
        />
        {/* Soft top/bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(251,243,236,0.25) 0%, rgba(43,29,26,0) 25%, rgba(43,29,26,0) 70%, rgba(43,29,26,0.65) 100%)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 60%, rgba(43,29,26,0) 55%, rgba(43,29,26,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* Floating petals */}
      <FloatingPetals count={10} />

      {/* CENTERED hero content — matches the reference layout */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="absolute inset-0 z-10 wrap section-x flex flex-col items-center justify-center text-center pt-24"
      >
        {/* Eyebrow with double gold rule */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="flex items-center gap-4 mb-7"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--rose-gold)]" />
          <span className="eyebrow text-cream-luxe text-[0.62rem] tracking-[0.45em]">
            {BUSINESS.city}&apos;s Luxury Wedding Atelier
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--rose-gold)]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-cream-luxe leading-[0.95] text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.4rem] max-w-5xl"
          style={{ textShadow: "0 4px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.45)" }}
        >
          <span className="block font-serif italic text-[0.6em] mb-2 text-blush-luxe">
            You Dream It,
          </span>
          We Make It{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(100deg,#F0CFA8 0%,#E8C7C1 45%,#D9A273 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Unforgettable.
          </span>
        </motion.h1>

        {/* Floral divider sprig */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="my-7"
        >
          <svg width="44" height="20" viewBox="0 0 44 20" aria-hidden="true">
            <path d="M2 10 H 18" stroke="#D9A273" strokeWidth="1" />
            <path d="M26 10 H 42" stroke="#D9A273" strokeWidth="1" />
            <circle cx="22" cy="10" r="2.4" fill="#D9A273" />
            <circle cx="22" cy="10" r="5" fill="none" stroke="#D9A273" strokeOpacity="0.4" />
          </svg>
        </motion.div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="font-sans text-cream-luxe/90 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          A floral-couture wedding house crafting weddings, decoration, photography and
          live experiences in Trichy — with petals, candlelight and a little magic.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-3 mt-10"
        >
          <Link
            href="/plan"
            className="eyebrow btn-rose px-10 py-4 rounded-full text-[0.7rem] tracking-[0.32em]"
          >
            Book a Consultation →
          </Link>
          <Link
            href="/packages"
            className="eyebrow inline-flex items-center justify-center border border-cream-luxe/55 text-cream-luxe px-10 py-4 rounded-full hover:bg-cream-luxe/15 backdrop-blur-sm transition-all duration-300 text-[0.7rem] tracking-[0.32em]"
          >
            View Wedding Packages
          </Link>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          href={waLink(`Hello ${BUSINESS.owner}! I'd love to plan my wedding with SimBells.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow inline-flex items-center justify-center gap-2 text-cream-luxe/85 hover:text-blush-luxe transition-colors text-[0.6rem] mt-6 tracking-[0.3em]"
        >
          <WhatsAppGlyph className="w-3.5 h-3.5" />
          Or chat on WhatsApp
        </motion.a>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="eyebrow text-cream-luxe/70 text-[0.55rem] tracking-[0.45em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-9 bg-gradient-to-b from-[var(--rose-gold)] to-transparent"
        />
      </div>
    </section>
  );
}
