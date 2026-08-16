
// "use client";

// import { useEffect, useRef, useState } from "react";

// type NewsItem = {
//   date: string;
//   tag: string;
//   title: string;
//   excerpt: string;
//   image: string; // Added image URL
// };

// const NEWS: NewsItem[] = [
//   {
//     date: "२५ जुलाई",
//     tag: "छात्रवृत्ति",
//     title: "श्री गंगा बहादुर मानन्धर स्मृति कोष द्वारा संचालित छात्रवृत्ति कार्यक्रम",
//     excerpt: "उपभोक्ताहरुको सबभन्दा नजिक रहि दैनिक उपभोग्य सामाग्रीहरु पुर्‍याउने खुद्रा व्यापारीका सन्तानका लागि छात्रवृत्ति कार्यक्रम।",
//     image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
//   },
//   {
//     date: "२५ जुलाई",
//     tag: "साधारण सभा",
//     title: "नेपाल खुद्रा व्यापार संघ श्री गंगा — वार्षिक साधारण सभा",
//     excerpt: "मुलुकको वर्तमान उदार अर्थ व्यवसायमा उत्पादक र उपभोक्ताहरु बीच आवश्यक सम्पर्क र माध्यमको रुपमा रहेको भूमिकामाथि छलफल।",
//     image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=500&q=80",
//   },
//   {
//     date: "२५ जुलाई",
//     tag: "श्रद्धाञ्जली",
//     title: "१२ औं दिनको पुण्य तिथिमा हार्दिक समवेदना",
//     excerpt: "यस संघको भेग नं. २४ का भेग प्रतिनिधि श्री भरत सत्याल ज्यूको असामयिक देहवसानमा श्रद्धाञ्जली।",
//     image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80",
//   },
//   {
//     date: "२५ जुलाई",
//     tag: "निर्वाचन",
//     title: "भेग प्रतिनिधि छनौट चुनाव सम्बन्धि कार्यक्रम २०७१",
//     excerpt: "भेग प्रतिनिधिको चुनावको समयमा कोहि कसैले पनि अव्यवहारिक क्रियाकलाप नगरी शान्त वातावरणमा भाग लिन आग्रह।",
//     image: "https://images.unsplash.com/photo-1540914124281-342587941389?w=500&q=80",
//   },
//   {
//     date: "१० अगष्ट",
//     tag: "बैठक",
//     title: "नेपाल खुद्रा व्यापार संघको केन्द्रीय कार्यसमिति बैठक",
//     excerpt: "संघको वार्षिक बजेट र आगामी कार्ययोजनाबारे छलफल गर्न केन्द्रीय कार्यसमितिको बैठक आयोजना हुनेछ।",
//     image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80",
//   },
//   {
//     date: "१५ अगष्ट",
//     tag: "प्रशिक्षण",
//     title: "खुद्रा व्यापारीहरुका लागि आधुनिक प्रविधि प्रशिक्षण",
//     excerpt: "डिजिटल भुक्तानी र अनलाइन बजार व्यवस्थापन सम्बन्धी दुई दिने प्रशिक्षण कार्यक्रम।",
//     image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=500&q=80",
//   },
//   {
//     date: "२० अगष्ट",
//     tag: "बजार अवलोकन",
//     title: "उपभोक्ता मूल्य र बजार अवलोकन सम्बन्धी अध्ययन",
//     excerpt: "राजधानीको विभिन्न खुद्रा बजारमा उपभोग्य वस्तुको मूल्य अवस्था सम्बन्धी अध्ययन सुरु।",
//     image: "https://images.unsplash.com/photo-1562569633-622303bafef5?w=500&q=80",
//   },
//   {
//     date: "२५ अगष्ट",
//     tag: "उद्घाटन",
//     title: "नेपाल खुद्रा व्यापार संघको नयाँ भवन उद्घाटन",
//     excerpt: "लामो समयको प्रयासपछि निर्माण सम्पन्न भएको संघको आफ्नै भवनको उद्घाटन कार्यक्रम।",
//     image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
//   },
//   {
//     date: "१ भदौ",
//     tag: "सहकार्य",
//     title: "सहकारी ढाँचामा व्यवसाय थाल्न सुझावपत्र",
//     excerpt: "साना पुँजीका व्यापारीहरुलाई सहकारी ढाँचामा व्यवसाय सञ्चालन गर्ने सम्भावनाबारे जानकारी।",
//     image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80",
//   },
//   {
//     date: "५ भदौ",
//     tag: "स्वास्थ्य शिविर",
//     title: "व्यापारीहरु र उनीहरुका परिवारका लागि नि:शुल्क स्वास्थ्य शिविर",
//     excerpt: "संघको आयोजनामा खुद्रा व्यापारीहरुका लागि नि:शुल्क स्वास्थ्य जाँच तथा औषधि वितरण कार्यक्रम।",
//     image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
//   },
// ];

// export default function News() {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [isPaused, setIsPaused] = useState(false);

//   // Auto-scroll logic (every 3 seconds)
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const scrollStep = () => {
//       if (isPaused) return;

//       const scrollWidth = container.scrollWidth;
//       const clientWidth = container.clientWidth;
//       const currentScroll = container.scrollLeft;

//       // If we have reached the end, smoothly scroll back to the start
//       if (currentScroll + clientWidth >= scrollWidth - 10) {
//         container.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         // Scroll to the next card (roughly 320px per card)
//         container.scrollBy({ left: 320, behavior: "smooth" });
//       }
//     };

//     const intervalId = setInterval(scrollStep, 1000); // 3000ms = 3 seconds

//     return () => clearInterval(intervalId);
//   }, [isPaused]);

//   return (
//     <section id="news" className="relative bg-white py-20 overflow-hidden">
      
//       {/* Subtle Red Background Glows */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
//         <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
//               अपडेट
//             </span>
//             <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
//               जानकारी
//             </h2>
//           </div>
//           <a href="#news" className="text-sm font-semibold text-[#8B1A1A] hover:text-[#a02020] transition-colors">
//             सबै जानकारी हेर्नुहोस् →
//           </a>
//         </div>

//         {/* Horizontal Scroll Container */}
//         <div 
//           className="relative mt-10"
//           onMouseEnter={() => setIsPaused(true)}  // Pause scroll on hover
//           onMouseLeave={() => setIsPaused(false)} // Resume scroll on leave
//         >
//           <div 
//             ref={scrollContainerRef}
//             className="flex overflow-x-auto gap-6 scroll-smooth pb-6 pt-2 px-2 no-scrollbar"
//           >
//             {NEWS.map((item) => (
//               <article
//                 key={item.title}
//                 className="min-w-[300px] flex-1 flex-shrink-0 flex flex-col rounded-2xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-4 shadow-lg shadow-[#8B1A1A]/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#8B1A1A]/25"
//               >
//                 {/* IMAGE SECTION (Top) */}
//                 <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   {/* Date Badge Overlaid on Image */}
//                   <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-600 backdrop-blur-sm shadow-sm">
//                     {item.date}
//                   </span>
//                 </div>

//                 {/* DESCRIPTION SECTION (Bottom) */}
//                 <div className="flex flex-col flex-grow">
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="rounded-full bg-[#8B1A1A]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#8B1A1A]">
//                       {item.tag}
//                     </span>
//                   </div>
                  
//                   <h3 className="font-display text-base font-bold leading-snug text-gray-800 group-hover:text-[#8B1A1A] transition-colors line-clamp-2">
//                     {item.title}
//                   </h3>
                  
//                   <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 flex-grow">
//                     {item.excerpt}
//                   </p>
                  
//                   <a 
//                     href="#news" 
//                     className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8B1A1A] hover:text-[#a02020] transition-colors"
//                   >
//                     थप पढ्नुहोस्
//                     <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
//                   </a>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {/* Gradient Fade Edges (For a premium scrolling look) */}
//           <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
//           <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
//         </div>
//       </div>

//       {/* ADDED: CSS to perfectly hide the scrollbar across all browsers */}
//       <style>{`
//         /* Chrome, Safari, Edge, Opera */
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         /* Firefox, IE, Edge */
//         .no-scrollbar {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: none;  /* Firefox */
//         }
//       `}</style>
//     </section>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// --- DATA STRUCTURE ---
type InfoItem = {
  id: number;
  title: string;
  short_text: string;
  full_content: string;
  image: string;
  image_url: string;
  slug: string;
  preview_content: string;
  word_count: string;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  published_date: string;
  created_at: string;
  updated_at: string;
};

// --- POPUP MODAL COMPONENT ---
function InfoPopup({ 
  item, 
  onClose 
}: { 
  item: InfoItem | null, 
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

  const imageUrl = item.image_url || item.image || "/images/placeholder.jpg";

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
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* --- POPUP IMAGE --- */}
        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6 bg-gray-100">
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/placeholder.jpg";
            }}
          />
          {item.is_featured && (
            <div className="absolute top-3 right-3 bg-[#8B1A1A] text-white text-xs px-2 py-1 rounded-full shadow-md">
              विशेष
            </div>
          )}
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
          {item.view_count !== undefined && (
            <p className="text-xs text-gray-400 mt-1">
              पटक हेरिएको: {item.view_count}
            </p>
          )}
        </div>

        {/* --- POPUP CONTENT --- */}
        <div 
          className="prose prose-sm prose-gray max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ 
            __html: item.full_content || item.preview_content || `<p>${item.short_text}</p>`
          }}
        />

        {/* --- FOOTER BUTTONS --- */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
          >
            बन्द गर्नुहोस्
          </button>
          <Link
            href={`/info/${item.slug || item.id}`}
            onClick={onClose}
            className="rounded-lg bg-[#8B1A1A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#a02020] transition-colors shadow-md text-center"
          >
            थप पढ्नुहोस् →
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function InfoPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InfoItem | null>(null);
  const [infoItems, setInfoItems] = useState<InfoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        
        // Try multiple endpoint variations
        const endpoints = [
          `${baseUrl}/api/info/`,
          `${baseUrl}/api/api/info/`,
          `${baseUrl}/info/`,
          `${baseUrl}/api/v1/info/`,
          `${baseUrl}/api/info`,
          `${baseUrl}/info`,
        ];
        
        let lastError: Error | null = null;
        let successData: InfoItem[] | null = null;
        
        // Try each endpoint until one works
        for (const endpoint of endpoints) {
          try {
            console.log(`Attempting to fetch from: ${endpoint}`);
            
            const response = await fetch(endpoint, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });
            
            if (response.ok) {
              const data: InfoItem[] = await response.json();
              console.log(`Successfully fetched from: ${endpoint}`, data);
              successData = data;
              break;
            } else {
              console.log(`Failed with status ${response.status}: ${endpoint}`);
              lastError = new Error(`HTTP error! status: ${response.status} at ${endpoint}`);
            }
          } catch (err) {
            console.log(`Error fetching from ${endpoint}:`, err);
            lastError = err instanceof Error ? err : new Error(String(err));
          }
        }
        
        if (successData) {
          const publishedItems = successData.filter(item => item.is_published !== false);
          setInfoItems(publishedItems);
          setError(null);
          console.log(`✅ Success! Loaded ${publishedItems.length} items`);
        } else {
          throw lastError || new Error('All endpoints failed');
        }
        
      } catch (err) {
        console.error("Error fetching info:", err);
        setError(err instanceof Error ? err.message : "Failed to load information");
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  // Auto-scroll logic (every 3 seconds)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || infoItems.length === 0) return;

    const scrollStep = () => {
      if (isPaused) return;

      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const currentScroll = container.scrollLeft;

      // If we have reached the end, smoothly scroll back to the start
      if (currentScroll + clientWidth >= scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll to the next card (roughly 320px per card)
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    };

    const intervalId = setInterval(scrollStep, 3000); // 3 seconds

    return () => clearInterval(intervalId);
  }, [isPaused, infoItems.length]);

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-white py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8B1A1A] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading information...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative bg-white py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold">Error loading information: {error}</p>
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

  // No items state
  if (infoItems.length === 0) {
    return (
      <section className="relative bg-white py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700">कुनै जानकारी उपलब्ध छैन</h2>
            <p className="text-gray-500 mt-2">हाल कुनै जानकारी उपलब्ध छैन। कृपया पछि फेरि हेर्नुहोस्।</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="info" className="relative bg-white py-20 overflow-hidden">
      
      {/* Subtle Red Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
              गृह पृष्ठ जानकारी
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              जानकारी
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {infoItems.length} वटा जानकारी उपलब्ध
            </p>
          </div>
          <Link 
            href="/information" 
            className="text-sm font-semibold text-[#8B1A1A] hover:text-[#a02020] transition-colors inline-flex items-center gap-1"
          >
            सबै जानकारी हेर्नुहोस्
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          className="relative mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scroll-smooth pb-6 pt-2 px-2 no-scrollbar"
          >
            {infoItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="min-w-[300px] max-w-[300px] flex-shrink-0 flex flex-col rounded-2xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-4 shadow-lg shadow-[#8B1A1A]/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#8B1A1A]/25 cursor-pointer"
              >
                {/* IMAGE SECTION (Top) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
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
                  {/* Featured Badge Overlaid on Image */}
                  {item.is_featured && (
                    <span className="absolute top-3 right-3 rounded-full bg-[#8B1A1A] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                      विशेष
                    </span>
                  )}
                  {/* Date Badge Overlaid on Image */}
                  {item.published_date && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-600 backdrop-blur-sm shadow-sm">
                      {new Date(item.published_date).toLocaleDateString('ne-NP')}
                    </span>
                  )}
                </div>

                {/* DESCRIPTION SECTION (Bottom) */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-display text-base font-bold leading-snug text-gray-800 group-hover:text-[#8B1A1A] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 flex-grow">
                    {item.preview_content || item.short_text}
                  </p>
                  
                  {/* Click to open popup - this is just a visual indicator */}
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8B1A1A] hover:text-[#a02020] transition-colors">
                    थप पढ्नुहोस्
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Gradient Fade Edges (For a premium scrolling look) */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      {/* --- POPUP MODAL --- */}
      <InfoPopup 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      {/* CSS to perfectly hide the scrollbar across all browsers */}
      <style>{`
        /* Chrome, Safari, Edge, Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Firefox, IE, Edge */
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}