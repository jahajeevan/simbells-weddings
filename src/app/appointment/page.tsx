import type { Metadata } from "next";
import Image from "next/image";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@/lib/content";
import { Clock, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Visit",
  description:
    "Book a free consultation with J. Simon at the SimBells studio in Trichy. Pick your preferred date and time slot — we'll confirm on WhatsApp.",
};

const PERKS = [
  { title: "Free", body: "Your first consultation is on us — no obligation." },
  { title: "30 minutes", body: "A focused conversation about your dream day." },
  { title: "Personal", body: "You meet Simon, not an account manager." },
  { title: "Anywhere", body: "In our Tennur studio, your venue, or a video call." },
];

export default function AppointmentPage() {
  return (
    <>
      {/* Soft hero — image, gold rule, headline, no heavy box */}
      <section className="relative h-[58vh] min-h-[420px] flex items-end overflow-hidden bg-ink">
        <Image
          src="/images/si_kerala_couple.jpg"
          alt="A South Indian couple in white-and-gold attire"
          fill
          priority
          sizes="100vw"
          className="object-cover ken-burns"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(58,42,34,0.45) 0%, rgba(58,42,34,0.05) 30%, rgba(58,42,34,0.65) 100%)",
          }}
        />
        <div className="relative z-10 wrap section-x pb-14 md:pb-20 w-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-gold" />
            <span className="eyebrow text-champagne">Plan Your Visit</span>
          </div>
          <h1 className="font-display text-ivory text-5xl md:text-6xl lg:text-7xl leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
            A quiet moment <span className="italic font-light text-blush">together</span>
          </h1>
          <p className="font-serif italic text-cream/85 text-xl md:text-2xl mt-5 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Pick a date that works. We&apos;ll do the rest.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-ivory section-y section-x">
        <div className="wrap grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Form */}
          <Reveal>
            <AppointmentForm />
          </Reveal>

          {/* Sidebar */}
          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-32 space-y-8">
              {/* Perks */}
              <div className="bg-cream rounded-2xl p-7">
                <span className="eyebrow text-gold-deep">What to Expect</span>
                <ul className="mt-5 space-y-5">
                  {PERKS.map((p) => (
                    <li key={p.title}>
                      <div className="font-display text-ink text-xl">{p.title}</div>
                      <p className="text-ink-soft text-sm mt-1 leading-relaxed">{p.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Studio details */}
              <div className="bg-white border border-champagne rounded-2xl p-7">
                <span className="eyebrow text-gold-deep">The Studio</span>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                    <address className="not-italic text-ink-soft text-sm leading-relaxed">
                      {BUSINESS.address.line1}<br />
                      {BUSINESS.address.line2}<br />
                      {BUSINESS.address.city}
                    </address>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                    <div className="text-sm space-y-1">
                      {BUSINESS.phones.map((p, i) => (
                        <a key={p} href={BUSINESS.phonesE164[i]} className="block text-ink hover:text-maroon transition-colors">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-maroon flex-shrink-0 mt-1" />
                    <p className="text-ink-soft text-sm">Mon – Sun · 9 AM – 9 PM</p>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
