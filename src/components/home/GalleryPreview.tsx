import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const shots = [
  { src: "/images/indian4.jpg", cls: "row-span-2" },
  { src: "/images/candid1.jpg", cls: "" },
  { src: "/images/indian2.jpg", cls: "" },
  { src: "/images/hero1.jpg", cls: "row-span-2" },
  { src: "/images/bride1.jpg", cls: "" },
  { src: "/images/indian11.jpg", cls: "" },
];

export function GalleryPreview() {
  return (
    <section className="bg-ivory section-y section-x">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <span className="eyebrow text-gold-deep">The Gallery</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-4">
                Moments we&apos;ve <span className="italic font-light text-maroon">made</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/gallery"
              className="eyebrow text-ink border-b-2 border-gold pb-1.5 hover:text-gold-deep transition-colors whitespace-nowrap"
            >
              Explore full gallery →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 4) * 0.06} className={s.cls}>
              <Link href="/gallery" className="img-zoom block relative w-full h-full rounded-sm overflow-hidden group">
                <Image
                  src={s.src}
                  alt="SimBells wedding photography"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
