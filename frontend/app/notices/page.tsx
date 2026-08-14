
"use client";

import { useState, useEffect } from "react";

// --- DATA STRUCTURE ---
type NoticeItem = {
  id: number;
  title: string;
  date: string;
  full_content: string;
  summary: string;
  preview_content: string;
  is_published: boolean;
  is_featured: boolean;
  read_time: string;
  published_date: string;
  created_at: string;
  updated_at: string;
};

// --- POPUP MODAL COMPONENT ---
function NoticePopup({ 
  notice, 
  onClose 
}: { 
  notice: NoticeItem | null, 
  onClose: () => void 
}) {
  // Close modal when clicking outside the content box
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
      onClick={onClose} // Clicking backdrop closes modal
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* --- CLOSE BUTTON --- */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white transition-colors"
          aria-label="बन्द गर्नुहोस्"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* --- POPUP HEADER --- */}
        <div className="pr-8 mb-6">
          <h3 className="text-xl font-bold text-[#8B1A1A] leading-tight">
            {notice.title}
          </h3>
        
        </div>

        {/* --- POPUP CONTENT --- */}
        <div 
          className="prose prose-sm prose-gray max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ 
            __html: notice.full_content || notice.preview_content || notice.summary 
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
export default function NoticesPage() {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        const endpoint = `${baseUrl}/api/api/notices/`; // Adjust endpoint as needed
        
        console.log('Fetching notices from:', endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: NoticeItem[] = await response.json();
        
        // Filter only published items
        const publishedNotices = data.filter(item => item.is_published !== false);
        setNotices(publishedNotices);
        setError(null);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError(err instanceof Error ? err.message : "Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-white py-24 min-h-screen overflow-hidden">
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8B1A1A] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading notices...</p>
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
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Error loading notices: {error}</p>
            <p className="text-sm text-gray-500 mt-2">
              Attempted to fetch from: {process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/api/notices/
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

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
            सूचनाहरू
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            आधिकारिक सूचनाहरू
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          <p className="mt-4 max-w-xl text-gray-500 text-sm">
            कुनै पनि सूचनामा क्लिक गर्नुहोस् र विस्तृत विवरण पढ्नुहोस्।
          </p>
        </div>

        {/* --- NOTICES LIST --- */}
        <div className="rounded-3xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm shadow-xl shadow-[#8B1A1A]/5 divide-y divide-[#8B1A1A]/10 overflow-hidden">
          {notices.map((notice) => (
            <button
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all hover:bg-[#8B1A1A]/5 group"
            >
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-base font-medium text-gray-800 group-hover:text-[#8B1A1A] transition-colors line-clamp-2">
                  {notice.title}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                  <span>{notice.date || new Date(notice.published_date).toLocaleDateString('ne-NP')}</span>
                  {notice.is_featured && (
                    <span className="px-2 py-0.5 bg-[#8B1A1A]/10 text-[#8B1A1A] rounded-full text-[10px] font-medium">
                      विशेष
                    </span>
                  )}
                 
                </div>
              </div>
              
              {/* Open Icon */}
              <div className="shrink-0 rounded-full bg-[#8B1A1A]/10 p-2 text-[#8B1A1A] group-hover:bg-[#8B1A1A] group-hover:text-white transition-all">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {notices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">कुनै सूचनाहरू उपलब्ध छैनन्।</p>
          </div>
        )}

      </div>

      {/* --- POPUP MODAL --- */}
      <NoticePopup 
        notice={selectedNotice} 
        onClose={() => setSelectedNotice(null)} 
      />
    </section>
  );
}