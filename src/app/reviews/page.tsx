import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS, waLink } from "@/lib/content";
import { getTestimonials } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read what hundreds of happy families say about SimBells Weddings & Events — Trichy's most-trusted celebration house since 2016.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2400&q=85";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-gold text-gold" : "text-ink/20"}`}
        />
      ))}
    </div>
  );
}

type ReviewCard = {
  id: string;
  quote: string;
  name: string;
  event: string;
  image: string | null;
  rating: number;
};

export default async function ReviewsPage() {
  const dbTestimonials = await getTestimonials();

  const reviews: ReviewCard[] =
    dbTestimonials.length > 0
      ? dbTestimonials.map((t) => ({
          id: t.id,
          quote: t.quote,
          name: t.couple_name,
          event: t.event_type ?? "",
          image: t.image_url,
          rating: t.rating,
        }))
      : TESTIMONIALS.map((t, i) => ({
          id: String(i),
          quote: t.quote,
          name: t.name,
          event: t.event,
          image: t.image,
          rating: 5,
        }));

  return (
    <>
      <PageHeader
        eyebrow="Happy Families"
        title="Words from"
        italic="our couples."
        image={HERO_IMAGE}
        alt="A joyful wedding celebration"
        subtitle="Over 600 families. Every story is different — the joy is always the same."
      />

      {/* Reviews grid */}
      <section className="bg-ivory section-y section-x">
        <div className="wrap">
          <div className="text-center mb-16">
            <Reveal>
              <span className="eyebrow text-gold-deep">Testimonials</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-ink text-4xl md:text-5xl mt-4">
                Read what families{" "}
                <span className="italic font-light text-maroon">say about us</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink-soft mt-5 max-w-xl mx-auto leading-relaxed">
                Every word below belongs to a real family whose celebration we were
                trusted to hold. We&apos;re grateful for every single one.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 0.07}>
                <article className="bg-cream rounded-sm p-8 h-full flex flex-col">
                  <StarRating rating={r.rating} />

                  {/* Portrait — shown only when an image is available */}
                  {r.image && (
                    <div className="relative mt-6 aspect-[4/3] rounded-sm overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Quote mark */}
                  <div className="font-display italic text-gold text-5xl leading-none mt-6 select-none">
                    &ldquo;
                  </div>

                  <blockquote className="font-serif italic text-ink text-lg leading-snug flex-1">
                    {r.quote}
                  </blockquote>

                  <footer className="mt-6 pt-6 border-t border-champagne/50">
                    <div className="font-display text-maroon text-lg">{r.name}</div>
                    {r.event && (
                      <div className="eyebrow text-stone text-[0.6rem] mt-1">{r.event}</div>
                    )}
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-cream section-y section-x">
        <div className="wrap">
          <Reveal>
            <div className="grid sm:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
              {[
                { stat: "600+", label: "Families served" },
                { stat: "8+", label: "Years in Trichy" },
                { stat: "30+", label: "Services under one roof" },
              ].map((item) => (
                <div key={item.stat}>
                  <div className="font-display italic text-maroon text-5xl">{item.stat}</div>
                  <div className="eyebrow text-stone text-[0.6rem] mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory section-y section-x">
        <div className="wrap text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="eyebrow text-gold-deep">Ready to begin?</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-ink text-4xl md:text-5xl mt-4">
              Let your family be{" "}
              <span className="italic font-light text-maroon">next.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-ink-soft mt-5 leading-relaxed">
              Reach out on WhatsApp or plan your event right here — Simon answers personally.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <a
                href={waLink("Hello! I'd like to plan my event with SimBells.")}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-block bg-maroon text-ivory px-8 py-4 rounded-full hover:bg-ink transition-colors"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/plan"
                className="eyebrow inline-block border border-ink/30 text-ink px-8 py-4 rounded-full hover:bg-ink hover:text-ivory transition-colors"
              >
                Plan My Event
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
