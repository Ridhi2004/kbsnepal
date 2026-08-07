"use client";

import { useEffect, useRef, useState } from "react";

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
    <figure className="overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
      <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "65%" }}>
        <img
          src={image}
          alt={caption}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#5e0f0f]/40 via-transparent to-transparent" />
      </div>
      <figcaption className="p-3 sm:p-4 md:p-5 text-xs sm:text-sm leading-relaxed text-gray-700 flex-1">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function Programs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalPrograms = PROGRAMS.length;
  const hasMoreThanThree = totalPrograms > 3;

  // For mobile: show one card at a time with dots
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPrograms);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPrograms) % totalPrograms);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play for mobile
  useEffect(() => {
    if (!isMobile || !hasMoreThanThree) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile, hasMoreThanThree]);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Desktop scroll
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

  // Desktop auto-scroll
  useEffect(() => {
    if (isMobile || !hasMoreThanThree) return;

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
    }, 4000);

    return () => clearInterval(intervalId);
  }, [isMobile, hasMoreThanThree]);

  // Get current program for mobile
  const currentProgram = PROGRAMS[currentIndex];

  return (
    <section id="programs" className="relative bg-white py-12 sm:py-16 md:py-20 border-t border-[#8B1A1A]/10 overflow-hidden">

      <style>{`
        .programs-scroller {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .programs-scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Background elements */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.12] sm:opacity-[0.15] md:opacity-[0.20]"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.6fr_1fr]">

          {/* Left: Programs */}
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8B1A1A]">
                  झलक
                </span>
                <h2 className="mt-1 sm:mt-2 md:mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  कार्यक्रम
                </h2>
              </div>

              {!isMobile && hasMoreThanThree && (
                <div className="flex shrink-0 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    aria-label="अघिल्लो कार्यक्रम"
                    onClick={() => scrollByOneCard("left")}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/10"
                  >
                    <ChevronLeftIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="अर्को कार्यक्रम"
                    onClick={() => scrollByOneCard("right")}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/10"
                  >
                    <ChevronRightIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile: Single card with dots */}
            {isMobile && hasMoreThanThree ? (
              <div 
                className="mt-4 sm:mt-6"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative">
                  <ProgramCard 
                    image={currentProgram.image} 
                    caption={currentProgram.caption} 
                  />
                  
                  {/* Navigation arrows for mobile */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-[#8B1A1A]/10 hover:bg-white"
                    aria-label="Previous"
                  >
                    <ChevronLeftIcon className="h-4 w-4 text-[#8B1A1A]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-[#8B1A1A]/10 hover:bg-white"
                    aria-label="Next"
                  >
                    <ChevronRightIcon className="h-4 w-4 text-[#8B1A1A]" />
                  </button>
                </div>
                
                {/* Dots indicator */}
                <div className="flex justify-center gap-1.5 mt-4 sm:mt-5">
                  {PROGRAMS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'w-6 bg-[#8B1A1A]' 
                          : 'w-1.5 bg-[#8B1A1A]/30 hover:bg-[#8B1A1A]/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop/Tablet: Horizontal scroll */
              <div
                ref={scrollerRef}
                className="programs-scroller mt-4 sm:mt-6 md:mt-8 flex snap-x snap-mandatory gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth"
              >
                {PROGRAMS.map((program) => (
                  <div
                    key={program.caption}
                    data-program-card
                    className="w-[80%] sm:w-[calc(50%-0.625rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] shrink-0 snap-start"
                  >
                    <ProgramCard image={program.image} caption={program.caption} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Notices */}
          <div id="notices" className="mt-2 lg:mt-0">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8B1A1A]">
              जरुरी
            </span>
            <h2 className="mt-1 sm:mt-2 md:mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              सूचना
            </h2>
            
            <div className="mt-4 sm:mt-6 md:mt-8 divide-y divide-[#8B1A1A]/10 overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md">
              {NOTICES.map((notice, index) => (
                <a 
                  key={notice}
                  href="notices" 
                  className={`flex items-start gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm leading-relaxed text-gray-700 transition-all hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] group ${
                    index === 0 ? '' : ''
                  }`}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 min-w-[6px] rounded-full bg-[#8B1A1A]" />
                  <span className="group-hover:underline decoration-[#8B1A1A]/30 underline-offset-4 line-clamp-2 sm:line-clamp-3">
                    {notice}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}