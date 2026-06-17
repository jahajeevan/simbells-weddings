"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, BUSINESS, waLink } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Solid when scrolled, or when not on a page with a dark hero
  const solid = scrolled || !onHome;
  const ink = solid ? "text-ink" : "text-cream-luxe";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid ? "bg-ivory/95 backdrop-blur-md border-b border-champagne/40 py-3" : "py-4"
      }`}
    >
      <div className="wrap section-x flex items-center justify-between gap-6">
        {/* LEFT — logo lockup */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src={solid ? "/logo-crest-color.png" : "/logo-crest-cream.png"}
            alt="SimBells emblem"
            width={64}
            height={73}
            priority
            className="h-11 md:h-14 w-auto transition-all duration-500"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl tracking-[0.14em] leading-none flex">
              {"SIMBELLS".split("").map((ch, i) => {
                let color = solid ? "#2B2118" : "#FBF7EF";
                if (ch === "S" && i === 0) color = solid ? "#C8102E" : "#F08596";
                else if (ch === "B") color = solid ? "#1B3A8C" : "#93B2F2";
                return <span key={i} style={{ color }}>{ch}</span>;
              })}
            </span>
            <span className={`font-serif italic text-[0.6rem] md:text-[0.7rem] tracking-[0.28em] mt-1 ${solid ? "text-rose-gold-deep" : "text-champagne"}`}>
              Wedding &amp; Events
            </span>
          </span>
        </Link>

        {/* RIGHT — nav links + phone + CTA (desktop) */}
        <nav className={`hidden lg:flex items-center gap-6 xl:gap-8 ${ink}`}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`eyebrow text-[0.7rem] tracking-[0.28em] hover:text-rose-gold-deep transition-colors ${
                pathname === l.href ? "text-rose-gold-deep" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Phone */}
          <a
            href={`tel:${BUSINESS.phonesE164[0]}`}
            className={`hidden xl:flex items-center gap-2 eyebrow text-[0.7rem] tracking-[0.2em] hover:text-rose-gold-deep transition-colors ${ink}`}
          >
            <Phone className="w-3.5 h-3.5 text-rose-gold-deep" />
            +91 {BUSINESS.phones[0]}
          </a>

          {/* Book Now CTA */}
          <Link
            href="/plan"
            className="eyebrow btn-rose px-6 py-3 rounded-full text-[0.65rem] tracking-[0.3em] whitespace-nowrap"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden ${ink} ml-auto`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-ivory border-t border-champagne/40 mt-3">
          <nav className="section-x py-6 flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-ink py-3 border-b border-champagne/30 hover:text-rose-gold-deep transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-6">
              <Link
                href="/plan"
                onClick={() => setOpen(false)}
                className="eyebrow text-center btn-rose py-3.5 rounded-full text-[0.7rem] tracking-[0.3em]"
              >
                Book Now
              </Link>
              <a
                href={waLink(`Hello ${BUSINESS.owner}! I'd like to enquire about SimBells.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="eyebrow text-center border border-rose-gold text-rose-gold-deep py-3.5 rounded-full text-[0.7rem] tracking-[0.3em]"
              >
                WhatsApp Simon
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
