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
      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={caption}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#5e0f0f]/40 via-transparent to-transparent" />
      </div>
      <figcaption className="p-4 sm:p-5 text-xs sm:text-sm leading-relaxed sm:leading-6 text-gray-700 line-clamp-3">
        {caption}
      </figcaption>
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
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 24;
    const step = cardWidth + gap;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

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
    }, 3000);

    return () => clearInterval(intervalId);
  }, [hasMoreThanThree]);

  return (
    <section id="programs" className="relative bg-white py-16 sm:py-20 border-t border-[#8B1A1A]/10 overflow-hidden">

      <style>{`
        .programs-scroller {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .programs-scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.15] sm:opacity-[0.20]"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.6fr_1fr]">

          {/* Left: Programs */}
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8B1A1A]">
                  झलक
                </span>
                <h2 className="mt-2 sm:mt-3 font-display text-2xl sm:text-3xl font-bold text-gray-900">
                  कार्यक्रम
                </h2>
              </div>

              {hasMoreThanThree && (
                <div className="flex shrink-0 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    aria-label="अघिल्लो कार्यक्रम"
                    onClick={() => scrollByOneCard("left")}
                    className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/10"
                  >
                    <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="अर्को कार्यक्रम"
                    onClick={() => scrollByOneCard("right")}
                    className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/10"
                  >
                    <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              )}
            </div>

            {hasMoreThanThree ? (
              <div
                ref={scrollerRef}
                className="programs-scroller mt-6 sm:mt-8 flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto scroll-smooth"
              >
                {PROGRAMS.map((program) => (
                  <div
                    key={program.caption}
                    data-program-card
                    className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                  >
                    <ProgramCard image={program.image} caption={program.caption} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {PROGRAMS.map((program) => (
                  <ProgramCard key={program.caption} image={program.image} caption={program.caption} />
                ))}
              </div>
            )}
          </div>

          {/* Right: Notices */}
          <div id="notices" className="mt-2 lg:mt-0">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8B1A1A]">
              जरुरी
            </span>
            <h2 className="mt-2 sm:mt-3 font-display text-2xl sm:text-3xl font-bold text-gray-900">
              सूचना
            </h2>
            <ul className="mt-6 sm:mt-8 divide-y divide-[#8B1A1A]/10 overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md">
              {NOTICES.map((notice) => (
                <li key={notice}>
                  <a href="notices" className="flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm leading-relaxed sm:leading-6 text-gray-700 transition-all hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] group">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B1A1A]" />
                    <span className="group-hover:underline decoration-[#8B1A1A]/30 underline-offset-4 line-clamp-2 sm:line-clamp-3">
                      {notice}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}