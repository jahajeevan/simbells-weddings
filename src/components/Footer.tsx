import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, BUSINESS, waLink } from "@/lib/content";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      {/* Top band */}
      <div className="section-x py-16 md:py-20 border-b border-champagne/15">
        <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Image
              src="/logo-cream.png"
              alt="SimBells Weddings & Events"
              width={200}
              height={202}
              className="w-40 h-auto"
            />
            <p className="font-serif italic text-cream/70 text-lg mt-6 max-w-xs leading-snug">
              &ldquo;{BUSINESS.tagline}&rdquo;
            </p>
            <div className="flex gap-3 mt-7">
              <a href={BUSINESS.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href={BUSINESS.facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-all">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={waLink(`Hello ${BUSINESS.owner}!`)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-all">
                <WhatsAppGlyph className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="eyebrow text-gold mb-5">Explore</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/70 hover:text-gold transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/plan" className="text-cream/70 hover:text-gold transition-colors text-sm">
                  Plan My Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="eyebrow text-gold mb-5">Services</h3>
            <ul className="space-y-3">
              {["Wedding Planning", "Decoration", "Photography", "Entertainment", "Live Counters", "Corporate Events"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-cream/70 hover:text-gold transition-colors text-sm">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-gold mb-5">Visit Us</h3>
            <address className="not-italic text-cream/70 text-sm leading-relaxed">
              {BUSINESS.address.line1}<br />
              {BUSINESS.address.line2}<br />
              {BUSINESS.address.city}
            </address>
            <div className="mt-5 space-y-1">
              {BUSINESS.phones.map((p) => (
                <a key={p} href={`tel:+91${p.replace(/\s/g, "")}`} className="block text-cream/70 hover:text-gold transition-colors text-sm">
                  {p}
                </a>
              ))}
            </div>
            <a
              href={waLink(`Hello ${BUSINESS.owner}! I'd like to enquire about SimBells.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center gap-2 mt-6 border border-gold text-gold px-5 py-3 rounded-full hover:bg-gold hover:text-ink transition-all"
            >
              <WhatsAppGlyph className="w-3.5 h-3.5" /> Message Simon
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="section-x py-6">
        <div className="wrap flex flex-col md:flex-row items-center justify-between gap-3 text-stone text-xs">
          <p>© {new Date().getFullYear()} {BUSINESS.fullName}. All rights reserved.</p>
          <p className="font-serif italic text-champagne/60">Crafted with love in {BUSINESS.city}, {BUSINESS.region}</p>
        </div>
      </div>
    </footer>
  );
}
