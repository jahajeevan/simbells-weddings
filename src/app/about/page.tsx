import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { BUSINESS, WHY_US, waLink, IMG } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet J. Simon and SimBells Weddings & Events — Trichy's trusted wedding house since 2016, crafting unforgettable celebrations with over thirty services under one roof.",
};

const milestones = [
  { year: "2016", title: "The first mandap", body: "SimBells opens its doors in Trichy as a boutique décor studio with one obsession — beauty in every detail." },
  { year: "2019", title: "A full house", body: "Photography, makeup, entertainment and catering join the family. One team, every service." },
  { year: "2022", title: "On film", body: "Our cinematic film and drone team launch — turning weddings into stories worth re-watching." },
  { year: "Today", title: "The name families trust", body: "Hundreds of celebrations later, SimBells is the planner Trichy recommends to its own." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="A house built on"
        italic="celebration."
        image={IMG.aboutHero}
        alt="A couple at golden hour"
        subtitle="You Dream It. We Make It."
      />

      {/* Founder spread */}
      <section className="bg-ivory section-y section-x">
        <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="relative order-2 lg:order-1">
            <div className="img-zoom relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image src={IMG.storyMain} alt="Ornate Indian wedding mandap by SimBells" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-maroon text-ivory px-7 py-5 rounded-sm">
              <div className="font-display italic text-2xl">{BUSINESS.owner}</div>
              <div className="eyebrow text-champagne text-[0.55rem] mt-1">Founder &amp; Creative Lead</div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Image
                src="/logo-color.png"
                alt="SimBells Weddings & Events logo"
                width={150}
                height={152}
                className="w-28 h-auto mb-7"
              />
            </Reveal>
            <Reveal>
              <span className="eyebrow text-gold-deep">The People Behind It</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-ink text-4xl md:text-5xl leading-[1.03] mt-5">
                Every wedding,
                <br />
                <span className="italic font-light text-maroon">a personal promise.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-ink-soft leading-relaxed max-w-xl">
                <p>
                  Since {BUSINESS.establishedYear}, {BUSINESS.owner} has led SimBells with a
                  simple rule — treat every family&apos;s celebration as if it were his own.
                  That care shows in the mandaps we build, the films we shoot, and the
                  way elders&apos; wishes are honoured without a second thought.
                </p>
                <p>
                  From the heart of Tennur in Trichy, our team brings together more than
                  thirty services so you never have to coordinate a dozen vendors. You dream
                  it — we make every piece of it happen, beautifully.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={waLink(`Hello ${BUSINESS.owner}! I'd love to talk about my event.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-block mt-9 bg-maroon text-ivory px-8 py-4 rounded-full hover:bg-ink transition-colors"
              >
                Talk to Simon
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream section-y section-x">
        <div className="wrap">
          <div className="text-center mb-16">
            <Reveal><span className="eyebrow text-gold-deep">The Journey</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-ink text-4xl md:text-5xl mt-4">
                Eight years <span className="italic font-light text-maroon">in the making</span>
              </h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-champagne/40 rounded-sm overflow-hidden">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={(i % 4) * 0.08}>
                <div className="bg-ivory p-8 h-full">
                  <span className="font-display italic text-gold-deep text-4xl">{m.year}</span>
                  <h3 className="font-display text-ink text-xl mt-4">{m.title}</h3>
                  <p className="text-ink-soft text-sm leading-relaxed mt-2">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory section-y section-x">
        <div className="wrap">
          <div className="text-center mb-16">
            <Reveal><span className="eyebrow text-gold-deep">Our Promise</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-ink text-4xl md:text-5xl mt-4">
                Why families <span className="italic font-light text-maroon">choose us</span>
              </h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 0.08}>
                <div className="border-l-2 border-gold pl-6 py-2">
                  <h3 className="font-display text-ink text-2xl">{w.title}</h3>
                  <p className="text-ink-soft text-sm leading-relaxed mt-3">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/plan" className="eyebrow inline-block bg-ink text-ivory px-10 py-4 rounded-full hover:bg-maroon transition-colors">
              Plan My Event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
