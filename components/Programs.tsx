
"use client";

import { useEffect, useRef } from "react";

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

const PROGRAMS = [
  {
    caption: "उपभोक्ता को हितमा खाद्यान्नका खुद्रा ब्यापारीबारे भएको अन्तर्क्रिया कार्यक्रम",
    image: "/images/decrease.jpg",
  },
  {
    caption: "ब्यापारीबारे भएको अन्तर्क्रिया कार्यक्रम",
    image: "/images/hero.jpg",
  },
  {
    caption: "वार्षिक साधारण सभा तथा सगुन कार्यक्रम",
    image: "/images/increase.jpg",
  },
  {
    caption: "उपभोक्ता अधिकार सम्बन्धी जनचेतनामूलक कार्यक्रम",
    image: "/images/decrease.jpg",
  },
  {
    caption: "खुद्रा व्यापारी क्षमता अभिवृद्धि तालिम कार्यक्रम",
    image: "/images/hero.jpg",
  },
  {
    caption: "नयाँ कार्यकारिणी समिति गठन तथा शपथ ग्रहण कार्यक्रम",
    image: "/images/increase.jpg",
  },
];

const NOTICES = [
  "उपभोक्ता संरक्षण मस्यौदा विधेयक २०७३ बारे वृहत अन्तर्क्रिया कार्यक्रमको सूचना",
  "श्रद्धाञ्जली अर्पण",
  "नेपाल खुद्रा व्यापार संघको सूचना।",
  "नापतौलका सामाग्रीहरुको अनुमति पत्र दर्ता नविकरण सम्बन्धि जरुरी सूचना",
];

function ProgramCard({ image, caption }: { image: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Program image instead of the numbered placeholder */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={caption}
          className="h-full w-full object-cover"
        />
        {/* subtle brand-tinted overlay so images stay consistent with the site's palette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#5e0f0f]/40 via-transparent to-transparent" />
      </div>
      <figcaption className="p-5 text-sm leading-6 text-gray-700">{caption}</figcaption>
    </figure>
  );
}

export default function Programs() {
  const hasMoreThanThree = PROGRAMS.length > 3;
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByOneCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-program-card]");
    if (!firstCard) return;
    // measure a single card's width (including its own horizontal margin/gap)
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 24; // matches gap-6 below
    const step = cardWidth + gap;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  // Auto-advance one card every second when there are more than 3 programs
  useEffect(() => {
    if (!hasMoreThanThree) return;

    const intervalId = setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;

      const firstCard = el.querySelector<HTMLElement>("[data-program-card]");
      if (!firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = 24;
      const step = cardWidth + gap;

      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - step / 2;

      if (isAtEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasMoreThanThree]);

  return (
    <section id="programs" className="relative bg-white py-20 border-t border-[#8B1A1A]/10 overflow-hidden">

      {/* Hide scrollbar for the horizontal program scroller, without relying on Tailwind arbitrary properties */}
      <style>{`
        .programs-scroller {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .programs-scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Section background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.24]"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />

      {/* Subtle Red Background Glows (to match Hero, About, and News) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">

        {/* Left: Programs */}
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
                झलक
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
                कार्यक्रम
              </h2>
            </div>

            {hasMoreThanThree && (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="अघिल्लो कार्यक्रम"
                  onClick={() => scrollByOneCard("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/10"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="अर्को कार्यक्रम"
                  onClick={() => scrollByOneCard("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/10"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {hasMoreThanThree ? (
            /* More than 3 programs: horizontal scroll, one program at a time, snapping */
            <div
              ref={scrollerRef}
              className="programs-scroller mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
            >
              {PROGRAMS.map((program) => (
                <div
                  key={program.caption}
                  data-program-card
                  className="w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <ProgramCard image={program.image} caption={program.caption} />
                </div>
              ))}
            </div>
          ) : (
            /* 3 or fewer programs: original static grid, unchanged */
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROGRAMS.map((program) => (
                <ProgramCard key={program.caption} image={program.image} caption={program.caption} />
              ))}
            </div>
          )}
        </div>

        {/* Right: Notices */}
        <div id="notices">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
            जरुरी
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-gray-900">
            सूचना
          </h2>
          <ul className="mt-8 divide-y divide-[#8B1A1A]/10 overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md">
            {NOTICES.map((notice) => (
              <li key={notice}>
                <a href="notices" className="flex items-start gap-3 px-5 py-4 text-sm leading-6 text-gray-700 transition-all hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] group">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B1A1A]" />
                  <span className="group-hover:underline decoration-[#8B1A1A]/30 underline-offset-4">
                    {notice}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}