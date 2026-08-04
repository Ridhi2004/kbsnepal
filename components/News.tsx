
"use client";

import { useEffect, useRef, useState } from "react";

type NewsItem = {
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string; // Added image URL
};

const NEWS: NewsItem[] = [
  {
    date: "२५ जुलाई",
    tag: "छात्रवृत्ति",
    title: "श्री गंगा बहादुर मानन्धर स्मृति कोष द्वारा संचालित छात्रवृत्ति कार्यक्रम",
    excerpt: "उपभोक्ताहरुको सबभन्दा नजिक रहि दैनिक उपभोग्य सामाग्रीहरु पुर्‍याउने खुद्रा व्यापारीका सन्तानका लागि छात्रवृत्ति कार्यक्रम।",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
  },
  {
    date: "२५ जुलाई",
    tag: "साधारण सभा",
    title: "नेपाल खुद्रा व्यापार संघ श्री गंगा — वार्षिक साधारण सभा",
    excerpt: "मुलुकको वर्तमान उदार अर्थ व्यवसायमा उत्पादक र उपभोक्ताहरु बीच आवश्यक सम्पर्क र माध्यमको रुपमा रहेको भूमिकामाथि छलफल।",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=500&q=80",
  },
  {
    date: "२५ जुलाई",
    tag: "श्रद्धाञ्जली",
    title: "१२ औं दिनको पुण्य तिथिमा हार्दिक समवेदना",
    excerpt: "यस संघको भेग नं. २४ का भेग प्रतिनिधि श्री भरत सत्याल ज्यूको असामयिक देहवसानमा श्रद्धाञ्जली।",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80",
  },
  {
    date: "२५ जुलाई",
    tag: "निर्वाचन",
    title: "भेग प्रतिनिधि छनौट चुनाव सम्बन्धि कार्यक्रम २०७१",
    excerpt: "भेग प्रतिनिधिको चुनावको समयमा कोहि कसैले पनि अव्यवहारिक क्रियाकलाप नगरी शान्त वातावरणमा भाग लिन आग्रह।",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?w=500&q=80",
  },
  {
    date: "१० अगष्ट",
    tag: "बैठक",
    title: "नेपाल खुद्रा व्यापार संघको केन्द्रीय कार्यसमिति बैठक",
    excerpt: "संघको वार्षिक बजेट र आगामी कार्ययोजनाबारे छलफल गर्न केन्द्रीय कार्यसमितिको बैठक आयोजना हुनेछ।",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80",
  },
  {
    date: "१५ अगष्ट",
    tag: "प्रशिक्षण",
    title: "खुद्रा व्यापारीहरुका लागि आधुनिक प्रविधि प्रशिक्षण",
    excerpt: "डिजिटल भुक्तानी र अनलाइन बजार व्यवस्थापन सम्बन्धी दुई दिने प्रशिक्षण कार्यक्रम।",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=500&q=80",
  },
  {
    date: "२० अगष्ट",
    tag: "बजार अवलोकन",
    title: "उपभोक्ता मूल्य र बजार अवलोकन सम्बन्धी अध्ययन",
    excerpt: "राजधानीको विभिन्न खुद्रा बजारमा उपभोग्य वस्तुको मूल्य अवस्था सम्बन्धी अध्ययन सुरु।",
    image: "https://images.unsplash.com/photo-1562569633-622303bafef5?w=500&q=80",
  },
  {
    date: "२५ अगष्ट",
    tag: "उद्घाटन",
    title: "नेपाल खुद्रा व्यापार संघको नयाँ भवन उद्घाटन",
    excerpt: "लामो समयको प्रयासपछि निर्माण सम्पन्न भएको संघको आफ्नै भवनको उद्घाटन कार्यक्रम।",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
  },
  {
    date: "१ भदौ",
    tag: "सहकार्य",
    title: "सहकारी ढाँचामा व्यवसाय थाल्न सुझावपत्र",
    excerpt: "साना पुँजीका व्यापारीहरुलाई सहकारी ढाँचामा व्यवसाय सञ्चालन गर्ने सम्भावनाबारे जानकारी।",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80",
  },
  {
    date: "५ भदौ",
    tag: "स्वास्थ्य शिविर",
    title: "व्यापारीहरु र उनीहरुका परिवारका लागि नि:शुल्क स्वास्थ्य शिविर",
    excerpt: "संघको आयोजनामा खुद्रा व्यापारीहरुका लागि नि:शुल्क स्वास्थ्य जाँच तथा औषधि वितरण कार्यक्रम।",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
  },
];

export default function News() {
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

      // If we have reached the end, smoothly scroll back to the start
      if (currentScroll + clientWidth >= scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll to the next card (roughly 320px per card)
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    };

    const intervalId = setInterval(scrollStep, 1000); // 3000ms = 3 seconds

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section id="news" className="relative bg-white py-20 overflow-hidden">
      
      {/* Subtle Red Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
              अपडेट
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              जानकारी
            </h2>
          </div>
          <a href="#news" className="text-sm font-semibold text-[#8B1A1A] hover:text-[#a02020] transition-colors">
            सबै जानकारी हेर्नुहोस् →
          </a>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          className="relative mt-10"
          onMouseEnter={() => setIsPaused(true)}  // Pause scroll on hover
          onMouseLeave={() => setIsPaused(false)} // Resume scroll on leave
        >
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 scroll-smooth pb-6 pt-2 px-2 no-scrollbar"
          >
            {NEWS.map((item) => (
              <article
                key={item.title}
                className="min-w-[300px] flex-1 flex-shrink-0 flex flex-col rounded-2xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-4 shadow-lg shadow-[#8B1A1A]/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#8B1A1A]/25"
              >
                {/* IMAGE SECTION (Top) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Date Badge Overlaid on Image */}
                  <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-gray-600 backdrop-blur-sm shadow-sm">
                    {item.date}
                  </span>
                </div>

                {/* DESCRIPTION SECTION (Bottom) */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-[#8B1A1A]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#8B1A1A]">
                      {item.tag}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-base font-bold leading-snug text-gray-800 group-hover:text-[#8B1A1A] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 flex-grow">
                    {item.excerpt}
                  </p>
                  
                  <a 
                    href="#news" 
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8B1A1A] hover:text-[#a02020] transition-colors"
                  >
                    थप पढ्नुहोस्
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Gradient Fade Edges (For a premium scrolling look) */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ADDED: CSS to perfectly hide the scrollbar across all browsers */}
      <style>{`
        /* Chrome, Safari, Edge, Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Firefox, IE, Edge */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}