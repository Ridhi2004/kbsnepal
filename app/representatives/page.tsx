"use client";

import Image from "next/image";

// --- DATA STRUCTURE ---
// I grouped the representatives by Zone (भेग नं.)
const REPRESENTATIVES = [
  {
    zone: "भेग नं. १",
    members: [
      { name: "श्री ज्ञानेन्द्र कर्मी", image: "/images/reps/gyanendra.jpg" },
    ],
  },
  {
    zone: "भेग नं. २०",
    members: [{ name: "श्री सुरज होना", image: "/images/reps/suraj.jpg" }],
  },
  {
    zone: "भेग नं. २१",
    members: [
      { name: "श्री मनोज श्रेष्ठ", image: "/images/reps/manoj.jpg" },
      { name: "श्री श्याम शंकर डंगोल", image: "/images/reps/shyam.jpg" },
    ],
  },
  {
    zone: "भेग नं. २२",
    members: [
      { name: "श्री बिनोद गोर्खाली", image: "/images/reps/binod.jpg" },
      { name: "श्री पंच नारायण महर्जन", image: "/images/reps/pancha.jpg" },
    ],
  },
  {
    zone: "भेग नं. २३",
    members: [
      { name: "श्री ध्रुब अधिकारी", image: "/images/reps/dhruba.jpg" },
      { name: "श्री पुष्प मानन्धर", image: "/images/reps/pushpa.jpg" },
    ],
  },
  {
    zone: "भेग नं. २४",
    members: [
      { name: "श्री धन बहादुर श्रेष्ठ", image: "/images/reps/dhan.jpg" },
      { name: "श्री राजेन्द्र मानन्धर", image: "/images/reps/rajendra.jpg" },
    ],
  },
  {
    zone: "भेग नं. २५",
    members: [
      { name: "श्री बिष्णु बहादुर श्रेष्ठ", image: "/images/reps/bishnu.jpg" },
      { name: "श्री जयराम सापकोटा", image: "/images/reps/jairam.jpg" },
    ],
  },
  {
    zone: "भेग नं. २६",
    members: [
      { name: "श्री नवराज शर्मा", image: "/images/reps/navraj.jpg" },
      { name: "श्री रमेश कर्माचाय", image: "/images/reps/ramesh.jpg" },
    ],
  },
  {
    zone: "भेग नं. ३२",
    members: [],
  },
  {
    zone: "भेग नं. ३३",
    members: [
      { name: "श्री धर्मरत्न महर्जन", image: "/images/reps/dharmaratna.jpg" },
      { name: "श्री खेमानन्द न्यौपाने", image: "/images/reps/khemananda.jpg" },
    ],
  },
];

// --- HELPER: Single Representative Card ---
function RepCard({ name, image }: { name: string; image?: string }) {
  // Fallback initials if image path doesn't exist
  const initials = name
    .replace("श्री ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <div className="flex flex-col items-center rounded-xl border border-[#8B1A1A]/10 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#8B1A1A]/10 bg-gray-100">
        {/* If an image path is provided, it will load. Otherwise it shows initials */}
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-[#8B1A1A]/50">
            {initials}
          </div>
        )}
      </div>
      <h4 className="text-center text-sm font-medium text-gray-800">{name}</h4>
    </div>
  );
}

// --- MAIN SECTION ---
export default function RepresentativesPage() {
  return (
    <section id="representatives" className="relative bg-white py-20 overflow-hidden">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
            क्षेत्रीय प्रतिनिधित्व
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            भेग प्रतिनिधिहरु
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
        </div>

        {/* --- ZONE GRID --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {REPRESENTATIVES.map((zone, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#8B1A1A]/10 bg-white/80 p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Zone Title */}
              <div className="mb-4 flex items-center gap-3 border-b border-[#8B1A1A]/10 pb-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-sm font-bold text-[#8B1A1A]">
                  {index + 1}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#8B1A1A]">
                  {zone.zone}
                </h3>
              </div>

              {/* Members Grid inside the Zone */}
              {zone.members.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {zone.members.map((member, idx) => (
                    <RepCard key={idx} name={member.name} image={member.image} />
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-gray-400 italic">
                  प्रतिनिधि उपलब्ध छैन
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}