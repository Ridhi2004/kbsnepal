export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      {/* Subtle Red Glows (Kept only for minimal depth, no gradient colors) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.6fr_0.4fr] lg:gap-16">
        {/* Left: text */}
        <div>
          
            <span className="inline-flex w-fit items-center rounded-full border border-[#8B1A1A]/20 bg-[#8B1A1A]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B1A1A]">
            हाम्रो बारेमा
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[#8B1A1A] sm:text-4xl">
            नेपाल खुद्रा व्यापार संघ
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-800 text-justify">
            मुलुकको वर्तमान उदार अर्थ व्यवसायमा कुनै पनि उपभोग्य वस्तुको उत्पादक
            र उपभोक्ताहरु बीच आवश्यक सम्पर्क र माध्यमको रुपमा खुद्रा
            व्यापारीउरुको महत्वपूर्ण स्थान रहेको छ। सानो पुँजीको लगानी गरेर
            आफ्नो व्यापार व्यवसायमा लागेका खुद्रा व्यापारीहरुले आज अनेकौ समस्या
            र कठिनाइहरुको सामना गर्नु परिरहेको छ।
          </p>
          <p className="mt-5 mb-4 text-base leading-8 text-gray-800 text-justify">
            तर पनि राष्ट्रको विकास र अर्थतन्त्रमा उनीहरुले महत्वपूर्ण भूमिका
            खेलेका हुन्छन्। एकताबद्ध र संगठित प्रयत्नबाट मात्र कुनैपनि वर्ग तथा
            व्यवसायीहरुको हक हितको संरक्षण हुन सक्छ भन्ने मान्यतालाई हृदयंगम गरी
            राष्ट्रिय अर्थतन्त्रमा टेवा दिई उपभोक्ता-वर्गमा सुलभ सेवा पुर्‍याउने
            उद्देश्यले २०३६ साल श्रावण ३० गते यस संस्थाको स्थापना गरिएको हो।
          </p>

          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl bg-[#8B1A1A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8B1A1A]/25 transition-all hover:-translate-y-1 hover:bg-[#a02020] hover:shadow-xl"
          >
            बाँकी पढ्नुहोस्
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 10h12M12 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Right: bordered card — year numeral up top, each stat its own boxed row below */}
        <div className="relative overflow-hidden rounded-2xl border border-[#8B1A1A]/80 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]">
          {/* Replaced gradient strip with a solid red accent strip */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[#8B1A1A]" />

          <span className="inline-flex w-fit items-center rounded-full border border-[#8B1A1A]/20 bg-[#8B1A1A]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B1A1A]">
            एक नजरमा
          </span>

          <div className="mt-5 flex flex-col">
            <span
              className="font-display text-[92px] font-bold leading-none text-transparent sm:text-[104px]"
              style={{ WebkitTextStroke: "1.5px #8B1A1A", opacity: 0.85 }}
            >
              २०३६
            </span>
            <span className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
              स्थापना वर्ष
            </span>
          </div>

          <div className="mt-8 space-y-3 border-t border-gray-100 pt-2">
            {[
              {
                label: "जिल्लामा उपस्थिति",
                value: "५०+",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                ),
              },
              {
                label: "सदस्य व्यापारी",
                value: "१०,०००+",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                ),
              },
              {
                label: "वर्षको यात्रा",
                value: "४०+",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                ),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all hover:border-[#8B1A1A]/80 hover:bg-[#8B1A1A]/[0.02] hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#8B1A1A] shadow-sm ring-1 ring-[#8B1A1A]/10">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {stat.icon}
                    </svg>
                  </span>
                  <span className="text-sm text-gray-800">{stat.label}</span>
                </div>
                <span className="font-display text-lg font-semibold text-[#8B1A1A]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}