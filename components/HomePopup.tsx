"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// --- LATEST NOTICES FOR THE POPUP ---
const LATEST_NOTICES = [
  {
    id: 1,
    title: "नेपाल खुद्रा व्यापार संघका साधारण सदस्यहरुलाई साधारण सभाको सूचना",
    date: "२०८१ असार १५",
  },
  {
    id: 2,
    title: "नापतौलका सामाग्रीहरुको अनुमति पत्र दर्ता नविकरण सम्बन्धि जरुरी सूचना",
    date: "२०८१ जेठ १५",
  },
  {
    id: 3,
    title: "उपभोक्ता संरक्षण मस्यौदा विधेयक २०७३ बारे वृहत अन्तरक्रिया कार्यक्रमको सूचना",
    date: "२०८१ बैशाख २५",
  },
];

export default function HomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // --- REMOVED LOCALSTORAGE LOGIC ---
    // The popup will now trigger purely on page load.
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800); // 800ms delay for a smooth page load

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs exactly once per refresh

  const handleClose = () => {
    setIsOpen(false);
    // No localStorage saving means it will open again on the next refresh!
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- TOP RED BORDER --- */}
        <div className="h-[4px] w-full bg-[#8B1A1A]" />

        {/* --- CLOSE BUTTON --- */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          aria-label="बन्द गर्नुहोस्"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* --- POPUP HEADER --- */}
        <div className="p-6 pb-2 pr-12">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-[#8B1A1A] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1A1A]">
              नयाँ सूचना
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            आधिकारिक सूचनाहरू
          </h2>
        </div>

        {/* --- NOTICES LIST --- */}
        <div className="p-6 pt-2">
          <div className="space-y-4">
            {LATEST_NOTICES.map((notice) => (
              <div 
                key={notice.id} 
                className="border-l-4 border-[#8B1A1A]/30 pl-4 py-1 transition-colors hover:border-[#8B1A1A]"
              >
                <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
                  {notice.title}
                </p>
                <span className="mt-1 text-[10px] text-gray-400">{notice.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- FOOTER BUTTONS --- */}
        <div className="p-6 pt-2 flex flex-col sm:flex-row gap-3 border-t border-gray-100">
          <Link
            href="/notices"
            onClick={handleClose}
            className="flex-1 rounded-xl bg-[#8B1A1A] px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#8B1A1A]/25 transition-all hover:-translate-y-0.5 hover:bg-[#a02020] hover:shadow-xl"
          >
            सबै सूचना हेर्नुहोस् →
          </Link>
          <button
            onClick={handleClose}
            className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-center text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            बन्द गर्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );
}