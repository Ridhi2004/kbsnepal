"use client";

import Image from "next/image"; // <-- FIX: Added missing import

const COLUMN_ONE = [
  { label: "हाम्रो बारेमा", href: "#about" },
  { label: "कार्यसमिति पदाधिकारीहरु", href: "#committee" },
  { label: "भेग प्रतिनिधिहरु", href: "#representatives" },
  { label: "कार्यक्रम", href: "#programs" },
];

const COLUMN_TWO = [
  { label: "जानकारी", href: "#news" },
  { label: "ग्यालरी", href: "#gallery" },
  { label: "उद्देश्य", href: "#objectives" },
  { label: "आजको बजार मूल्य", href: "#prices" },
];

const SOCIALS = [
  { label: "Facebook", href: "#", path: "M13 22v-8h3l1-4h-4V7.5C13 6.4 13.4 6 14.6 6H17V2.2C16.6 2.1 15.3 2 13.9 2 10.9 2 9 3.8 9 7v3H6v4h3v8h4Z" },
  { label: "Twitter", href: "#", path: "M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.2 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.7 3.3 4a4.2 4.2 0 0 1-1.8.1c.5 1.7 2.1 2.9 4 3A8.3 8.3 0 0 1 2 18.6 11.6 11.6 0 0 0 8.3 20.5c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.4Z" },
  { label: "Instagram", href: "#", path: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5-.7.2-1.2.6-1.8 1.1-.5.6-.9 1.1-1.1 1.8-.3.6-.5 1.3-.5 2.4C2 8.9 2 9.3 2 12s0 3.1.1 4.1c0 1.1.2 1.8.5 2.4.2.7.6 1.2 1.1 1.8.6.5 1.1.9 1.8 1.1.6.3 1.3.5 2.4.5C8.9 22 9.3 22 12 22s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5.7-.2 1.2-.6 1.8-1.1.5-.6.9-1.1 1.1-1.8.3-.6.5-1.3.5-2.4.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.4a4.8 4.8 0 0 0-1.1-1.8 4.8 4.8 0 0 0-1.8-1.1c-.6-.3-1.3-.5-2.4-.5C15.1 2 14.7 2 12 2Z" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-white border-t border-[#8B1A1A]/10 overflow-hidden">
      
      {/* --- ADDED: SOLID RED TOP BORDER --- */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[#8B1A1A]" />
      
      {/* Subtle Red Background Glows (Matches all other sections) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr] lg:px-8">
        
        {/* Brand Column */}
        <div>
          {/* FIX: Added wrapping <a> tag + group class for hover effect */}
          <a href="#top" className="group flex items-center gap-3">
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
            <span className="font-display text-lg font-bold text-[#8B1A1A] transition-colors group-hover:text-[#a02020]">
              नेपाल खुद्रा व्यापार संघ
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
            खुद्रा व्यापारीको हक हित रक्षा र उपभोक्तासम्म सुलभ सेवा — २०३६ साल देखि।
          </p>
        </div>

        {/* Column 1 */}
        <nav>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1A1A]">
            संस्था
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            {COLUMN_ONE.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-[#8B1A1A]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 2 */}
        <nav>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1A1A]">
            जानकारी
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            {COLUMN_TWO.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-[#8B1A1A]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Column */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1A1A]">
            सम्पर्क
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>टेकु, पचली, काठमाडौं, नेपाल</li>
            <li>
              <a href="tel:01-2345678" className="transition-colors hover:text-[#8B1A1A]">
                01-2345678 / 01-2345678
              </a>
            </li>
            <li>
              <a href="mailto:info@kbsnepal.org" className="transition-colors hover:text-[#8B1A1A]">
                info@kbsnepal.org
              </a>
            </li>
          </ul>
          
          {/* Social Icons */}
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-all hover:bg-[#8B1A1A] hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative z-10 border-t border-[#8B1A1A]/10 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} नेपाल खुद्रा व्यापार संघ (KBS Nepal). सर्वाधिकार सुरक्षित।
      </div>
    </footer>
  );
}