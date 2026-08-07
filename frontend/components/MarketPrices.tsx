type PriceRow = {
  no: number;
  item: string;
  old1: number | null;
  old2: number | null;
  current: number;
};

const PRICES: PriceRow[] = [
  { no: 1, item: "त्रिशुलीको पोखरेली चामल", old1: 75, old2: 70, current: 90 },
  { no: 2, item: "स्टिम जिरामसिनो चामल", old1: 70, old2: null, current: 70 },
  { no: 3, item: "लक्ष ग्रेन वासमती चामल", old1: 130, old2: 120, current: 130 },
  { no: 4, item: "स्टिम सोना चामल", old1: 55, old2: 55, current: 60 },
  { no: 5, item: "ताइचिन चिउरा", old1: 140, old2: 120, current: 130 },
  { no: 6, item: "तराई ताइचिन चिउरा", old1: 60, old2: null, current: 70 },
  { no: 7, item: "मसिनो चामल (स्थानीय)", old1: 85, old2: 80, current: 95 },
  { no: 8, item: "सुन्तला खसीको मासु", old1: 650, old2: 640, current: 680 },
  { no: 9, item: "कालो भेडाको मासु", old1: 750, old2: 730, current: 760 },
  { no: 10, item: "खसीको मासु (लोकल)", old1: 600, old2: 580, current: 620 },
  { no: 11, item: "चना (सुक्खा)", old1: 160, old2: 150, current: 175 },
  { no: 12, item: "मुगीको दाल", old1: 140, old2: 130, current: 155 },
  { no: 13, item: "कागती (लोकल)", old1: 120, old2: 110, current: 140 },
  { no: 14, item: "भेडाको मासु (लोकल)", old1: 850, old2: 820, current: 880 },
  { no: 15, item: "घिउ (पाश्चराइज्ड)", old1: 450, old2: 440, current: 480 },
  { no: 16, item: "कागती (लोकल)", old1: 120, old2: 110, current: 140 },
  { no: 17, item: "भेडाको मासु (लोकल)", old1: 850, old2: 820, current: 880 },
  { no: 18, item: "घिउ (पाश्चराइज्ड)", old1: 450, old2: 440, current: 480 },
];

function trend(row: PriceRow) {
  const reference = row.old2 ?? row.old1;
  if (reference === null) return "same" as const;
  if (row.current > reference) return "up" as const;
  if (row.current < reference) return "down" as const;
  return "same" as const;
}

function TrendBadge({ direction }: { direction: "up" | "down" | "same" }) {
  const styles = {
    up: "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30",
    down: "bg-[#8B1A1A] text-white shadow-sm shadow-[#8B1A1A]/30",
    same: "bg-gray-200 text-gray-500",
  } as const;
  
  const arrow = { up: "▲", down: "▼", same: "–" } as const;
  
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${styles[direction]}`}>
      {arrow[direction]}
    </span>
  );
}

export default function MarketPrices() {
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
            मूल्य प्रति किलोग्राम, रुपैयाँमा। तुलनाका लागि अघिल्लो दुई अवधिको मूल्य पनि देखाइएको छ।
          </p>
        </div>

        {/* Table Container with Scroll & CUSTOM SCROLLBAR */}
        <div className="mt-10 rounded-3xl border border-[#8B1A1A]/10 bg-white/90 backdrop-blur-md shadow-xl shadow-[#8B1A1A]/5">
          
          {/* Added scrollbar-thin & scrollbar-thumb-red styling */}
          <div className="max-h-[500px] overflow-y-auto rounded-3xl scrollbar-thin scrollbar-thumb-[#8B1A1A] scrollbar-track-transparent">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                
                {/* Sticky Header */}
                <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-[0_4px_12px_-6px_rgba(139,26,26,0.08)]">
                  <tr className="border-b-2 border-[#8B1A1A]/20 bg-[#8B1A1A]/[0.03] text-xs font-bold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-5 font-medium">क्र.सं.</th>
                    <th className="px-6 py-5 font-medium">विवरण — प्रति किलो</th>
                    <th className="px-6 py-5 font-medium">पुरानो मूल्य १</th>
                    <th className="px-6 py-5 font-medium">पुरानो मूल्य २</th>
                    <th className="px-6 py-5 font-medium">हालको मूल्य</th>
                    <th className="px-6 py-5 font-medium">प्रवृत्ति</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-[#8B1A1A]/10">
                  {/* REMOVED .slice(0, 10) SO YOU CAN TEST THE SCROLL WITH ALL 15 ITEMS */}
                  {PRICES.map((row) => (
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
                        रु {row.current}
                      </td>
                      <td className="px-6 py-4.5">
                        <TrendBadge direction={trend(row)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}