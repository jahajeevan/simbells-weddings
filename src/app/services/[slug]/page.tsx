import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { SERVICE_COLLECTIONS, getCollection, waLink, BUSINESS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";

export function generateStaticParams() {
  return SERVICE_COLLECTIONS.map((c) => ({ slug: c.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return { title: "Service" };
  return {
    title: `${c.title} ${c.italic}`,
    description: c.blurb,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  // Build the prefill URL for the wizard
  const planUrl =
    `/plan?event=${encodeURIComponent(c.prefillEvent)}` +
    `&services=${encodeURIComponent(c.prefillServices.join(","))}` +
    `&from=${c.key}`;

  return (
    <>
      {/* Hero header */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden bg-ink">
        <Image
          src={c.image}
          alt={`${c.title} ${c.italic} by SimBells`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 scrim-full" />
        <div className="relative z-10 wrap section-x pb-14 md:pb-20 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-champagne/80">
            <Link href="/services" className="eyebrow hover:text-gold transition-colors">
              All Services
            </Link>
            <ChevronRight className="w-3 h-3 text-champagne/50" />
            <span className="eyebrow text-gold">{c.title}</span>
          </nav>
          <div className="flex items-baseline gap-4 mb-3">
            <span className="font-display italic text-gold text-3xl">{c.number}</span>
            <span className="h-px w-14 bg-gold" />
            <span className="eyebrow text-champagne text-[0.6rem]">Collection</span>
          </div>
          <h1 className="font-display text-ivory text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
            {c.title} <span className="italic font-light text-gold-grad">{c.italic}</span>
          </h1>
          <p className="font-serif italic text-cream/85 text-xl md:text-2xl mt-5 max-w-2xl">
            {c.blurb}
          </p>
        </div>
      </section>

      {/* Detail body */}
      <section className="bg-ivory section-y section-x">
        <div className="wrap grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <div>
              <span className="eyebrow text-gold-deep">The Story</span>
              <h2 className="font-display text-ink text-3xl md:text-4xl leading-[1.05] mt-4">
                What this <span className="italic font-light text-maroon">includes</span>
              </h2>
              <p className="text-ink-soft leading-relaxed mt-6 text-lg">{c.longBlurb}</p>

              <h3 className="eyebrow text-gold-deep mt-12 mb-5">Services in this collection</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {c.services.map((s) => (
                  <li
                    key={s}
                    className="bg-white border border-champagne rounded-sm px-5 py-3.5 text-ink-soft text-sm flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Sticky CTA card */}
          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-32 bg-ink rounded-sm p-8 md:p-10 text-ivory">
              <span className="eyebrow text-gold text-[0.6rem]">Ready to begin?</span>
              <h3 className="font-display text-ivory text-3xl md:text-4xl leading-[1.05] mt-3">
                Plan this <span className="italic font-light text-gold-grad">together</span>
              </h3>
              <p className="text-cream/75 text-sm leading-relaxed mt-4">
                Click below and we&apos;ll start the wizard with{" "}
                <span className="text-gold-grad">{c.prefillEvent}</span> already selected — so
                you can skip straight to the details.
              </p>

              <Link
                href={planUrl}
                className="eyebrow mt-7 flex items-center justify-center gap-2 bg-ivory text-ink py-4 rounded-full hover:bg-gold transition-colors duration-300"
              >
                Plan My Event
                <ChevronRight className="w-4 h-4" />
              </Link>

              <a
                href={waLink(
                  `Hello ${BUSINESS.owner}! I'd like to know more about ${c.title} ${c.italic}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow mt-3 flex items-center justify-center gap-2 border border-champagne/40 text-champagne py-4 rounded-full hover:bg-champagne/10 transition-colors"
              >
                <WhatsAppGlyph className="w-4 h-4" />
                Ask on WhatsApp
              </a>

              <div className="h-px bg-champagne/15 my-7" />
              <p className="font-serif italic text-cream/70 text-sm">
                Or browse{" "}
                <Link href="/services" className="text-gold hover:text-champagne underline">
                  all collections
                </Link>{" "}
                to compare.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Other collections */}
      <section className="bg-cream section-y section-x">
        <div className="wrap">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow text-gold-deep">More to explore</span>
              <h2 className="font-display text-ink text-3xl md:text-4xl leading-[1.05] mt-3">
                Other <span className="italic font-light text-maroon">collections</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="eyebrow text-ink border-b-2 border-gold pb-1.5 hover:text-gold-deep transition-colors hidden sm:inline-block"
            >
              View All →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_COLLECTIONS.filter((o) => o.key !== c.key)
              .slice(0, 3)
              .map((o) => (
                <Link
                  key={o.key}
                  href={`/services/${o.key}`}
                  className="group block img-zoom relative aspect-[5/4] rounded-sm overflow-hidden"
                >
                  <Image
                    src={o.image}
                    alt={`${o.title} ${o.italic}`}
                    fill
                    sizes="(max-width:1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 scrim-b" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="font-display italic text-ivory/70 text-sm">{o.number}</span>
                    <h3 className="font-display text-ivory text-2xl mt-1">
                      {o.title} <span className="italic font-light text-champagne">{o.italic}</span>
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
