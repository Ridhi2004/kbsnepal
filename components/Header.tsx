"use client";

import { useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "हाम्रो बारेमा", href: "#about" },
  { label: "कार्यसमिति पदाधिकारीहरु", href: "#committee" },
  { label: "भेग प्रतिनिधिहरु", href: "#representatives" },
  { label: "कार्यक्रम", href: "#programs" },
  { label: "सूचना", href: "#notices" },
  { label: "जानकारी", href: "#news" },
  { label: "ग्यालरी", href: "#gallery" },
  { label: "उद्देश्य", href: "#objectives" },
  { label: "आजको बजार मूल्य", href: "#prices" },
  { label: "सुझाब", href: "#suggestions" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-[0_1px_0_rgba(139,26,26,0.12),0_2px_12px_-4px_rgba(0,0,0,0.08)]">
      {/* Thin tri-tone accent bar — nods to the national flag palette */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8B1A1A] via-[#8B1A1A] to-[#002B7F]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / Title Area */}
        <a href="#top" className="group flex shrink-0 items-center gap-3">
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-[#8B1A1A]/15 transition-all duration-200 group-hover:ring-[#8B1A1A]/35">
            <Image
              src="/images/kbslogo.png"
              alt="नेपाल खुद्रा व्यापार संघ लोगो"
              fill
              sizes="68px"
              className="object-cover"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight text-[#8B1A1A] transition-colors group-hover:text-[#a02020] sm:text-xl">
              नेपाल खुद्रा व्यापार संघ
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[#4a4a4a]/70">
              Nepal Retail Traders&apos; Association
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:block">
          <ul className="flex flex-wrap items-center gap-x-5 text-[13.5px] font-medium text-[#3a3a3a]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group/link relative inline-flex items-center py-2 transition-colors duration-200 hover:text-[#8B1A1A]"
                >
                  {link.label}
                  <span className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-[2px] origin-left scale-x-0 rounded-full bg-[#8B1A1A] transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact CTA (desktop) */}
        <a
          href="#contact"
          className="hidden shrink-0 rounded-full bg-[#8B1A1A] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#a02020] hover:shadow-md xl:inline-flex xl:items-center"
        >
          सम्पर्क
        </a>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#8B1A1A]/25 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/5 xl:hidden"
        >
          <span className="sr-only">मेनु खोल्नुहोस्</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        id="mobile-nav"
        className={`overflow-hidden border-t border-[#8B1A1A]/15 bg-white shadow-lg transition-all duration-300 ease-in-out xl:hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-auto max-w-7xl divide-y divide-[#8B1A1A]/10 px-4 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 text-sm font-medium text-[#3a3a3a] transition-colors hover:text-[#8B1A1A]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block py-3.5 text-sm font-semibold text-[#8B1A1A]"
            >
              सम्पर्क →
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}