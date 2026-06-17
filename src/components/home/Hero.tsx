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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink">
      {/* Parallax floral mandap */}
      <motion.div style={{ y }} className="absolute inset-0 -bottom-[22%]">
        <Image
          src="/images/si_floral_stage.jpg"
          alt="A South Indian wedding mandap by SimBells — gold curtains, chandelier, floral garlands"
          fill
          priority
          sizes="100vw"
          className="object-cover ken-burns"
        />
        {/* Warm rose scrim — keeps imagery readable but warm, not heavy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(58,42,34,0.55) 0%, rgba(58,42,34,0.18) 35%, rgba(217,167,161,0.18) 70%, rgba(252,247,239,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* Floating petals (CSS only) */}
      <FloatingPetals count={10} />

      {/* Vertical caption */}
      <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <span className="eyebrow text-ivory/80 [writing-mode:vertical-rl]">
          Cinematic Wedding Films · Trichy
        </span>
      </div>

      {/* Content — glassmorphism card centered */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 h-full wrap section-x flex flex-col justify-center items-center text-center pt-24 pb-20"
      >
        <div
          className="rounded-2xl px-7 md:px-12 py-9 md:py-12 max-w-3xl"
          style={{
            background: "rgba(252, 247, 239, 0.86)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            border: "1px solid rgba(227, 205, 158, 0.45)",
            boxShadow: "0 24px 60px -16px rgba(58, 42, 34, 0.25), 0 8px 16px rgba(58, 42, 34, 0.08)",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow text-gold-deep">{BUSINESS.city} · Est. {BUSINESS.establishedYear}</span>
            <span className="h-px w-10 bg-gold" />
          </div>

          <p className="font-serif italic text-blush-deep text-[1.05rem] md:text-lg mb-4">
            A floral-couture wedding atelier
          </p>

          <h1 className="font-display text-ink leading-[0.96] text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[3.8rem]">
            Where every <span className="italic font-light text-blush-grad">petal</span>
            <br />
            <span className="italic font-light text-blush-grad">becomes</span> a memory.
          </h1>

          <p className="font-sans text-ink-soft text-base mt-6 max-w-xl mx-auto leading-relaxed">
            Crafting weddings, decoration, photography and live experiences in
            Trichy — with petals, candlelight and a little magic.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="/plan"
              className="eyebrow btn-peach px-8 py-3.5 rounded-full text-[0.7rem]"
            >
              Book a Consultation →
            </Link>
            <Link
              href="/packages"
              className="eyebrow border border-maroon/30 text-maroon px-8 py-3.5 rounded-full hover:bg-maroon hover:text-ivory transition-colors duration-300 text-[0.7rem]"
            >
              View Wedding Packages
            </Link>
          </div>
        </div>

        <a
          href={waLink(`Hello ${BUSINESS.owner}! I'd love to plan my wedding with SimBells.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow flex items-center gap-2 text-ivory mt-5 hover:text-gold transition-colors text-[0.6rem]"
        >
          <WhatsAppGlyph className="w-3.5 h-3.5" />
          Or chat with Simon on WhatsApp
        </a>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="eyebrow text-ivory/70 text-[0.55rem]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-7 bg-gradient-to-b from-gold to-transparent"
        />
      </div>
    </section>
  );
}
