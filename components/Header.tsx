"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "हाम्रो बारेमा", href: "about" },
  { label: "कार्यसमिति पदाधिकारीहरु", href: "committee" },
  { label: "भेग प्रतिनिधिहरु", href: "representatives" },
  { label: "कार्यक्रम", href: "programs" },
  { label: "सूचना", href: "notices" },
  { label: "जानकारी", href: "information" },
  { label: "ग्यालरी", href: "gallery" },
  { label: "उद्देश्य", href: "objectives" },
  { label: "आजको बजार मूल्य", href: "prices" },
  { label: "सुझाब", href: "suggestions" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(`#${current}`);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]" 
        : "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-[0_1px_0_rgba(139,26,26,0.12),0_2px_12px_-4px_rgba(0,0,0,0.08)]"
    }`}>
      {/* Thin tri-tone accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8B1A1A] via-[#8B1A1A] to-[#002B7F]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 xl:px-8">
        {/* Logo / Title Area */}
        <a href="#top" className="group flex shrink-0 items-center gap-2 sm:gap-3 min-w-0">
          <span className="relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-[#8B1A1A]/15 transition-all duration-200 group-hover:ring-[#8B1A1A]/35">
            <Image
              src="/images/kbslogo.png"
              alt="नेपाल खुद्रा व्यापार संघ लोगो"
              fill
              sizes="(max-width: 640px) 40px, 48px"
              className="object-cover"
              priority
            />
          </span>
          <span className="leading-tight truncate">
            <span className="block font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-[#8B1A1A] transition-colors group-hover:text-[#a02020]">
              नेपाल खुद्रा व्यापार संघ
            </span>
            <span className="hidden sm:block text-[8px] xs:text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.18em] text-[#4a4a4a]/70 truncate">
              Nepal Retail Traders&apos; Association
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:block flex-1">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 2xl:gap-x-5 text-xs lg:text-[13px] font-medium text-[#3a3a3a]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`group/link relative inline-flex items-center py-2 transition-colors duration-200 hover:text-[#8B1A1A] ${
                    activeSection === link.href ? "text-[#8B1A1A]" : ""
                  }`}
                >
                  {link.label}
                  <span className={`pointer-events-none absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-[#8B1A1A] transition-transform duration-300 ease-out ${
                    activeSection === link.href ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100"
                  }`} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact CTA (desktop) */}
        <a
          href="contact"
          className="hidden lg:inline-flex shrink-0 items-center rounded-full bg-[#8B1A1A] px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#a02020] hover:shadow-md hover:scale-105 active:scale-95"
        >
          सम्पर्क
        </a>

        {/* Mobile Hamburger Button - visible on tablet and below */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "मेनु बन्द गर्नुहोस्" : "मेनु खोल्नुहोस्"}
          className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-[#8B1A1A]/25 text-[#8B1A1A] transition-all duration-200 hover:bg-[#8B1A1A]/5 hover:scale-105 active:scale-95 xl:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu - Full screen overlay on small devices */}
      <div
        id="mobile-nav"
        className={`xl:hidden fixed inset-x-0 top-[calc(3.5rem+3px)] sm:top-[calc(4.25rem+3px)] bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-y-auto ${
          open ? "max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4.25rem)] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ 
          maxHeight: open ? "calc(100vh - 56px)" : "0",
          top: "56px"
        }}
      >
        <nav className="mx-auto max-w-7xl px-3 py-2 sm:px-4 sm:py-3">
          <ul className="divide-y divide-[#8B1A1A]/10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 sm:py-3.5 text-sm sm:text-base font-medium text-[#3a3a3a] transition-all duration-200 hover:text-[#8B1A1A] hover:pl-2 ${
                    activeSection === link.href ? "text-[#8B1A1A] font-semibold" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#8B1A1A] px-4 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#a02020] hover:shadow-md active:scale-95"
              >
                सम्पर्क गर्नुहोस्
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile menu - click to close */}
      {open && (
        <div 
          className="xl:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          style={{ top: "56px" }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}