"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
  const ink = solid ? "text-ink" : "text-ivory";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid ? "bg-ivory/95 backdrop-blur-md border-b border-champagne/40 py-3" : "py-5"
      }`}
    >
      <div className="wrap section-x flex items-center justify-between">
        {/* Left nav (desktop) */}
        <nav className={`hidden lg:flex items-center gap-7 flex-1 ${ink}`}>
          {NAV_LINKS.slice(0, 3).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="eyebrow text-[0.7rem] hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Center logo lockup — wordmark coloured to match the logo */}
        <Link href="/" className="flex items-center gap-3 lg:flex-1 lg:justify-center">
          <Image
            src={solid ? "/logo-crest-color.png" : "/logo-crest-cream.png"}
            alt="SimBells emblem"
            width={64}
            height={73}
            priority
            className="h-12 md:h-16 w-auto transition-all duration-500"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl md:text-[2.1rem] tracking-[0.14em] leading-none flex">
              {"SIMBELLS".split("").map((ch, i) => (
                <span
                  key={i}
                  style={{ color: i % 2 === 0 ? (solid ? "#C8102E" : "#EC6075") : (solid ? "#1B3A8C" : "#93B2F2") }}
                >
                  {ch}
                </span>
              ))}
            </span>
            <span className={`font-serif italic text-[0.72rem] md:text-[0.8rem] tracking-[0.28em] mt-1.5 ${solid ? "text-gold-deep" : "text-champagne"}`}>
              Wedding &amp; Events
            </span>
            <span className={`font-serif italic text-[0.58rem] md:text-[0.64rem] tracking-[0.12em] mt-1 ${solid ? "text-stone" : "text-cream/75"}`}>
              You Dream It, We Make It....
            </span>
          </span>
        </Link>

        {/* Right nav (desktop) */}
        <nav className={`hidden lg:flex items-center gap-7 flex-1 justify-end ${ink}`}>
          {NAV_LINKS.slice(3).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="eyebrow text-[0.7rem] hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/plan"
            className="eyebrow text-[0.7rem] border border-gold text-gold-deep px-5 py-2.5 rounded-full hover:bg-gold hover:text-ink transition-all"
          >
            Plan My Event
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
                className="font-display text-2xl text-ink py-3 border-b border-champagne/30 hover:text-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-6">
              <Link
                href="/plan"
                onClick={() => setOpen(false)}
                className="eyebrow text-center bg-maroon text-ivory py-3.5 rounded-full"
              >
                Plan My Event
              </Link>
              <a
                href={waLink(`Hello ${BUSINESS.owner}! I'd like to enquire about SimBells.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="eyebrow text-center border border-gold text-gold-deep py-3.5 rounded-full"
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
