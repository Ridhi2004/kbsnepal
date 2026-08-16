
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// --- TYPES ---
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

export default function HomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notices from API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        
        // Try multiple endpoint variations
        const endpoints = [
          `${baseUrl}/api/api/notices/`,
          `${baseUrl}/api/notices/`,
          `${baseUrl}/notices/`,
        ];
        
        let noticeData: Notice[] = [];
        for (const endpoint of endpoints) {
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
        
        // Filter published notices and get only the latest 4
        if (noticeData && noticeData.length > 0) {
          const publishedNotices = noticeData
            .filter(n => n.is_published !== false)
            .sort((a, b) => {
              // Sort by published_date (newest first)
              const dateA = a.published_date ? new Date(a.published_date).getTime() : 0;
              const dateB = b.published_date ? new Date(b.published_date).getTime() : 0;
              return dateB - dateA;
            })
            .slice(0, 4); // Get only the latest 4
          
          setNotices(publishedNotices);
        } else {
          setNotices([]);
        }
      } catch (err) {
        console.error("Error fetching notices:", err);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Show popup after data is loaded
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800); // 800ms delay for a smooth page load

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen || loading) return null;

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ne-NP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

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
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* --- POPUP HEADER --- */}
        <div className="p-6 pb-2 pr-12">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-[#8B1A1A] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1A1A]">
              {notices.length > 0 ? `नयाँ सूचना (${notices.length})` : 'सूचना'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            आधिकारिक सूचनाहरू
          </h2>
        </div>

        {/* --- NOTICES LIST --- */}
        <div className="p-6 pt-2">
          {notices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>हाल कुनै सूचना उपलब्ध छैन</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div 
                  key={notice.id} 
                  className="border-l-4 border-[#8B1A1A]/30 pl-4 py-1 transition-colors hover:border-[#8B1A1A]"
                >
                  <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
                    {notice.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-gray-400">
                      {formatDate(notice.published_date || notice.created_at)}
                    </span>
                    {notice.is_featured && (
                      <span className="text-[8px] font-semibold text-[#8B1A1A] bg-[#8B1A1A]/10 px-2 py-0.5 rounded-full">
                        विशेष
                      </span>
                    )}
                   
                  </div>
                </div>
              ))}
            </div>
          )}
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