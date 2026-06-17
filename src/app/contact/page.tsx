import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { BUSINESS, waLink, IMG } from "@/lib/content";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { ContactForm } from "@/components/ContactForm";
import { Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SimBells Weddings & Events, Trichy. Call 99650 57920, WhatsApp J. Simon, or visit us at K.P.R.S Towers, Tennur High Road, Trichy – 620017.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say Hello"
        title="Let's create"
        italic="something beautiful."
        image={IMG.contactHero}
        alt="Joyful wedding ceremony"
        subtitle="Reach Simon directly — by call, WhatsApp, or in person at our Tennur studio."
      />

      <section className="bg-ivory section-y section-x">
        <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Details */}
          <div className="space-y-8">
            <Reveal>
              <div>
                <span className="eyebrow text-gold-deep">Direct Line</span>
                <h2 className="font-display text-ink text-4xl mt-3">We&apos;d love to hear from you</h2>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="flex items-start gap-5 border-b border-champagne/60 pb-7">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h3 className="eyebrow text-stone text-[0.6rem] mb-2">Call Us</h3>
                  {BUSINESS.phones.map((p, i) => (
                    <a key={p} href={BUSINESS.phonesE164[i]} className="block font-display text-ink text-2xl hover:text-gold-deep transition-colors">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-start gap-5 border-b border-champagne/60 pb-7">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
                  <WhatsAppGlyph className="w-5 h-5 text-[#1ea855]" />
                </div>
                <div>
                  <h3 className="eyebrow text-stone text-[0.6rem] mb-2">WhatsApp — Preferred</h3>
                  <p className="text-ink-soft text-sm mb-3">The fastest way to reach Simon. Instant replies, share inspiration freely.</p>
                  <a href={waLink(`Hello ${BUSINESS.owner}! I'd like to enquire about SimBells.`)} target="_blank" rel="noopener noreferrer"
                    className="eyebrow inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full hover:brightness-95 transition-all">
                    <WhatsAppGlyph className="w-4 h-4" /> Chat now
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex items-start gap-5 border-b border-champagne/60 pb-7">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h3 className="eyebrow text-stone text-[0.6rem] mb-2">Visit the Studio</h3>
                  <address className="not-italic text-ink leading-relaxed">
                    {BUSINESS.address.line1}<br />
                    {BUSINESS.address.line2}<br />
                    {BUSINESS.address.city}
                  </address>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h3 className="eyebrow text-stone text-[0.6rem] mb-2">Hours</h3>
                  <p className="text-ink">Monday – Sunday · 9:00 AM – 9:00 PM</p>
                  <div className="flex gap-3 mt-4">
                    <a href={BUSINESS.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                      className="w-10 h-10 rounded-full border border-champagne flex items-center justify-center hover:bg-maroon hover:text-ivory hover:border-maroon transition-all">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a href={BUSINESS.facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                      className="w-10 h-10 rounded-full border border-champagne flex items-center justify-center hover:bg-maroon hover:text-ivory hover:border-maroon transition-all">
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
