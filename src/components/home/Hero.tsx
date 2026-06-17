"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
  const yAside = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Mouse-follow depth on the editorial side panel
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAF5F0 0%, #F8F2EE 60%, #EFDFD7 100%)" }}
    >
      {/* Soft cinematic background image — couple portrait, blush graded */}
      <motion.div style={{ y: yMain }} className="absolute inset-0">
        <Image
          src={IMG.hero}
          alt="A luxury Indian bride in editorial portrait — SimBells weddings"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_35%] breathe-zoom"
          style={{ filter: "brightness(0.62) saturate(1.05) contrast(1.05)" }}
        />
        {/* Rose-gold colour grade — keeps it cinematic, not muddy */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(232,199,193,0.55) 0%, rgba(217,162,115,0.35) 35%, rgba(43,29,26,0.0) 70%)",
          }}
        />
        {/* Luxe overlay scrim — stronger for headline legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(43,29,26,0.55) 0%, rgba(43,29,26,0.25) 30%, rgba(43,29,26,0.65) 65%, rgba(43,29,26,0.92) 100%)",
          }}
        />
        {/* Bottom-left dark wash where the headline sits */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 70% at 25% 78%, rgba(43,29,26,0.9) 0%, rgba(43,29,26,0.55) 30%, rgba(43,29,26,0) 70%)",
          }}
        />
        {/* Diagonal rose-gold accent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(142,79,90,0.35) 0%, rgba(43,29,26,0.0) 45%, rgba(217,162,115,0.18) 100%)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 60%, rgba(43,29,26,0) 55%, rgba(43,29,26,0.65) 100%)",
          }}
        />
      </motion.div>

      {/* Floating petals — luxe */}
      <FloatingPetals count={10} />

      {/* TOP — eyebrow with double gold rule */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 wrap section-x pt-28 md:pt-32 flex justify-center"
      >
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--rose-gold)]" />
          <span className="eyebrow text-cream-luxe text-[0.62rem] tracking-[0.4em]">
            {BUSINESS.city} · Est. {BUSINESS.establishedYear} · A Luxury Wedding Atelier
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--rose-gold)]" />
        </div>
      </motion.div>

      {/* Vertical right caption */}
      <div className="hidden md:flex absolute right-7 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3">
        <span className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--rose-gold)] to-transparent" />
        <span className="eyebrow text-cream-luxe/70 [writing-mode:vertical-rl] text-[0.55rem] tracking-[0.45em]">
          Cinematic Weddings · Trichy
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--rose-gold)] to-transparent" />
      </div>

      {/* Floating editorial chip — top-right luxury accent (mouse-follow depth) */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="hidden lg:block absolute top-32 right-32 z-10"
      >
        <div className="glass-dark rounded-full px-5 py-2.5 luxe-glow">
          <span className="eyebrow text-cream-luxe text-[0.55rem] tracking-[0.35em]">
            ★ Trusted by 600+ Families
          </span>
        </div>
      </motion.div>

      {/* BOTTOM — editorial headline + CTAs */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="absolute inset-x-0 bottom-0 z-10 wrap section-x pb-20 md:pb-24"
      >
        <div className="max-w-3xl">
          {/* Small italic prelude */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif italic text-blush-luxe text-[1.05rem] md:text-xl mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            A wedding that lingers, long after the last guest leaves.
          </motion.p>

          {/* Editorial headline — exactly as requested */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-cream-luxe leading-[0.95] text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.6rem]"
            style={{ textShadow: "0 4px 32px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.6)" }}
          >
            You Dream It.
            <br />
            <span className="italic font-light">
              We Make It{" "}
              <span
                className="not-italic font-normal"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg,#E8C7C1 0%,#D9A273 45%,#B76E79 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Unforgettable.
              </span>
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-sans text-cream-luxe/85 text-base md:text-lg mt-8 max-w-xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Luxury Wedding Planning, Decoration, Photography & Events in Trichy —
            crafted end-to-end by one quiet, devoted team.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <Link
              href="/plan"
              className="eyebrow btn-rose px-10 py-4 rounded-full text-[0.7rem] tracking-[0.32em]"
            >
              Book Consultation →
            </Link>
            <Link
              href="/packages"
              className="eyebrow inline-flex items-center justify-center border border-cream-luxe/45 text-cream-luxe px-10 py-4 rounded-full hover:bg-cream-luxe/15 backdrop-blur-sm transition-all duration-300 text-[0.7rem] tracking-[0.32em]"
            >
              Explore Packages
            </Link>
            <a
              href={waLink(`Hello ${BUSINESS.owner}! I'd love to plan my wedding with SimBells.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center justify-center gap-2 text-cream-luxe/85 hover:text-blush-luxe transition-colors text-[0.6rem] sm:ml-2 tracking-[0.3em]"
            >
              <WhatsAppGlyph className="w-3.5 h-3.5" />
              Or chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating editorial side card — luxe quote */}
      <motion.div
        style={{ y: yAside, x: sx, opacity: fade }}
        className="hidden xl:block absolute right-24 bottom-32 z-10 max-w-[280px]"
      >
        <div className="glass rounded-2xl p-6 border border-[var(--rose-gold)]/40">
          <span className="eyebrow text-rose-gold-deep text-[0.55rem] tracking-[0.4em]">
            Signature Promise
          </span>
          <p className="font-serif italic text-ink text-[0.95rem] leading-relaxed mt-3">
            “Every petal placed, every frame composed — so your family simply gets to be present.”
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-8 bg-rose-gold" />
            <span className="eyebrow text-stone text-[0.55rem]">J. Simon, Founder</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="eyebrow text-cream-luxe/60 text-[0.55rem] tracking-[0.45em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-9 bg-gradient-to-b from-[var(--rose-gold)] to-transparent"
        />
      </div>
    </section>
  );
}
