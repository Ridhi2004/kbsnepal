"use client";

import { useState, useEffect } from "react";

// --- DATA STRUCTURE ---
const NOTICES = [
  {
    id: 1,
    title: "नेपाल खुद्रा व्यापार संघका साधारण सदस्यहरुलाई साधारण सभाको सूचना ।",
    date: "२०८१ असार १५",
    fullContent: `
      <p>साधारण सभाको सूचना</p>
      <p>प्रिय साधारण सदस्यहरु,</p>
      <p>नेपाल खुद्रा व्यापार संघको विधानको नियम २९ बमोजिम यस संघको ४७ औं वार्षिक साधारण सभा निम्न मिति, समय र स्थानमा आयोजना हुने भएकोले सम्पूर्ण साधारण सदस्यहरुलाई सहभागी हुन हार्दिक अनुरोध गरिन्छ।</p>
      <p><strong>मिति:</strong> २०८१ असार ३० गते</p>
      <p><strong>समय:</strong> बिहान ११:०० बजे</p>
      <p><strong>स्थान:</strong> संघको कार्यालय, टेकु, काठमाडौं</p>
      <p>कृपया उपस्थित हुनुहुनेछ भन्ने विश्वास छ।</p>
    `,
  },
  {
    id: 2,
    title: "अन्तरक्रिया कार्यक्रम",
    date: "२०८१ असार १०",
    fullContent: `
      <p><strong>अन्तरक्रिया कार्यक्रमको सूचना</strong></p>
      <p>संघको आयोजनामा खुद्रा व्यापारी र उपभोक्ताहरु बीचको सम्बन्ध सुदृढ गर्ने उद्देश्यले एक दिने अन्तरक्रिया कार्यक्रम आयोजना गरिएको छ।</p>
      <p>कार्यक्रममा आफ्नो बहुमूल्य सुझाव र विचार राख्न सम्पूर्ण सदस्यहरुलाई निमन्त्रणा गरिन्छ।</p>
      <p><strong>स्थान:</strong> संघको सभाहल, टेकु</p>
    `,
  },
  {
    id: 3,
    title: "नेपाल खुद्रा व्यापार संघको नव निर्वाचित भेग प्रतिनिधि ज्यूहरु",
    date: "२०८१ जेठ २५",
    fullContent: `
      <p><strong>नव निर्वाचित भेग प्रतिनिधिहरुको नामावली</strong></p>
      <p>सम्पूर्ण सदस्यहरुलाई जानकारी गराइन्छ कि यस संघको हालै सम्पन्न निर्वाचनबाट देहायका ज्यूहरु विभिन्न भेगबाट प्रतिनिधि चुनिनु भएको छ:</p>
      <ul>
        <li>भेग नं. १ - श्री ज्ञानेन्द्र कर्मी</li>
        <li>भेग नं. २० - श्री सुरज होना</li>
        <li>भेग नं. २१ - श्री मनोज श्रेष्ठ, श्री श्याम शंकर डंगोल</li>
        <li>भेग नं. २२ - श्री बिनोद गोर्खाली, श्री पंच नारायण महर्जन</li>
        <li>भेग नं. २३ - श्री ध्रुब अधिकारी, श्री पुष्प मानन्धर</li>
        <li>भेग नं. २४ - श्री धन बहादुर श्रेष्ठ, श्री राजेन्द्र मानन्धर</li>
        <li>भेग नं. २५ - श्री बिष्णु बहादुर श्रेष्ठ, श्री जयराम सापकोटा</li>
        <li>भेग नं. २६ - श्री नवराज शर्मा, श्री रमेश कर्माचाय</li>
        <li>भेग नं. ३३ - श्री धर्मरत्न महर्जन, श्री खेमानन्द न्यौपाने</li>
      </ul>
      <p>सबै नवनिर्वाचित प्रतिनिधि ज्यूहरुलाई हार्दिक बधाई ।</p>
    `,
  },
  {
    id: 4,
    title: "नापतौलका सामाग्रीहरुको अनुमति पत्र दर्ता नविकरण सम्बन्धि जरुरी सूचना",
    date: "२०८१ जेठ १५",
    fullContent: `
      <p><strong>जरुरी सूचना</strong></p>
      <p>यस संघका सम्पूर्ण खुद्रा व्यापारीहरुलाई सूचित गरिन्छ कि नापतौलका सामाग्रीहरुको अनुमति पत्र दर्ता नविकरणको म्याद नजिकिएको छ।</p>
      <p>कृपया आफ्नो नापतौल सामाग्रीहरुको नविकरणका लागि संघको कार्यालयमा सम्पर्क गर्नुहोस् अथवा सम्बन्धित कार्यालयमा गई नविकरण गर्नुहोस्। ढिला गर्दा कानुनी समस्या आउन सक्छ।</p>
    `,
  },
  {
    id: 5,
    title: "नेपाल खुद्रा व्यापार संघको सूचना ।",
    date: "२०८१ जेठ ०१",
    fullContent: `
      <p><strong>संघको सूचना</strong></p>
      <p>नेपाल खुद्रा व्यापार संघले आफ्नो कार्यालय समय नियमित रुपमा सञ्चालन गर्दै आएको छ। कार्यालय समय बिहान १०:०० देखि साँझ ५:०० बजेसम्म रहनेछ।</p>
      <p>कृपया कार्यालय समय भित्र मात्र सम्पर्क गर्नुहोस्।</p>
    `,
  },
  {
    id: 6,
    title: "श्रद्धाञ्जली अर्पण",
    date: "२०८१ बैशाख ३०",
    fullContent: `
      <p><strong>श्रद्धाञ्जली अर्पण</strong></p>
      <p>यस संघको भेग प्रतिनिधि श्री भरत सत्याल ज्यूको असामयिक देहवसानमा नेपाल खुद्रा व्यापार संघ सम्पूर्ण परिवार गहिरो शोकमा छ।</p>
      <p>दिवंगत आत्माको चिरशान्तिको कामना गर्दै शोक सन्तप्त परिवारजनमा हार्दिक समवेदना व्यक्त गरिन्छ।</p>
      <p>प्रभुले उहाँको आत्मालाई शान्ति प्रदान गरुन् ।</p>
    `,
  },
  {
    id: 7,
    title: "उपभोक्ता संरक्षण मस्यौदा विधेयक २०७३ बारे वृहत अन्तरक्रिया कार्यक्रमको सूचना",
    date: "२०८१ बैशाख २५",
    fullContent: `
      <p><strong>अन्तरक्रिया कार्यक्रमको सूचना</strong></p>
      <p>उपभोक्ता संरक्षण मस्यौदा विधेयक २०७३ बारे वृहत अन्तरक्रिया कार्यक्रम आयोजना गरिएको छ।</p>
      <p>कार्यक्रममा मस्यौदा विधेयकका मुख्य प्रावधानहरु र खुद्रा व्यापारीहरुको भूमिका बारे छलफल गरिनेछ।</p>
      <p><strong>स्थान:</strong> संघको कार्यालय सभाहल</p>
      <p><strong>समय:</strong> बिहान ११:०० बजे</p>
    `,
  },
];

// --- POPUP MODAL COMPONENT ---
function NoticePopup({ 
  notice, 
  onClose 
}: { 
  notice: typeof NOTICES[0] | null, 
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
          <span className="mt-1 inline-block text-xs text-gray-400">{notice.date}</span>
        </div>

        {/* --- POPUP CONTENT --- */}
        <div 
          className="prose prose-sm prose-gray max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: notice.fullContent }}
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
  const [selectedNotice, setSelectedNotice] = useState<typeof NOTICES[0] | null>(null);

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
          {NOTICES.map((notice) => (
            <button
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all hover:bg-[#8B1A1A]/5 group"
            >
              <div className="flex flex-col">
                <h3 className="text-base font-medium text-gray-800 group-hover:text-[#8B1A1A] transition-colors">
                  {notice.title}
                </h3>
                <span className="mt-1 text-xs text-gray-400">{notice.date}</span>
              </div>
              
              {/* Open Icon */}
              <div className="shrink-0 rounded-full bg-[#8B1A1A]/10 p-2 text-[#8B1A1A] group-hover:bg-[#8B1A1A] group-hover:text-white transition-all">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* --- POPUP MODAL --- */}
      <NoticePopup 
        notice={selectedNotice} 
        onClose={() => setSelectedNotice(null)} 
      />
    </section>
  );
}