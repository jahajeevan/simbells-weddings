"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (dir: number) => setI((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="bg-cream section-y section-x">
      <div className="wrap-narrow">
        <div className="text-center mb-14">
          <span className="eyebrow text-gold-deep">Happy Couples</span>
          <h2 className="font-display text-ink text-4xl md:text-5xl leading-[1.05] mt-4">
            Words from <span className="italic font-light text-maroon">our families</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[0.8fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Portrait */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.image}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] rounded-sm overflow-hidden"
              >
                <Image src={t.image} alt={t.name} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute -top-4 -left-4 font-display italic text-gold text-7xl leading-none select-none">&ldquo;</div>
          </div>

          {/* Quote */}
          <div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.quote}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-serif italic text-ink text-2xl md:text-[1.7rem] leading-snug">
                  {t.quote}
                </p>
                <footer className="mt-7">
                  <div className="font-display text-maroon text-xl">{t.name}</div>
                  <div className="eyebrow text-stone text-[0.6rem] mt-1">{t.event}</div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5 ml-3">
                {TESTIMONIALS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-7 bg-gold" : "w-1.5 bg-ink/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
