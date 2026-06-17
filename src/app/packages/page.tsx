import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Packages } from "@/components/home/Packages";
import { waLink, IMG } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wedding Packages",
  description:
    "Three curated wedding collections from SimBells, Trichy — The Classic (₹1L), The Signature (₹3L) and The Grand (₹5L). Complete, customisable celebrations.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wedding Collections"
        title="Choose your"
        italic="chapter."
        image={IMG.packagesHero}
        alt="Editorial luxury wedding moment"
        subtitle="Three complete celebrations — each a beginning, every detail customisable."
      />

      {/* Reuse the luxury, image-free package cards from the home component */}
      <Packages />

      {/* CTA band */}
      <section className="relative py-28 section-x overflow-hidden">
        <Image src={IMG.filmCta} alt="Wedding couple in cinematic lighting" fill sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(43,29,26,0.85) 0%, rgba(142,79,90,0.6) 100%)",
          }}
        />
        <div className="relative wrap-narrow text-center">
          <Reveal>
            <h2 className="font-display text-cream-luxe text-4xl md:text-5xl leading-[1.05]">
              Not sure which fits?{" "}
              <span
                className="italic font-light"
                style={{
                  backgroundImage: "linear-gradient(100deg,#E8C7C1,#D9A273,#FAF5F0)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Let&apos;s talk.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-serif italic text-cream-luxe/85 mt-6 max-w-xl mx-auto">
              Tell us your guest count, venue and dream — we&apos;ll shape a collection around it within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link href="/plan" className="eyebrow btn-rose inline-block px-10 py-4 rounded-full tracking-[0.32em] text-[0.7rem]">
                Start with Plan My Event
              </Link>
              <a
                href={waLink(`Hello! I'd like guidance on which package fits my wedding.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-block border border-cream-luxe/50 text-cream-luxe px-10 py-4 rounded-full hover:bg-cream-luxe/15 transition-colors tracking-[0.32em] text-[0.7rem]"
              >
                Chat with Simon
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
