"use client";

import { useState, useEffect } from "react";

// --- DATA STRUCTURE ---
type PriceRow = {
  no: number;
  item: string;
  old1: number | null;
  old2: number | null;
  current1: number;
  current2: number;
};

// API response type
type ApiPriceRow = {
  no: number;
  item: string;
  old1: string;
  old2: string;
  current1: string;
  current2: string;
};

export default function MarketPrices() {
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        const endpoint = `${baseUrl}/api/api/prices/`;
        
        console.log('Fetching prices from:', endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiPriceRow[] = await response.json();
        
        // Transform API data to match PriceRow type
        const transformedData: PriceRow[] = data.map((item) => ({
          no: item.no,
          item: item.item,
          old1: item.old1 ? parseFloat(item.old1) : null,
          old2: item.old2 ? parseFloat(item.old2) : null,
          current1: parseFloat(item.current1),
          current2: parseFloat(item.current2),
        }));
        
        setPrices(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching prices:", err);
        setError(err instanceof Error ? err.message : "Failed to load prices");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section id="prices" className="relative bg-white py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8B1A1A] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading market prices...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="prices" className="relative bg-white py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Error loading prices: {error}</p>
            <p className="text-sm text-gray-500 mt-2">
              Attempted to fetch from: {process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/api/prices/
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
    <section id="prices" className="relative bg-white py-20 overflow-hidden">
      
      {/* --- BACKGROUND IMAGE WITH OVERLAY --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/decrease.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
          opacity: "0.30",
        }}
      />

      {/* Subtle Red Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      {/* Main Content */}
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
          <p className="max-w-sm text-sm text-gray-800">
            मूल्य प्रति किलोग्राम/लिटर, रुपैयाँमा। तुलनाका लागि अघिल्लो दुई अवधिको मूल्य पनि देखाइएको छ।
          </p>
        </div>

        {/* Table Container with Scroll & CUSTOM SCROLLBAR */}
        <div className="mt-10 rounded-3xl border border-[#8B1A1A]/10 bg-white/90 backdrop-blur-md shadow-xl shadow-[#8B1A1A]/5">
          
          {/* Added scrollbar-thin & scrollbar-thumb-red styling */}
          <div className="max-h-[500px] overflow-y-auto rounded-3xl scrollbar-thin scrollbar-thumb-[#8B1A1A] scrollbar-track-transparent">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                
                {/* Sticky Header */}
                <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-[0_4px_12px_-6px_rgba(139,26,26,0.08)]">
                  <tr className="border-b-2 border-[#8B1A1A]/20 bg-[#8B1A1A]/[0.03] text-xs font-bold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-5 font-medium">क्र.सं.</th>
                    <th className="px-6 py-5 font-medium">विवरण — प्रति किलो</th>
                    <th className="px-6 py-5 font-medium">पुरानो मूल्य १</th>
                    <th className="px-6 py-5 font-medium">पुरानो मूल्य २</th>
                    <th className="px-6 py-5 font-medium">हालको मूल्य १</th>
                    <th className="px-6 py-5 font-medium">हालको मूल्य २</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-[#8B1A1A]/10">
                  {prices.map((row) => (
                    <tr 
                      key={row.no} 
                      className="group transition-all duration-200 even:bg-[#8B1A1A]/[0.02] hover:bg-[#8B1A1A]/[0.05]"
                    >
                      <td className="px-6 py-4.5 text-gray-400">{row.no}</td>
                      <td className="px-6 py-4.5 font-medium text-gray-800 group-hover:text-[#8B1A1A] transition-colors">
                        {row.item}
                      </td>
                      <td className="px-6 py-4.5 text-gray-500">{row.old1 ?? "—"}</td>
                      <td className="px-6 py-4.5 text-gray-500">{row.old2 ?? "—"}</td>
                      <td className="px-6 py-4.5 font-display text-lg font-semibold text-[#8B1A1A]">
                        रु {row.current1}
                      </td>
                      <td className="px-6 py-4.5 font-display text-lg font-semibold text-[#8B1A1A]">
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