// "use client";

// import { useEffect, useRef, useState } from "react";

// function ChevronLeftIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <path d="M15 18l-6-6 6-6" />
//     </svg>
//   );
// }

// function ChevronRightIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <path d="M9 18l6-6-6-6" />
//     </svg>
//   );
// }

// const PROGRAMS = [
//   {
//     caption: "उपभोक्ता को हितमा खाद्यान्नका खुद्रा ब्यापारीबारे भएको अन्तर्क्रिया कार्यक्रम",
//     image: "/images/decrease.jpg",
//   },
//   {
//     caption: "ब्यापारीबारे भएको अन्तर्क्रिया कार्यक्रम",
//     image: "/images/hero.jpg",
//   },
//   {
//     caption: "वार्षिक साधारण सभा तथा सगुन कार्यक्रम",
//     image: "/images/increase.jpg",
//   },
//   {
//     caption: "उपभोक्ता अधिकार सम्बन्धी जनचेतनामूलक कार्यक्रम",
//     image: "/images/decrease.jpg",
//   },
//   {
//     caption: "खुद्रा व्यापारी क्षमता अभिवृद्धि तालिम कार्यक्रम",
//     image: "/images/hero.jpg",
//   },
//   {
//     caption: "नयाँ कार्यकारिणी समिति गठन तथा शपथ ग्रहण कार्यक्रम",
//     image: "/images/increase.jpg",
//   },
// ];

// const NOTICES = [
//   "उपभोक्ता संरक्षण मस्यौदा विधेयक २०७३ बारे वृहत अन्तर्क्रिया कार्यक्रमको सूचना",
//   "श्रद्धाञ्जली अर्पण",
//   "नेपाल खुद्रा व्यापार संघको सूचना।",
//   "नापतौलका सामाग्रीहरुको अनुमति पत्र दर्ता नविकरण सम्बन्धि जरुरी सूचना",
// ];

// function ProgramCard({ image, caption }: { image: string; caption: string }) {
//   return (
//     <figure className="overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
//       <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "65%" }}>
//         <img
//           src={image}
//           alt={caption}
//           className="absolute inset-0 h-full w-full object-cover"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#5e0f0f]/40 via-transparent to-transparent" />
//       </div>
//       <figcaption className="p-3 sm:p-4 md:p-5 text-xs sm:text-sm leading-relaxed text-gray-700 flex-1">
//         {caption}
//       </figcaption>
//     </figure>
//   );
// }

// export default function Programs() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const scrollerRef = useRef<HTMLDivElement>(null);
//   const touchStartX = useRef<number>(0);
//   const touchEndX = useRef<number>(0);

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const totalPrograms = PROGRAMS.length;
//   const hasMoreThanThree = totalPrograms > 3;

//   // For mobile: show one card at a time with dots
//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % totalPrograms);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + totalPrograms) % totalPrograms);
//   };

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   // Auto-play for mobile
//   useEffect(() => {
//     if (!isMobile || !hasMoreThanThree) return;
    
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 4000);
    
//     return () => clearInterval(interval);
//   }, [isMobile, hasMoreThanThree]);

//   // Touch handlers for mobile
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     touchEndX.current = e.changedTouches[0].clientX;
//     const diff = touchStartX.current - touchEndX.current;
//     if (Math.abs(diff) > 50) {
//       if (diff > 0) {
//         nextSlide();
//       } else {
//         prevSlide();
//       }
//     }
//   };

//   // Desktop scroll
//   const scrollByOneCard = (direction: "left" | "right") => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     const firstCard = el.querySelector<HTMLElement>("[data-program-card]");
//     if (!firstCard) return;
//     const cardWidth = firstCard.getBoundingClientRect().width;
//     const gap = 24;
//     const step = cardWidth + gap;
//     el.scrollBy({
//       left: direction === "left" ? -step : step,
//       behavior: "smooth",
//     });
//   };

//   // Desktop auto-scroll
//   useEffect(() => {
//     if (isMobile || !hasMoreThanThree) return;

//     const intervalId = setInterval(() => {
//       const el = scrollerRef.current;
//       if (!el) return;

//       const firstCard = el.querySelector<HTMLElement>("[data-program-card]");
//       if (!firstCard) return;

//       const cardWidth = firstCard.getBoundingClientRect().width;
//       const gap = 24;
//       const step = cardWidth + gap;

//       const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - step / 2;

//       if (isAtEnd) {
//         el.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         el.scrollBy({ left: step, behavior: "smooth" });
//       }
//     }, 4000);

//     return () => clearInterval(intervalId);
//   }, [isMobile, hasMoreThanThree]);

//   // Get current program for mobile
//   const currentProgram = PROGRAMS[currentIndex];

//   return (
//     <section id="programs" className="relative bg-white py-12 sm:py-16 md:py-20 border-t border-[#8B1A1A]/10 overflow-hidden">

//       <style>{`
//         .programs-scroller {
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }
//         .programs-scroller::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//       {/* Background elements */}
//       <div
//         className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.12] sm:opacity-[0.15] md:opacity-[0.20]"
//         style={{ backgroundImage: "url('/images/bg.jpg')" }}
//       />

//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="absolute -top-24 -left-24 h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
//         <div className="absolute -bottom-24 -right-24 h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.6fr_1fr]">

//           {/* Left: Programs */}
//           <div>
//             <div className="flex items-end justify-between gap-4">
//               <div>
//                 <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8B1A1A]">
//                   झलक
//                 </span>
//                 <h2 className="mt-1 sm:mt-2 md:mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//                   कार्यक्रम
//                 </h2>
//               </div>

//               {!isMobile && hasMoreThanThree && (
//                 <div className="flex shrink-0 gap-1.5 sm:gap-2">
//                   <button
//                     type="button"
//                     aria-label="अघिल्लो कार्यक्रम"
//                     onClick={() => scrollByOneCard("left")}
//                     className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/10"
//                   >
//                     <ChevronLeftIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
//                   </button>
//                   <button
//                     type="button"
//                     aria-label="अर्को कार्यक्रम"
//                     onClick={() => scrollByOneCard("right")}
//                     className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A]/10"
//                   >
//                     <ChevronRightIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile: Single card with dots */}
//             {isMobile && hasMoreThanThree ? (
//               <div 
//                 className="mt-4 sm:mt-6"
//                 onTouchStart={handleTouchStart}
//                 onTouchEnd={handleTouchEnd}
//               >
//                 <div className="relative">
//                   <ProgramCard 
//                     image={currentProgram.image} 
//                     caption={currentProgram.caption} 
//                   />
                  
//                   {/* Navigation arrows for mobile */}
//                   <button
//                     onClick={prevSlide}
//                     className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-[#8B1A1A]/10 hover:bg-white"
//                     aria-label="Previous"
//                   >
//                     <ChevronLeftIcon className="h-4 w-4 text-[#8B1A1A]" />
//                   </button>
//                   <button
//                     onClick={nextSlide}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-[#8B1A1A]/10 hover:bg-white"
//                     aria-label="Next"
//                   >
//                     <ChevronRightIcon className="h-4 w-4 text-[#8B1A1A]" />
//                   </button>
//                 </div>
                
//                 {/* Dots indicator */}
//                 <div className="flex justify-center gap-1.5 mt-4 sm:mt-5">
//                   {PROGRAMS.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => goToSlide(index)}
//                       className={`h-1.5 rounded-full transition-all ${
//                         index === currentIndex 
//                           ? 'w-6 bg-[#8B1A1A]' 
//                           : 'w-1.5 bg-[#8B1A1A]/30 hover:bg-[#8B1A1A]/50'
//                       }`}
//                       aria-label={`Go to slide ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               /* Desktop/Tablet: Horizontal scroll */
//               <div
//                 ref={scrollerRef}
//                 className="programs-scroller mt-4 sm:mt-6 md:mt-8 flex snap-x snap-mandatory gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth"
//               >
//                 {PROGRAMS.map((program) => (
//                   <div
//                     key={program.caption}
//                     data-program-card
//                     className="w-[80%] sm:w-[calc(50%-0.625rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] shrink-0 snap-start"
//                   >
//                     <ProgramCard image={program.image} caption={program.caption} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Right: Notices */}
//           <div id="notices" className="mt-2 lg:mt-0">
//             <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8B1A1A]">
//               जरुरी
//             </span>
//             <h2 className="mt-1 sm:mt-2 md:mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               सूचना
//             </h2>
            
//             <div className="mt-4 sm:mt-6 md:mt-8 divide-y divide-[#8B1A1A]/10 overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md">
//               {NOTICES.map((notice, index) => (
//                 <a 
//                   key={notice}
//                   href="notices" 
//                   className={`flex items-start gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm leading-relaxed text-gray-700 transition-all hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] group ${
//                     index === 0 ? '' : ''
//                   }`}
//                 >
//                   <span className="mt-1.5 h-1.5 w-1.5 min-w-[6px] rounded-full bg-[#8B1A1A]" />
//                   <span className="group-hover:underline decoration-[#8B1A1A]/30 underline-offset-4 line-clamp-2 sm:line-clamp-3">
//                     {notice}
//                   </span>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// --- TYPES ---
type Program = {
  id: number;
  image: string;
  title: string;
  description: string;
};

type Notice = {
  id: number;
  title: string;
  date: string;
  full_content: string;
  slug: string;
  summary: string;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  published_date: string;
  created_at: string;
  updated_at: string;
  preview_content: string;
  word_count: string;
  read_time: string;
};

// --- ICONS ---
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

// --- PROGRAM POPUP ---
function ProgramPopup({ 
  program, 
  onClose 
}: { 
  program: Program | null, 
  onClose: () => void 
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!program) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white transition-colors"
          aria-label="बन्द गर्नुहोस्"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6 bg-gray-100">
          <Image
            src={program.image || "/images/placeholder.jpg"}
            alt={program.title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/placeholder.jpg";
            }}
          />
        </div>

        <h3 className="text-xl font-bold text-[#8B1A1A] leading-tight mb-4">
          {program.title}
        </h3>

        <div className="prose prose-sm prose-gray max-w-none text-gray-700">
          <p>{program.description}</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
          >
            बन्द गर्नुहोस्
          </button>
         
        </div>
      </div>
    </div>
  );
}

// --- NOTICE POPUP ---
function NoticePopup({ 
  notice, 
  onClose 
}: { 
  notice: Notice | null, 
  onClose: () => void 
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!notice) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white transition-colors"
          aria-label="बन्द गर्नुहोस्"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pr-8 mb-4">
          <h3 className="text-xl font-bold text-[#8B1A1A] leading-tight">
            {notice.title}
          </h3>
          {notice.published_date && (
            <p className="text-xs text-gray-400 mt-1">
              प्रकाशित: {new Date(notice.published_date).toLocaleDateString('ne-NP')}
            </p>
          )}
        
        </div>

        <div 
          className="prose prose-sm prose-gray max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ 
            __html: notice.full_content || notice.preview_content || `<p>${notice.summary}</p>`
          }}
        />

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
          >
            बन्द गर्नुहोस्
          </button>
         
        </div>
      </div>
    </div>
  );
}

// --- PROGRAM CARD ---
function ProgramCard({ image, title, description, onClick }: { 
  image: string; 
  title: string; 
  description: string;
  onClick: () => void;
}) {
  return (
    <figure 
      onClick={onClick}
      className="overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg h-full flex flex-col cursor-pointer"
    >
      <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "65%" }}>
        <img
          src={image || "/images/placeholder.jpg"}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#5e0f0f]/40 via-transparent to-transparent" />
      </div>
      <figcaption className="p-3 sm:p-4 md:p-5 text-xs sm:text-sm leading-relaxed text-gray-700 flex-1">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{title}</h3>
        <p className="text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-2 text-[#8B1A1A] text-xs font-semibold inline-flex items-center gap-1">
          थप पढ्नुहोस्
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </figcaption>
    </figure>
  );
}

// --- MAIN COMPONENT ---
export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        
        // Fetch Programs - FIXED: using /api/api/program/ (singular)
        const programEndpoints = [
          `${baseUrl}/api/api/program/`,
          `${baseUrl}/api/program/`,
          `${baseUrl}/api/programs/`,
          `${baseUrl}/program/`,
          `${baseUrl}/programs/`,
        ];
        
        let programData: Program[] = [];
        for (const endpoint of programEndpoints) {
          try {
            console.log(`Fetching programs from: ${endpoint}`);
            const response = await fetch(endpoint);
            if (response.ok) {
              programData = await response.json();
              console.log(`Successfully fetched programs from: ${endpoint}`, programData);
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${endpoint}`);
          }
        }

        // Fetch Notices
        const noticeEndpoints = [
          `${baseUrl}/api/api/notices/`,
          `${baseUrl}/api/notices/`,
          `${baseUrl}/notices/`,
        ];
        
        let noticeData: Notice[] = [];
        for (const endpoint of noticeEndpoints) {
          try {
            console.log(`Fetching notices from: ${endpoint}`);
            const response = await fetch(endpoint);
            if (response.ok) {
              noticeData = await response.json();
              console.log(`Successfully fetched notices from: ${endpoint}`, noticeData);
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${endpoint}`);
          }
        }

        // Set programs data
        if (programData && programData.length > 0) {
          setPrograms(programData);
        } else {
          console.warn('No programs data received');
          setPrograms([]);
        }
        
        // Filter published notices and limit to 4
        if (noticeData && noticeData.length > 0) {
          const publishedNotices = noticeData
            .filter(n => n.is_published !== false)
            .slice(0, 4);
          setNotices(publishedNotices);
        } else {
          setNotices([]);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPrograms = programs.length;
  const hasMoreThanThree = totalPrograms > 3;

  // Mobile slide controls
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
    if (!isMobile || !hasMoreThanThree || programs.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile, hasMoreThanThree, programs.length]);

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
    if (isMobile || !hasMoreThanThree || programs.length === 0) return;

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
  }, [isMobile, hasMoreThanThree, programs.length]);

  const currentProgram = programs[currentIndex];

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-white py-12 sm:py-16 md:py-20 border-t border-[#8B1A1A]/10 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8B1A1A] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative bg-white py-12 sm:py-16 md:py-20 border-t border-[#8B1A1A]/10 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Error loading data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-[#8B1A1A] text-white rounded-lg hover:bg-[#6B1414] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

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

              {!isMobile && hasMoreThanThree && programs.length > 0 && (
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

            {programs.length === 0 ? (
              <div className="mt-8 text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
                <p className="text-gray-500">कुनै कार्यक्रम उपलब्ध छैन</p>
              </div>
            ) : (
              <>
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
                        title={currentProgram.title}
                        description={currentProgram.description}
                        onClick={() => setSelectedProgram(currentProgram)}
                      />
                      
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
                    
                    <div className="flex justify-center gap-1.5 mt-4 sm:mt-5">
                      {programs.map((_, index) => (
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
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        data-program-card
                        className="w-[80%] sm:w-[calc(50%-0.625rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] shrink-0 snap-start"
                      >
                        <ProgramCard 
                          image={program.image} 
                          title={program.title}
                          description={program.description}
                          onClick={() => setSelectedProgram(program)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
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
            
            {notices.length === 0 ? (
              <div className="mt-4 sm:mt-6 md:mt-8 p-6 text-center bg-gray-50 rounded-2xl border border-gray-200">
                <p className="text-gray-500">कुनै सूचना उपलब्ध छैन</p>
              </div>
            ) : (
              <div className="mt-4 sm:mt-6 md:mt-8 divide-y divide-[#8B1A1A]/10 overflow-hidden rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md">
                {notices.map((notice, index) => (
                  <div 
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice)}
                    className={`flex items-start gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm leading-relaxed text-gray-700 transition-all hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] group cursor-pointer ${
                      index === 0 ? '' : ''
                    }`}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 min-w-[6px] rounded-full bg-[#8B1A1A]" />
                    <div className="flex-1">
                      <span className="group-hover:underline decoration-[#8B1A1A]/30 underline-offset-4 line-clamp-2 sm:line-clamp-3">
                        {notice.title}
                      </span>
                      <div className="mt-1 text-[#8B1A1A] text-xs font-semibold inline-flex items-center gap-1">
                        थप पढ्नुहोस्
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popups */}
      <ProgramPopup 
        program={selectedProgram} 
        onClose={() => setSelectedProgram(null)} 
      />
      
      <NoticePopup 
        notice={selectedNotice} 
        onClose={() => setSelectedNotice(null)} 
      />
    </section>
  );
}