"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// --- GALLERY DATA ---
// Group images by Event category
const GALLERY_DATA = [
  {
    id: "annual-meeting",
    title: "वार्षिक साधारण सभा तथा सगुन कार्यक्रम",
    description: "नेपाल खुद्रा व्यापार संघको वार्षिक साधारण सभा तथा सगुन कार्यक्रमको झलक।",
    images: [
      { id: 1, src: "/images/gallery/meeting-1.jpg", alt: "वार्षिक साधारण सभा १" },
      { id: 2, src: "/images/gallery/meeting-2.jpg", alt: "वार्षिक साधारण सभा २" },
      { id: 3, src: "/images/gallery/meeting-3.jpg", alt: "वार्षिक साधारण सभा ३" },
      { id: 4, src: "/images/gallery/meeting-4.jpg", alt: "वार्षिक साधारण सभा ४" },
    ],
  },
  {
    id: "interaction-program",
    title: "उपभोक्ता हितमा खाद्यान्न खुद्रा व्यापारी अन्तर्क्रिया",
    description: "उपभोक्ता र खुद्रा व्यापारीहरु बीचको अन्तर्क्रिया कार्यक्रमको तस्बिरहरू।",
    images: [
      { id: 5, src: "/images/gallery/interaction-1.jpg", alt: "अन्तर्क्रिया कार्यक्रम १" },
      { id: 6, src: "/images/gallery/interaction-2.jpg", alt: "अन्तर्क्रिया कार्यक्रम २" },
      { id: 7, src: "/images/gallery/interaction-3.jpg", alt: "अन्तर्क्रिया कार्यक्रम ३" },
    ],
  },
  {
    id: "scholarship",
    title: "श्री गंगा बहादुर मानन्धर स्मृति कोष छात्रवृत्ति कार्यक्रम",
    description: "खुद्रा व्यापारीका सन्तानहरुलाई प्रदान गरिएको छात्रवृत्ति कार्यक्रमको झलक।",
    images: [
      { id: 8, src: "/images/gallery/scholarship-1.jpg", alt: "छात्रवृत्ति कार्यक्रम १" },
      { id: 9, src: "/images/gallery/scholarship-2.jpg", alt: "छात्रवृत्ति कार्यक्रम २" },
      { id: 10, src: "/images/gallery/scholarship-3.jpg", alt: "छात्रवृत्ति कार्यक्रम ३" },
      { id: 11, src: "/images/gallery/scholarship-4.jpg", alt: "छात्रवृत्ति कार्यक्रम ४" },
    ],
  },
  {
    id: "election",
    title: "भेग प्रतिनिधि छनौट चुनाव कार्यक्रम",
    description: "भेग प्रतिनिधि छनौटको चुनाव कार्यक्रमको तस्बिरहरू।",
    images: [
      { id: 12, src: "/images/gallery/election-1.jpg", alt: "चुनाव कार्यक्रम १" },
      { id: 13, src: "/images/gallery/election-2.jpg", alt: "चुनाव कार्यक्रम २" },
      { id: 14, src: "/images/gallery/election-3.jpg", alt: "चुनाव कार्यक्रम ३" },
    ],
  },
];

// --- LIGHTBOX MODAL COMPONENT ---
function Lightbox({ 
  image, 
  onClose 
}: { 
  image: { src: string; alt: string } | null, 
  onClose: () => void 
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- CLOSE BUTTON --- */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black transition-colors"
          aria-label="बन्द गर्नुहोस्"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* --- IMAGE --- */}
        <div className="relative w-full h-[70vh]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

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
            हाम्रा कार्यक्रमहरू
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            ग्यालरी
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          <p className="mt-4 max-w-2xl text-gray-500 text-sm">
            नेपाल खुद्रा व्यापार संघका विभिन्न कार्यक्रमहरूको झलक। कुनै पनि तस्बिरमा क्लिक गर्नुहोस् र ठूलो आकारमा हेर्नुहोस्।
          </p>
        </div>

        {/* --- GALLERY SECTIONS --- */}
        <div className="space-y-16">
          {GALLERY_DATA.map((section) => (
            <div key={section.id} className="border-b border-[#8B1A1A]/10 pb-16 last:border-0 last:pb-0">
              
              {/* SECTION TITLE */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#8B1A1A]">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {section.description}
                  </p>
                </div>
                <span className="mt-2 sm:mt-0 text-xs text-gray-400">
                  {section.images.length} तस्बिरहरू
                </span>
              </div>

              {/* IMAGE GRID */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {section.images.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer transition-all hover:shadow-lg hover:shadow-[#8B1A1A]/10"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#8B1A1A]/0 transition-colors group-hover:bg-[#8B1A1A]/20 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-white/90 p-2 text-[#8B1A1A] shadow-sm">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <Lightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </section>
  );
}