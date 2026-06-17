import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { waLink } from "@/lib/content";

export function FindUs() {
  return (
    <section className="bg-cream section-y section-x">
      <div className="wrap">
        <div className="text-center mb-12">
          <Reveal>
            <span className="eyebrow text-gold-deep">Visit the Studio</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-ink text-4xl md:text-5xl leading-[1.05] mt-4">
              Find us in <span className="italic font-light text-maroon">Tennur, Trichy</span>
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
            {/* Map */}
            <div className="rounded-sm overflow-hidden border border-champagne min-h-[360px]">
              <iframe
                title="SimBells Wedding And Events — Google Maps"
                src={BUSINESS.mapsEmbed}
                className="w-full h-full min-h-[360px]"
                style={{ border: 0, filter: "saturate(0.9)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Address card */}
            <div className="bg-white border border-champagne rounded-sm p-7 md:p-9 flex flex-col">
              <div className="w-11 h-11 rounded-full bg-maroon/10 flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5 text-maroon" />
              </div>
              <h3 className="font-display text-ink text-2xl leading-tight">
                SimBells Wedding &amp; Events
              </h3>
              <address className="not-italic text-ink-soft leading-relaxed mt-3 text-[15px]">
                {BUSINESS.address.line1}<br />
                {BUSINESS.address.line2}<br />
                {BUSINESS.address.city}
              </address>

              <div className="h-px bg-champagne my-6" />

              <div className="space-y-2">
                {BUSINESS.phones.map((p, i) => (
                  <a
                    key={p}
                    href={BUSINESS.phonesE164[i]}
                    className="flex items-center gap-3 text-ink hover:text-maroon transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gold-deep" />
                    <span className="font-display text-xl">{p}</span>
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2.5 mt-7">
                <a
                  href={BUSINESS.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow text-center bg-maroon text-ivory py-3.5 rounded-full hover:bg-ink transition-colors"
                >
                  Open in Google Maps
                </a>
                <a
                  href={waLink(`Hello ${BUSINESS.owner}! I'd love to visit your studio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow flex items-center justify-center gap-2 border border-[#25D366] text-[#1ea855] py-3.5 rounded-full hover:bg-[#25D366] hover:text-white transition-all"
                >
                  <WhatsAppGlyph className="w-4 h-4" />
                  Message Simon
                </a>
              </div>

              <p className="text-stone text-xs mt-6 font-serif italic">
                Open Monday – Sunday · 9 AM – 9 PM
              </p>

              <div className="flex-1" />
              <Link
                href="/contact"
                className="eyebrow text-ink-soft hover:text-maroon transition-colors mt-6 inline-block"
              >
                Full contact details →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
