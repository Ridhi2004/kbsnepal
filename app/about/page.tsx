"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-10 relative overflow-hidden">
      
      {/* --- BACKGROUND GLOWS (Matches your existing theme) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[#8B1A1A]/[0.02] blur-3xl" />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
            हाम्रो बारेमा
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            नेपाल खुद्रा व्यापार संघ
          </h1>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
        </div>

        {/* --- INTRODUCTION CARD --- */}
        <div className="rounded-3xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-[#8B1A1A]/5 sm:p-12">
          
          {/* Optional: If you have an image for this page, uncomment below */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
            <Image
              src="/images/about.jpg"
              alt="नेपाल खुद्रा व्यापार संघ"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-lg prose-gray max-w-none text-gray-700 leading-relaxed">
            <p className="text-[17px]">
              मुलुकको वर्तमान उदार अर्थ व्यवसायमा कुनै पनि उपभोग्य वस्तुको उत्पादक र उपभोक्ताहरु बीच आवश्यक सम्पर्क र माध्यमको रुपमा <strong className="text-[#8B1A1A]">खुद्रा व्यापारीहरुको महत्वपूर्ण स्थान</strong> रहेको छ।
            </p>
            
            <p className="mt-6 text-[17px]">
              सानो पुँजीको लगानी गरेर आफ्नो व्यापार व्यावसायमा लागेका खुद्रा व्यापारीहरुले आज अनेकौं समस्या र कठिनाइहरुको सामना गर्नु परिरहेको छ। तर पनि राष्ट्रको विकास र अर्थतन्त्रमा उनीहरुले <strong className="text-[#8B1A1A]">महत्वपूर्ण भूमिका</strong> खेलेका हुन्छन्।
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-[#8B1A1A]/5 border border-[#8B1A1A]/10">
              <p className="text-[17px] font-medium text-[#8B1A1A] mb-2">📜 हाम्रो मूल मन्त्र</p>
              <p className="text-[17px] text-gray-700 italic">
                "एकताबद्ध र संगठित प्रयत्नबाट मात्र कुनै पनि वर्ग तथा व्यवसायीहरुको हक हितको संरक्षण हुन सक्छ।"
              </p>
            </div>

            <p className="mt-6 text-[17px]">
              यसै मान्यतालाई हृदयंगम गरी <strong className="text-[#8B1A1A]">राष्ट्रिय अर्थतन्त्रमा टेवा</strong> दिई उपभोक्ता-वर्गमा सुलभ सेवा पुर्याउने उद्देश्यले <strong className="text-[#8B1A1A]">२०३६ साल श्रावण ३० गते</strong> यस संस्थाको स्थापना गरिएको हो।
            </p>
          </div>

          {/* --- BOTTOM STATS STRIP --- */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-[#8B1A1A]/10 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B1A1A]">२०३६</div>
              <div className="text-xs font-medium uppercase tracking-wider text-gray-400 mt-1">स्थापना वर्ष</div>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-[#8B1A1A]/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B1A1A]">श्रावण ३०</div>
              <div className="text-xs font-medium uppercase tracking-wider text-gray-400 mt-1">स्थापना दिवस</div>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-[#8B1A1A]/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B1A1A]">४०+</div>
              <div className="text-xs font-medium uppercase tracking-wider text-gray-400 mt-1">वर्षको यात्रा</div>
            </div>
          </div>
        </div>

        {/* --- BACK TO HOME BUTTON --- */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#8B1A1A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8B1A1A]/25 transition-all hover:-translate-y-1 hover:bg-[#a02020] hover:shadow-xl"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            गृह पृष्ठमा फर्कनुहोस्
          </Link>
        </div>

      </div>
    </div>
  );
}