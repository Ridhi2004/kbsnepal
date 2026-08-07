"use client";

import { useEffect, useRef, useState } from "react";

type PriceRow = {
  no: number;
  item: string;
  old1: number | null;
  old2: number | null;
  current: number;
  current2: number; // New field for second current price
};

// --- FULL DATA (61 items) ---
// Note: I've added current2 values - you'll need to update these with your actual data
const PRICES: PriceRow[] = [
  { no: 1, item: "त्रिशुलीको पोखरेली चामल -प्रति किलो", old1: 75, old2: 70, current: 90, current2: 88 },
  { no: 2, item: "स्टिम जिरामसिनो चामल -प्रति किलो", old1: 70, old2: null, current: 70, current2: 68 },
  { no: 3, item: "लङ्ग ग्रेन वासमति चामल -प्रति किलो", old1: 130, old2: 120, current: 130, current2: 128 },
  { no: 4, item: "स्टिम सोना चामल -प्रति किलो", old1: 55, old2: 55, current: 60, current2: 58 },
  { no: 5, item: "ताइचिन चिउरा -प्रति किलो", old1: 140, old2: 120, current: 130, current2: 125 },
  { no: 6, item: "तराई ताइचिन चिउरा -प्रति किलो", old1: 60, old2: null, current: 70, current2: 68 },
  { no: 7, item: "म. पा. चिउरा -प्रति किलो", old1: 60, old2: null, current: 65, current2: 63 },
  { no: 8, item: "मास दाल -प्रति किलो", old1: 100, old2: 140, current: 170, current2: 168 },
  { no: 9, item: "मुंग खोस्टा ठुलो -प्रति किलो", old1: 140, old2: 130, current: 170, current2: 165 },
  { no: 10, item: "मुसुर दाल -प्रति किलो", old1: 100, old2: 100, current: 150, current2: 148 },
  { no: 11, item: "मुंग गेडा -प्रति किलो", old1: 140, old2: 130, current: 170, current2: 168 },
  { no: 12, item: "मुंग छाटा १ नं.-प्रति किलो", old1: 140, old2: 120, current: 200, current2: 198 },
  { no: 13, item: "N.P. रहर दाल-प्रति किलो", old1: 110, old2: 100, current: 170, current2: 168 },
  { no: 14, item: "चना दाल ठुलो-प्रति किलो", old1: 140, old2: 130, current: 140, current2: 138 },
  { no: 15, item: "भुटेको तोरीको तेल -प्रति लिटर", old1: 270, old2: 220, current: 350, current2: 345 },
  { no: 16, item: "कांचो तोरीको तेल -प्रति लिटर", old1: 160, old2: 140, current: 240, current2: 238 },
  { no: 17, item: "भटमास तेल -प्रति लिटर", old1: 115, old2: 115, current: 220, current2: 215 },
  { no: 18, item: "सनफ्लावर तेल -प्रति लिटर", old1: 140, old2: 125, current: 240, current2: 235 },
  { no: 19, item: "डाल्डा ध्यू -प्रति लिटर", old1: 125, old2: null, current: 210, current2: 208 },
  { no: 20, item: "नेपाली ध्यू -प्रति किलो", old1: 700, old2: null, current: 900, current2: 880 },
  { no: 21, item: "खोरसानी पाउडर -प्रति किलो", old1: 300, old2: 250, current: 450, current2: 445 },
  { no: 22, item: "जिरा पाउडर -प्रति किलो", old1: 500, old2: 450, current: 450, current2: 448 },
  { no: 23, item: "धनिया पाउडर -प्रति किलो", old1: 250, old2: 200, current: 250, current2: 248 },
  { no: 24, item: "बेसार पाउडर -प्रति किलो", old1: 300, old2: 250, current: 300, current2: 298 },
  { no: 25, item: "चिनी -प्रति किलो", old1: 80, old2: null, current: 90, current2: 88 },
  { no: 26, item: "सेतो भटमास -प्रति किलो", old1: 90, old2: 80, current: 130, current2: 128 },
  { no: 27, item: "कैलो भटमास -प्रति किलो", old1: 110, old2: 110, current: 130, current2: 128 },
  { no: 28, item: "कालो भटमास -प्रति किलो", old1: 180, old2: 160, current: 160, current2: 158 },
  { no: 29, item: "काबुल चना -प्रति किलो", old1: 190, old2: 110, current: 140, current2: 138 },
  { no: 30, item: "मौसमी चना -प्रति किलो", old1: null, old2: 40, current: 140, current2: 138 },
  { no: 31, item: "अ फरम चना -प्रति किलो", old1: 100, old2: 110, current: 110, current2: 108 },
  { no: 32, item: "सेतो केराउ -प्रति किलो", old1: 65, old2: 60, current: 100, current2: 98 },
  { no: 33, item: "हरियो केराउ -प्रति किलो", old1: 80, old2: 70, current: 140, current2: 138 },
  { no: 34, item: "सानो केराउ -प्रति किलो", old1: 120, old2: 90, current: 160, current2: 158 },
  { no: 35, item: "राजमा -प्रति किलो", old1: 180, old2: 140, current: 200, current2: 198 },
  { no: 36, item: "सेतो सिमी -प्रति किलो", old1: 180, old2: 160, current: 180, current2: 178 },
  { no: 37, item: "बोडी -प्रति किलो", old1: 100, old2: 90, current: 160, current2: 158 },
  { no: 38, item: "मस्याङ्ग -प्रति किलो", old1: null, old2: 100, current: 130, current2: 128 },
  { no: 39, item: "कैलो तिल -प्रति किलो", old1: 250, old2: 250, current: 350, current2: 345 },
  { no: 40, item: "सेतो तिल -प्रति किलो", old1: 300, old2: 225, current: 300, current2: 298 },
  { no: 41, item: "कालो तिल -प्रति किलो", old1: null, old2: 250, current: 450, current2: 445 },
  { no: 42, item: "गहुं -प्रति किलो", old1: 45, old2: null, current: 45, current2: 45 },
  { no: 43, item: "मकै -प्रति किलो", old1: null, old2: null, current: 45, current2: 45 },
  { no: 44, item: "कोदो-प्रति किलो", old1: 70, old2: null, current: 75, current2: 73 },
  { no: 45, item: "जौ-प्रति किलो", old1: 80, old2: null, current: 80, current2: 78 },
  { no: 46, item: "मैदा-प्रति किलो", old1: 46, old2: null, current: 50, current2: 48 },
  { no: 47, item: "आंटा-प्रति किलो", old1: 50, old2: null, current: 50, current2: 50 },
  { no: 48, item: "सुजी-प्रति किलो", old1: 56, old2: null, current: 60, current2: 58 },
  { no: 49, item: "मकै पिठो-प्रति किलो", old1: null, old2: null, current: 50, current2: 50 },
  { no: 50, item: "चामल पिठो खस्रो-प्रति किलो", old1: 45, old2: null, current: 50, current2: 48 },
  { no: 51, item: "चामल पिठो मसिनो-प्रति किलो", old1: 50, old2: 50, current: 60, current2: 58 },
  { no: 52, item: "बेसन -प्रति किलो", old1: 180, old2: 110, current: 160, current2: 158 },
  { no: 53, item: "मस्यौरा-प्रति किलो", old1: null, old2: null, current: 150, current2: 148 },
  { no: 54, item: "जिरा सुरज-प्रति किलो", old1: 440, old2: 420, current: 365, current2: 360 },
  { no: 55, item: "धनिया गेडा हरियो-प्रति किलो", old1: 200, old2: 170, current: 200, current2: 198 },
  { no: 56, item: "मेथी -प्रति किलो", old1: 100, old2: null, current: 180, current2: 178 },
  { no: 57, item: "ज्वानो-प्रति किलो", old1: 400, old2: null, current: 400, current2: 395 },
  { no: 58, item: "गहत-प्रति किलो", old1: null, old2: null, current: 140, current2: 138 },
  { no: 59, item: "सेतो चना", old1: null, old2: null, current: 0, current2: 0 },
  { no: 60, item: "कांचो बदाम-प्रति किलो", old1: null, old2: null, current: 225, current2: 220 },
  { no: 61, item: "मासको छांटा", old1: null, old2: null, current: 200, current2: 198 },
];

export default function MarketPrices() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic (every 3 seconds)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollStep = () => {
      if (isPaused) return;

      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const currentScroll = container.scrollLeft;

      if (currentScroll + clientWidth >= scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 400, behavior: "smooth" });
      }
    };

    const intervalId = setInterval(scrollStep, 3000);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section id="prices" className="relative bg-white py-20 overflow-hidden">
      {/* Subtle Red Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
              दैनिक अद्यावधिक
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              आजको बजार मूल्य
            </h2>
          </div>
          <p className="max-w-sm text-sm text-gray-900">
            मूल्य प्रति किलोग्राम/लिटर, रुपैयाँमा। तुलनाका लागि अघिल्लो दुई अवधिको मूल्य पनि देखाइएको छ।
          </p>
        </div>

        {/* Table Container */}
        <div 
          className="mt-10 rounded-3xl border border-[#8B1A1A]/10 bg-white/90 backdrop-blur-md shadow-xl shadow-[#8B1A1A]/5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={scrollContainerRef}
            className="max-h-[550px] overflow-y-auto rounded-3xl scrollbar-thin scrollbar-thumb-[#8B1A1A] scrollbar-track-transparent"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                
                {/* Sticky Header */}
                <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-[0_4px_12px_-6px_rgba(139,26,26,0.08)]">
                  <tr className="border-b-2 border-[#8B1A1A]/20 bg-[#8B1A1A]/[0.03] text-xs font-bold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-5 font-medium">संख्या</th>
                    <th className="px-6 py-5 font-medium text-left">बिवरण-प्रति किलो</th>
                    <th className="px-6 py-5 font-medium text-center">पुरानो मूल्य १</th>
                    <th className="px-6 py-5 font-medium text-center">पुरानो मूल्य २</th>
                    <th className="px-6 py-5 font-medium text-center">हालको मूल्य १</th>
                    <th className="px-6 py-5 font-medium text-center">हालको मूल्य २</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-[#8B1A1A]/10">
                  {PRICES.map((row) => (
                    <tr 
                      key={row.no} 
                      className="group transition-all duration-200 even:bg-[#8B1A1A]/[0.02] hover:bg-[#8B1A1A]/[0.05]"
                    >
                      <td className="px-6 py-4.5 text-gray-400 font-medium">{row.no}</td>
                      <td className="px-6 py-4.5 font-medium text-gray-800 group-hover:text-[#8B1A1A] transition-colors">
                        {row.item}
                      </td>
                      <td className="px-6 py-4.5 text-center text-gray-500">{row.old1 ?? "—"}</td>
                      <td className="px-6 py-4.5 text-center text-gray-500">{row.old2 ?? "—"}</td>
                      <td className="px-6 py-4.5 text-center font-display text-lg font-semibold text-[#8B1A1A]">
                        रु {row.current}
                      </td>
                      <td className="px-6 py-4.5 text-center font-display text-lg font-semibold text-[#8B1A1A]">
                        रु {row.current2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for scrollbar */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #8B1A1A; border-radius: 9999px; }
        .scrollbar-thin { scrollbar-width: thin; }
      `}</style>
    </section>
  );
}