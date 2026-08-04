export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-26 md:pb-28 border-b border-gray-100 shadow-sm">

      {/* --- BACKGROUND IMAGE WITH OVERLAY --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          // Replace '/your-bg-pattern.jpg' with your actual image path
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
          opacity: "0.34", // Lowered slightly so it remains subtle on pure white
        }}
      />

      {/* Subtle Decorative Background Glows (Keeping only the faint red tones for depth) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8">

        {/* Left: Message Content */}
        <div className="flex flex-col">
          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8B1A1A]/20 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B1A1A] shadow-sm">
            स्थापना २०३६ साल, श्रावण ३०
          </span>

          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl drop-shadow-sm">
            खुद्रा व्यापारीलाई सहकारी ढाँचामा व्यवसाय थाल्न सुझाव
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-900 md:text-lg text-justify">
            साना पुँजीका खुद्रा व्यापारीहरुको हक हित रक्षा गर्दै, एकताबद्ध र संगठित
            प्रयासबाट उपभोक्तासम्म सुलभ सेवा पुर्‍याउने उद्देश्यले स्थापित संस्था -
            नेपाल खुद्रा व्यापार संघ।
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#about"
              className="rounded-xl bg-[#8B1A1A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8B1A1A]/25 transition-all hover:-translate-y-1 hover:bg-[#a02020] hover:shadow-xl"
            >
              संघको बारेमा जान्नुहोस्
            </a>
            <a
              href="#prices"
              className="rounded-xl border-2 border-[#8B1A1A]/20 bg-white/90 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-[#8B1A1A] transition-all hover:border-[#8B1A1A]/40 hover:bg-white"
            >
              आजको बजार मूल्य हेर्नुहोस्
            </a>
          </div>

          {/* Stats / Badges Row */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-gray-200/60 pt-8">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#8B1A1A] shadow-sm ring-1 ring-[#8B1A1A]/10">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </span>
              <span className="text-sm text-gray-800"><span className="font-semibold text-gray-900">५०+</span> जिल्ला</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#8B1A1A] shadow-sm ring-1 ring-[#8B1A1A]/10">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </span>
              <span className="text-sm text-gray-800"><span className="font-semibold text-gray-900">१०,०००+</span> सदस्य</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#8B1A1A] shadow-sm ring-1 ring-[#8B1A1A]/10">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              <span className="text-sm text-gray-800"><span className="font-semibold text-gray-900">४०+</span> वर्षको यात्रा</span>
            </div>
          </div>
        </div>

        {/* Right: Balance Scale */}
        <div className="relative flex items-center justify-center py-6">
          <div
            className="absolute h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(139,26,26,0.2), transparent 70%)" }}
          />
          <div className="absolute bottom-6 h-6 w-40 rounded-full bg-[#8B1A1A]/10 blur-xl" />

          <svg
            viewBox="0 0 340 430"
            className="relative h-auto w-full max-w-[300px] sm:max-w-[340px] drop-shadow-2xl"
            fill="none"
          >
            <defs>
              <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c23a3a" />
                <stop offset="45%" stopColor="#8B1A1A" />
                <stop offset="100%" stopColor="#5e0f0f" />
              </linearGradient>
              <linearGradient id="metalH" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5e0f0f" />
                <stop offset="50%" stopColor="#c23a3a" />
                <stop offset="100%" stopColor="#5e0f0f" />
              </linearGradient>
              <radialGradient id="knob" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#e07a7a" />
                <stop offset="55%" stopColor="#8B1A1A" />
                <stop offset="100%" stopColor="#5e0f0f" />
              </radialGradient>
              <linearGradient id="panMetal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B1A1A" />
                <stop offset="100%" stopColor="#5e0f0f" />
              </linearGradient>
            </defs>

            {/* graduation arc */}
            <path
              d="M 55 132 A 115 115 0 0 1 285 132"
              stroke="#8B1A1A"
              strokeOpacity="0.15"
              strokeWidth="1"
              strokeDasharray="2 7"
            />

            {/* ground shadow */}
            <ellipse cx="170" cy="404" rx="70" ry="7" fill="#8B1A1A" opacity="0.12" />

            {/* pedestal base */}
            <path d="M112 392 L228 392 L206 402 L134 402 Z" fill="url(#metal)" />
            <rect x="108" y="384" width="124" height="10" rx="3" fill="url(#metalH)" />
            <rect x="150" y="376" width="40" height="10" rx="2" fill="url(#metalH)" />

            {/* pole with reeded highlight */}
            <rect x="163" y="128" width="14" height="250" rx="3" fill="url(#metalH)" />
            <rect x="168.5" y="128" width="3" height="250" fill="#e59a9a" opacity="0.5" />

            {/* pivot housing + finial */}
            <circle cx="170" cy="112" r="11" fill="url(#knob)" stroke="#5e0f0f" strokeWidth="1" />
            <circle cx="170" cy="112" r="3.5" fill="#fbe9e9" />
            <path d="M164 101 Q170 90 176 101 Z" fill="url(#metal)" />

            {/* beam group — gently animated around the pivot */}
            <g className="origin-[170px_120px] animate-[sway_4.5s_ease-in-out_infinite]">
              <rect x="55" y="117" width="230" height="6" rx="3" fill="url(#metalH)" />
              <rect x="55" y="117.5" width="230" height="1.5" fill="#e59a9a" opacity="0.5" />
              <circle cx="60" cy="120" r="7" fill="url(#knob)" />
              <circle cx="280" cy="120" r="7" fill="url(#knob)" />

              {/* left pan + beaded chains */}
              <line x1="60" y1="120" x2="30" y2="206" stroke="#8B1A1A" strokeWidth="1.5" />
              <line x1="60" y1="120" x2="90" y2="206" stroke="#8B1A1A" strokeWidth="1.5" />
              <circle cx="45" cy="163" r="2" fill="#8B1A1A" />
              <circle cx="75" cy="163" r="2" fill="#8B1A1A" />
              <path
                d="M14 206 Q60 246 106 206 L100 214 Q60 250 20 214 Z"
                fill="url(#panMetal)"
              />
              <ellipse cx="60" cy="206" rx="46" ry="9" fill="none" stroke="#e59a9a" strokeWidth="1.5" opacity="0.7" />
              <circle cx="46" cy="198" r="3.5" fill="#8B1A1A" fillOpacity="0.6" />
              <circle cx="60" cy="194" r="3.5" fill="#8B1A1A" fillOpacity="0.6" />
              <circle cx="74" cy="198" r="3.5" fill="#8B1A1A" fillOpacity="0.6" />

              {/* right pan + beaded chains */}
              <line x1="280" y1="120" x2="250" y2="206" stroke="#8B1A1A" strokeWidth="1.5" />
              <line x1="280" y1="120" x2="310" y2="206" stroke="#8B1A1A" strokeWidth="1.5" />
              <circle cx="265" cy="163" r="2" fill="#8B1A1A" />
              <circle cx="295" cy="163" r="2" fill="#8B1A1A" />
              <path
                d="M234 206 Q280 246 326 206 L320 214 Q280 250 240 214 Z"
                fill="url(#panMetal)"
              />
              <ellipse cx="280" cy="206" rx="46" ry="9" fill="none" stroke="#e59a9a" strokeWidth="1.5" opacity="0.7" />
              <circle cx="266" cy="198" r="3.5" fill="#8B1A1A" fillOpacity="0.6" />
              <circle cx="280" cy="194" r="3.5" fill="#8B1A1A" fillOpacity="0.6" />
              <circle cx="294" cy="198" r="3.5" fill="#8B1A1A" fillOpacity="0.6" />
            </g>
          </svg>

          <style>{`
            @keyframes sway {
              0%, 100% { transform: rotate(-2.5deg); }
              50% { transform: rotate(2.5deg); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}