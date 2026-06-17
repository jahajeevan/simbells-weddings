"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { GALLERY, GALLERY_CATEGORIES, IMG } from "@/lib/content";

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const items = active === "All" ? GALLERY : GALLERY.filter((g) => g.category === active);

  return (
    <>
      {/* Header */}
      <section className="relative h-[52vh] min-h-[380px] flex items-end overflow-hidden bg-ink">
        <Image src={IMG.hero} alt="A SimBells bridal portrait" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 scrim-full" />
        <div className="relative z-10 wrap section-x pb-14 w-full">
          <div className="flex items-center gap-4 mb-5">
            <span className="eyebrow text-champagne">The Portfolio</span>
            <span className="h-px w-14 bg-gold" />
          </div>
          <h1 className="font-display text-ivory text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
            Moments we&apos;ve <span className="italic font-light text-gold-grad">made</span>
          </h1>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[60px] z-30 bg-ivory/95 backdrop-blur-md border-b border-champagne/40">
        <div className="wrap section-x py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`eyebrow text-[0.6rem] whitespace-nowrap px-5 py-2.5 rounded-full transition-all ${
                active === c ? "bg-maroon text-ivory" : "text-ink-soft border border-champagne hover:border-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry */}
      <section className="bg-ivory section-x py-12 md:py-16">
        <div className="wrap">
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]">
            <AnimatePresence>
              {items.map((item) => (
                <motion.button
                  layout
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightbox(item.src)}
                  className="img-zoom mb-3 md:mb-4 block w-full break-inside-avoid rounded-sm overflow-hidden group relative"
                >
                  <Image
                    src={item.src}
                    alt={`SimBells ${item.category} photography`}
                    width={600}
                    height={item.span === "tall" ? 820 : item.span === "wide" ? 440 : 600}
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors flex items-end p-4">
                    <span className="eyebrow text-[0.55rem] text-ivory opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.category}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-6 right-6 text-ivory/70 hover:text-gold transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full aspect-[3/2]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox} alt="SimBells wedding photograph" fill sizes="100vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
