import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { GALLERY } from "@/lib/content";

const layout = [
  "row-span-2",
  "",
  "",
  "row-span-2",
  "",
  "",
];

export function GalleryPreview() {
  const shots = GALLERY.slice(0, 6);
  return (
    <section
      className="section-y section-x"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-luxe) 0%, var(--cream-luxe) 100%)",
      }}
    >
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <span className="eyebrow text-rose-gold-deep tracking-[0.4em]">The Gallery</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-4">
                Moments we&apos;ve{" "}
                <span className="italic font-light text-rose-grad">made.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink-soft mt-5 max-w-lg leading-relaxed">
                A small window into the weddings we&apos;ve quietly shaped — every frame
                a family who trusted us with their once-in-a-lifetime day.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/gallery"
              className="eyebrow text-ink border-b-2 border-rose-gold pb-1.5 hover:text-luxury-accent-deep transition-colors whitespace-nowrap tracking-[0.32em]"
            >
              Explore Full Gallery →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 4) * 0.06} className={layout[i]}>
              <Link href="/gallery" className="img-zoom block relative w-full h-full rounded-sm overflow-hidden group">
                <Image
                  src={s.src}
                  alt={`SimBells ${s.category} photography`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="eyebrow text-cream-luxe text-[0.55rem] tracking-[0.35em] backdrop-blur-sm bg-ink/40 px-3 py-1.5 rounded-full inline-block">
                    {s.category}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
