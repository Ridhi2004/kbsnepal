"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// --- DATA STRUCTURE ---
const INFO_ITEMS = [
  {
    id: 1,
    title: "निर्वाचित घोषणा सम्बन्धि जानकारी",
    image: "/images/info/election.jpg", 
    shortText: "निर्वाचित घोषणा सम्बन्धि जानकारी",
    fullContent: `
      <p><strong>निर्वाचित घोषणा सम्बन्धि जानकारी</strong></p>
      <p>नेपाल खुद्रा व्यापार संघको हालै सम्पन्न निर्वाचनको परिणाम आधिकारिक रुपमा घोषणा गरिएको छ।</p>
      <p>नव निर्वाचित पदाधिकारी तथा भेग प्रतिनिधिहरुको नामावली संघको कार्यालयमा हेर्न सकिन्छ।</p>
      <p>सम्पूर्ण सदस्यहरुलाई धन्यवाद ।</p>
    `,
  },
  {
    id: 2,
    title: "भेग प्रतिनिधि छनौट चुनाव संबन्धि कार्यक्रम २०७१",
    image: "/images/info/election-program.jpg",
    shortText: "भेग प्रतिनिधि छनौट चुनाव संबन्धि कार्यक्रम २०७१",
    fullContent: `
      <p><strong>भेग प्रतिनिधि छनौट चुनाव संबन्धि कार्यक्रम २०७१</strong></p>
      <p>संघको विधान अनुसार २०७१ सालमा भेग प्रतिनिधि छनौटको चुनाव कार्यक्रम सम्पन्न भएको थियो।</p>
      <p>उक्त चुनाव शान्तिपूर्ण रुपमा सम्पन्न भई सबै भेगबाट प्रतिनिधिहरु निर्वाचित भएका थिए।</p>
    `,
  },
  {
    id: 3,
    title: "१२ औं दिनको पुण्य तिथिमा हार्दिक समवेदना",
    image: "/images/info/condolence.jpg",
    shortText: "१२ औं दिनको पुण्य तिथिमा हार्दिक समवेदना",
    fullContent: `
      <p><strong>१२ औं दिनको पुण्य तिथिमा हार्दिक समवेदना</strong></p>
      <p>यस संघको भेग प्रतिनिधि श्री भरत सत्याल ज्यूको १२ औं दिनको पुण्य तिथिमा सम्पूर्ण परिवारजनमा हार्दिक समवेदना व्यक्त गरिन्छ।</p>
      <p>दिवंगत आत्माको चिरशान्तिको कामना गर्दछौं ।</p>
    `,
  },
  {
    id: 4,
    title: "नेपाल खुद्रा व्यापार संघ श्री गंगा",
    image: "/images/info/shree-ganga.jpg",
    shortText: "नेपाल खुद्रा व्यापार संघ श्री गंगा",
    fullContent: `
      <p><strong>नेपाल खुद्रा व्यापार संघ श्री गंगा</strong></p>
      <p>नेपाल खुद्रा व्यापार संघ श्री गंगा समूहले खुद्रा व्यापारीहरुको हक हितको लागि निरन्तर क्रियाशील रहँदै आएको छ।</p>
      <p>यस समूहले विभिन्न समयमा व्यापारीहरुको समस्या समाधानका लागि पहल गर्दै आएको छ।</p>
    `,
  },
  {
    id: 5,
    title: "नेपाल खुद्रा व्यापार संघ श्री गंगा बहादुर मानन्धर स्मृति कोष द्धारा संचालित छात्रवृत्ति कार्यक्रम",
    image: "/images/info/scholarship.jpg",
    shortText: "नेपाल खुद्रा व्यापार संघ श्री गंगा बहादुर मानन्धर स्मृति कोष द्धारा संचालित छात्रवृत्ति कार्यक्रम",
    fullContent: `
      <p><strong>छात्रवृत्ति कार्यक्रम</strong></p>
      <p>श्री गंगा बहादुर मानन्धर स्मृति कोषको सहयोगमा यस संघले खुद्रा व्यापारीहरुका सन्तानहरुका लागि नियमित रुपमा छात्रवृत्ति कार्यक्रम सञ्चालन गर्दै आएको छ।</p>
      <p>यस कार्यक्रमले आर्थिक रुपमा विपन्न तर प्रतिभावान विद्यार्थीहरुलाई उच्च शिक्षा हासिल गर्न सहयोग पुर्याउँदै आएको छ।</p>
    `,
  },
];

// --- POPUP MODAL COMPONENT ---
function InfoPopup({ 
  item, 
  onClose 
}: { 
  item: typeof INFO_ITEMS[0] | null, 
  onClose: () => void 
}) {
  // Close modal when clicking outside or pressing Escape
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
export default function InfoPage() {
  const [selectedItem, setSelectedItem] = useState<typeof INFO_ITEMS[0] | null>(null);

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
            गृह पृष्ठ जानकारी
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            जानकारी
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          <p className="mt-4 max-w-2xl text-gray-500 text-sm">
            कुनै पनि जानकारीमा क्लिक गर्नुहोस् र विस्तृत विवरण पढ्नुहोस्।
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {INFO_ITEMS.map((item) => (
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
      <InfoPopup 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
}