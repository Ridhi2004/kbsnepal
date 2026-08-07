"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// --- PROGRAMS DATA ---
const PROGRAMS_DATA = [
  {
    id: 1,
    title: "AGM (वार्षिक साधारण सभा)",
    image: "/images/programs/agm.jpg", // <-- Replace with your image paths
    shortText: "नेपाल खुद्रा व्यापार संघको वार्षिक साधारण सभा",
    fullContent: `
      <p><strong>AGM - वार्षिक साधारण सभा</strong></p>
      <p>नेपाल खुद्रा व्यापार संघको विधान बमोजिम यस वर्षको वार्षिक साधारण सभा सफलतापूर्वक सम्पन्न भएको छ।</p>
      <p>सभामा संघको वार्षिक प्रतिवेदन, आय-व्यय विवरण तथा आगामी वर्षको योजनाबारे छलफल गरिएको थियो।</p>
      <p><strong>मिति:</strong> २०८१ असार ३० गते</p>
      <p><strong>स्थान:</strong> संघको कार्यालय, टेकु, काठमाडौं</p>
      <p>सम्पूर्ण सदस्यहरुको सहभागिता र सहयोगको लागि धन्यवाद ।</p>
    `,
  },
  {
    id: 2,
    title: "सर्ब सहमती बाट",
    image: "/images/programs/consensus.jpg",
    shortText: "नेपाल खुद्रा व्यापार संघको सर्ब सहमती कार्यक्रम",
    fullContent: `
      <p><strong>सर्ब सहमती कार्यक्रम</strong></p>
      <p>नेपाल खुद्रा व्यापार संघको सम्पूर्ण सदस्यहरुको उपस्थितिमा सर्ब सहमतीबाट विभिन्न महत्वपूर्ण निर्णयहरु पारित गरिएको छ।</p>
      <p>सदस्यहरुले संघको भविष्य, नीति तथा कार्यक्रमहरुबारे आफ्नो बहुमूल्य सुझाव राख्नु भएको थियो।</p>
    `,
  },
  {
    id: 3,
    title: "सगुन",
    image: "/images/programs/sagun.jpg",
    shortText: "पारम्परिक सगुन कार्यक्रम",
    fullContent: `
      <p><strong>सगुन कार्यक्रम</strong></p>
      <p>नेपाली परम्परा अनुसार संघले आयोजना गरेको सगुन कार्यक्रम सम्पन्न भएको छ।</p>
      <p>यस कार्यक्रमले सम्पूर्ण सदस्यहरु बीच आपसी सद्भाव र एकता कायम गर्न महत्वपूर्ण भूमिका खेलेको छ।</p>
    `,
  },
  {
    id: 4,
    title: "ब्यापारीबारे भएको अन्तरक्रिया कार्यक्रम",
    image: "/images/programs/interaction-1.jpg",
    shortText: "व्यापारीहरु बीचको अन्तरक्रिया",
    fullContent: `
      <p><strong>व्यापारी अन्तरक्रिया कार्यक्रम</strong></p>
      <p>खुद्रा व्यापारीहरुको समस्या, चुनौती तथा समाधानका उपायहरुबारे खुला छलफल गरिएको अन्तरक्रिया कार्यक्रम सम्पन्न भएको छ।</p>
      <p>कार्यक्रममा विभिन्न भेगका व्यापारीहरुले आ-आफ्ना विचार राख्नु भएको थियो।</p>
    `,
  },
  {
    id: 5,
    title: "उपभोक्ता को हितमा खद्यान्न का खुद्रा ब्यापारीबारे भएको अन्तरक्रिया कार्यक्रम",
    image: "/images/programs/interaction-2.jpg",
    shortText: "उपभोक्ता हित र खुद्रा व्यापारीहरु",
    fullContent: `
      <p><strong>उपभोक्ता हित र खुद्रा व्यापारी अन्तरक्रिया</strong></p>
      <p>उपभोक्ताहरुको हक हित र खुद्रा व्यापारीहरुको भूमिका बारे वृहत छलफल गरिएको अन्तरक्रिया कार्यक्रम सम्पन्न भएको छ।</p>
      <p>उपभोक्ताहरुलाई गुणस्तरीय र सुलभ सेवा पुर्याउन खुद्रा व्यापारीहरुको भूमिका महत्वपूर्ण रहेको बारे जोड दिइएको थियो।</p>
    `,
  },
];

// --- POPUP MODAL COMPONENT ---
function ProgramPopup({ 
  item, 
  onClose 
}: { 
  item: typeof PROGRAMS_DATA[0] | null, 
  onClose: () => void 
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- CLOSE BUTTON --- */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white transition-colors"
          aria-label="बन्द गर्नुहोस्"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* --- POPUP IMAGE --- */}
        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6 bg-gray-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {/* --- POPUP HEADER --- */}
        <div className="pr-8 mb-4">
          <h3 className="text-xl font-bold text-[#8B1A1A] leading-tight">
            {item.title}
          </h3>
        </div>

        {/* --- POPUP CONTENT --- */}
        <div 
          className="prose prose-sm prose-gray max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: item.fullContent }}
        />

        {/* --- FOOTER CLOSE BUTTON --- */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#8B1A1A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a02020] transition-colors shadow-md"
          >
            बन्द गर्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function ProgramsPage() {
  const [selectedItem, setSelectedItem] = useState<typeof PROGRAMS_DATA[0] | null>(null);

  return (
    <section className="relative bg-white py-24 min-h-screen overflow-hidden">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
            गृह पृष्ठ कार्यक्रम
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            कार्यक्रम
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          <p className="mt-4 max-w-2xl text-gray-500 text-sm">
            नेपाल खुद्रा व्यापार संघले आयोजना गरेका विभिन्न कार्यक्रमहरूको विवरण। कुनै पनि कार्यक्रममा क्लिक गर्नुहोस् र विस्तृत जानकारी पढ्नुहोस्।
          </p>
        </div>

        {/* --- PROGRAMS GRID --- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative flex flex-col rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md overflow-hidden cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#8B1A1A]/25"
            >
              {/* --- IMAGE --- */}
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* --- TEXT CONTENT --- */}
              <div className="flex flex-col flex-grow p-5">
                <h3 className="font-display text-base font-bold text-gray-800 group-hover:text-[#8B1A1A] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-grow">
                  {item.shortText}
                </p>
                
                {/* --- READ MORE LINK --- */}
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8B1A1A] hover:text-[#a02020] transition-colors">
                  थप पढ्नुहोस्
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- POPUP MODAL --- */}
      <ProgramPopup 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
}