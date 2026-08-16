
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// --- DATA STRUCTURE ---
type ProgramItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  // Additional fields that might be in the API response
  shortText?: string;
  fullContent?: string;
  image_url?: string;
  slug?: string;
  is_published?: boolean;
  is_featured?: boolean;
  view_count?: number;
  published_date?: string;
  created_at?: string;
  updated_at?: string;
};

// --- POPUP MODAL COMPONENT ---
function ProgramPopup({ 
  item, 
  onClose 
}: { 
  item: ProgramItem | null, 
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
            src={item.image_url || item.image || "/images/placeholder.jpg"}
            alt={item.title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/placeholder.jpg";
            }}
          />
        </div>

        {/* --- POPUP HEADER --- */}
        <div className="pr-8 mb-4">
          <h3 className="text-xl font-bold text-[#8B1A1A] leading-tight">
            {item.title}
          </h3>
          {item.published_date && (
            <p className="text-xs text-gray-400 mt-1">
              प्रकाशित: {new Date(item.published_date).toLocaleDateString('ne-NP')}
            </p>
          )}
        </div>

        {/* --- POPUP CONTENT --- */}
        <div 
          className="prose prose-sm prose-gray max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ 
            __html: item.fullContent || item.description || item.shortText || `<p>${item.description}</p>`
          }}
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
  const [selectedItem, setSelectedItem] = useState<ProgramItem | null>(null);
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        const endpoint = `${baseUrl}/api/api/program/`;
        
        console.log('Fetching programs from:', endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ProgramItem[] = await response.json();
        
        // Filter only published items if is_published field exists
        const publishedPrograms = data.filter(item => item.is_published !== false);
        setPrograms(publishedPrograms);
        setError(null);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError(err instanceof Error ? err.message : "Failed to load programs");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-white py-24 min-h-screen overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8B1A1A] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading programs...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative bg-white py-24 min-h-screen overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Error loading programs: {error}</p>
            <p className="text-sm text-gray-500 mt-2">
              Attempted to fetch from: {process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/api/program/
            </p>
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
          {programs.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative flex flex-col rounded-2xl border border-[#8B1A1A]/10 bg-white shadow-md overflow-hidden cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl hover:border-[#8B1A1A]/25"
            >
              {/* --- IMAGE --- */}
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={item.image_url || item.image || "/images/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.jpg";
                  }}
                />
                {item.is_featured && (
                  <div className="absolute top-2 right-2 bg-[#8B1A1A] text-white text-xs px-2 py-1 rounded-full">
                    विशेष
                  </div>
                )}
              </div>

              {/* --- TEXT CONTENT --- */}
              <div className="flex flex-col flex-grow p-5">
                <h3 className="font-display text-base font-bold text-gray-800 group-hover:text-[#8B1A1A] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-grow">
                  {item.shortText || item.description}
                </p>
                
                {/* --- METADATA --- */}
                {item.view_count !== undefined && (
                  <div className="mt-2 text-xs text-gray-400">
                    👁️ {item.view_count} पटक हेरिएको
                  </div>
                )}

                {/* --- READ MORE LINK --- */}
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8B1A1A] hover:text-[#a02020] transition-colors">
                  थप पढ्नुहोस्
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {programs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">कुनै कार्यक्रमहरू उपलब्ध छैनन्।</p>
          </div>
        )}

      </div>

      {/* --- POPUP MODAL --- */}
      <ProgramPopup 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
}