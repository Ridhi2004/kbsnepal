"use client";

import Image from "next/image";
import { FaPhone, FaMobileAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// --- DATA STRUCTURE ---
// Complete data from the provided list
const REPRESENTATIVES = [
  {
    zone: "भेग नं. १",
    members: [
      { 
        name: "मुक्ति पोखरेल ", 
        address: "सोह्रखुट्टे",
        telephone: "4361220",
        mobile: "9841603975",
        image: "/images/reps/mukta.jpg" 
      },
      { 
        name: "रत्न काजी श्रेष्ठ ", 
        address: "सोह्रखुट्टे",
        telephone: "4361220",
        mobile: "9843694525",
        image: "/images/reps/ral.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २",
    members: [
      { 
        name: "भवीश्वर भुसाल", 
        address: "ठमेल ",
        telephone: "4421130",
        mobile: "9841913449",
        image: "/images/reps/bhovanwar.jpg" 
      },
      { 
        name: "रोशन श्रेष्ठ", 
        address: " गल्कोपाखा",
        telephone: "4421130",
        mobile: "9841207963",
        image: "/images/reps/roshan.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ३",
    members: [
      { 
        name: "बाबुकाजी मानन्धर", 
        address: "पानीपोखरी ",
        telephone: "4419197",
        mobile: "9851049036",
        image: "/images/reps/babukaji.jpg" 
      },
      { 
        name: "दिनेश तुलाधार", 
        address: "लाजिम्पाट",
        telephone: "4419197",
        mobile: "9851051158",
        image: "/images/reps/dinesh.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ४",
    members: [
      { 
        name: "द्वारीका दाश कारजीत", 
        address: "ज्ञानेश्वर",
        telephone: "4415922",
        mobile: "9841211982",
        image: "/images/reps/dwarika.jpg" 
      },
      { 
        name: " प्रगम मानन्धर", 
        address: "कमलपोखरी",
        telephone: "4424556",
        mobile: "9841265111",
        image: "/images/reps/karjeet.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ५",
    members: [
      { 
        name: "राजेन्द्र महर्जन", 
        address: "डिल्लीबजार",
        telephone: "",
        mobile: "9849169495",
        image: "/images/reps/rajendra_mahajan.jpg" 
      },
      { 
        name: "रामचन्द्र श्रेष्ठ", 
        address: "डिल्लीबजार",
        telephone: "",
        mobile: "9841631384",
        image: "/images/reps/ramchandra.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ६",
    members: [
      { 
        name: "रुप नारायण तिमिल्सिना ", 
        address: "कालिमाटी ",
        telephone: "",
        mobile: "9851124840",
        image: "/images/reps/rup.jpg" 
      },
      { 
        name: "आर्बेस  श्रेष्ठ", 
        address: "टंकेश्वर",
        telephone: "",
        mobile: "9841412247",
        image: "/images/reps/abesh.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ७",
    members: [
      { 
        name: "रामकृष्ण मानन्धर", 
        address: "विजयेश्वरी ",
        telephone: "4280083",
        mobile: "9841241492",
        image: "/images/reps/ramkrishna.jpg" 
      },
      { 
        name: "रविन्द्र श्रेष्ठ", 
        address: " हलचोक अगाडि",
        telephone: "4301342",
        mobile: "9849092597",
        image: "/images/reps/rabin.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ८",
    members: [
      { 
        name: "सानु राजा मध्यम", 
        address: "क्षेत्रपाटी",
        telephone: "4825512450",
        mobile: "9841914956",
        image: "/images/reps/sanu.jpg" 
      },
      { 
        name: "श्याम मानन्हर", 
        address: "क्षेत्रपाटी",
        telephone: "4821914956",
        mobile: "9841914956",
        image: "/images/reps/shyam_manandhar.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ९",
    members: [
      { 
        name: "जयराम श्रेष्ठ", 
        address: "किलागल",
        telephone: "9843915976",
        mobile: "9841914956",
        image: "/images/reps/jairam_shrestha.jpg" 
      },
      { 
        name: "रामकृष्ण मानन्हर", 
        address: "नरदेवी",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/ramkrishna_manandhar.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. १०",
    members: [
      { 
        name: "शिव ढगाल", 
        address: "मर चिकमुगल",
        telephone: "4823520372",
        mobile: "9841914956",
        image: "/images/reps/shiv.jpg" 
      },
      { 
        name: "साधारम मानन्हर", 
        address: "मर चिकमुगल",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/sadharam.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ११",
    members: [
      { 
        name: "रामकृष्ण प्रधान", 
        address: "यमाल",
        telephone: "4825612451",
        mobile: "9841914956",
        image: "/images/reps/ramkrishna_pradhan.jpg" 
      },
      { 
        name: "सुधान रजीत", 
        address: "मजिपाट",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/sudhan.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. १२",
    members: [
      { 
        name: "दिपक रल तुल्याद", 
        address: "अवसन",
        telephone: "482565005",
        mobile: "9841914956",
        image: "/images/reps/dipak.jpg" 
      },
      { 
        name: "हिरा काजी महजन", 
        address: "अवसन",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/hira.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. १३",
    members: [
      { 
        name: "महेश्वर लाल श्रेष्ठ", 
        address: "ठोही ज्याठा",
        telephone: "482602357",
        mobile: "9841914956",
        image: "/images/reps/maheshwar.jpg" 
      },
      { 
        name: "श्याम कृष्ण मानन्हर", 
        address: "ठोही ज्याठा",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/shyam_krishna.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. १४",
    members: [
      { 
        name: "चैत्य रल मानन्हर", 
        address: "बट आमबहाल",
        telephone: "482632357",
        mobile: "9841914956",
        image: "/images/reps/chaitya.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. १५",
    members: [
      { 
        name: "दिनेश महजन", 
        address: "अमबहाल",
        telephone: "482632357",
        mobile: "9841914956",
        image: "/images/reps/dinesh_mahajan.jpg" 
      },
      { 
        name: "रोशन शाही", 
        address: "अमबहाल",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/roshan_shahi.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. १६",
    members: [
      { 
        name: "राजु मास्के", 
        address: "भिमसेनस्थान",
        telephone: "482632357",
        mobile: "9841914956",
        image: "/images/reps/raju.jpg" 
      },
    ],
  },
  // Second table data (these appear to be additional representatives)
  {
    zone: "भेग नं. १७",
    members: [
      { 
        name: "सन्य मानन्हर", 
        address: "",
        telephone: "9841603915",
        mobile: "9841603915",
        image: "/images/reps/sanya.jpg" 
      },
      { 
        name: "चन्द्र कृष्ण या श्रेष्ठ", 
        address: "",
        telephone: "9841603915",
        mobile: "9841603915",
        image: "/images/reps/chandra.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. १८",
    members: [
      { 
        name: "भरत देव जोशी", 
        address: "",
        telephone: "9841913449",
        mobile: "9841913449",
        image: "/images/reps/bharat.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. १९",
    members: [
      { 
        name: "सरज होना", 
        address: "",
        telephone: "9841014956",
        mobile: "9841014956",
        image: "/images/reps/saraj.jpg" 
      },
      { 
        name: "पारस मानन्हर", 
        address: "",
        telephone: "9841014956",
        mobile: "9841014956",
        image: "/images/reps/paras.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २०",
    members: [
      { 
        name: "मनोज श्रेष्ठ", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/manoj_shrestha.jpg" 
      },
      { 
        name: "श्याम शकर ढंगोल", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/shyam_shankar.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २१",
    members: [
      { 
        name: "बिना पाखाली", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/bina.jpg" 
      },
      { 
        name: "पच नारायण महजन", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/pach.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २२",
    members: [
      { 
        name: "पुष्प मानन्हर", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/pushpa_manandhar.jpg" 
      },
      { 
        name: "अलिको जोशी", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/aliko.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २३",
    members: [
      { 
        name: "धन बहादुर श्रेष्ठ", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/dhan_bahadur.jpg" 
      },
      { 
        name: "राजेन्द्र मानन्हर", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/rajendra_manandhar.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २४",
    members: [
      { 
        name: "जयराम सापकोटा", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/jairam_sapkota.jpg" 
      },
      { 
        name: "विष्णु बहादुर श्रेष्ठ", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/bishnu_bahadur.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २५",
    members: [
      { 
        name: "नवराज शर्मा", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/navaraj.jpg" 
      },
      { 
        name: "रमेश कर्मचार्य", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/ramesh_karmacharya.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २६",
    members: [
      { 
        name: "जयवेद श्रेष्ठ", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/jayabed.jpg" 
      },
      { 
        name: "दिपन लाल मुनकर्मी", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/deepan.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २७",
    members: [
      { 
        name: "हरिचन्द्र श्रेष्ठ", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/harichandra.jpg" 
      },
      { 
        name: "श्याम लाल श्रेष्ठ", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/shyam_lal.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २८",
    members: [
      { 
        name: "बाबुराम महजन", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/baburam.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. २९",
    members: [
      { 
        name: "राजेन्द्र गुरुङ्ग", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/rajendra_gurung.jpg" 
      },
      { 
        name: "मोहनराज श्रेष्ठ", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/mohanraj.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ३०",
    members: [
      { 
        name: "महेश थापलिया", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/mahesh_thapliya.jpg" 
      },
      { 
        name: "प्रेम राज श्रेष्ठ", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/prem_raj.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ३१",
    members: [
      { 
        name: "विश्व महोत्सव", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/bishwa.jpg" 
      },
      { 
        name: "कृष्णमान महजन", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/krishnaman.jpg" 
      },
    ],
  },
  {
    zone: "भेग नं. ३२",
    members: [
      { 
        name: "दिनेश न्यापान", 
        address: "",
        telephone: "9841914956",
        mobile: "9841914956",
        image: "/images/reps/dinesh_nyapan.jpg" 
      },
    ],
  },
];

// --- HELPER: Single Representative Card ---
function RepCard({ 
  name, 
  address, 
  telephone, 
  mobile,
  image 
}: { 
  name: string; 
  address?: string; 
  telephone?: string; 
  mobile?: string;
  image?: string;
}) {
  // Fallback initials if image path doesn't exist
  const initials = name
    .replace("श्री ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <div className="flex flex-col rounded-xl border border-[#8B1A1A]/10 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#8B1A1A]/10 bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-[#8B1A1A]/50">
              {initials}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-800 truncate">{name}</h4>
          {address && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MdLocationOn className="w-3 h-3 shrink-0" />
              <span className="truncate">{address}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-1 text-xs border-t border-gray-100 pt-2">
        {telephone && (
          <div className="flex items-center gap-2">
            <FaPhone className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-600 font-mono">{telephone}</span>
          </div>
        )}
        {mobile && (
          <div className="flex items-center gap-2">
            <FaMobileAlt className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-600 font-mono">{mobile}</span>
          </div>
        )}
      </div>
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {REPRESENTATIVES.map((zone, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#8B1A1A]/10 bg-white/80 p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Zone Title */}
              <div className="mb-3 flex items-center gap-3 border-b border-[#8B1A1A]/10 pb-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-sm font-bold text-[#8B1A1A]">
                  {index + 1}
                </span>
                <h3 className="font-display text-base font-semibold text-[#8B1A1A]">
                  {zone.zone}
                </h3>
              </div>

              {/* Members Grid inside the Zone */}
              {zone.members.length > 0 ? (
                <div className="space-y-3">
                  {zone.members.map((member, idx) => (
                    <RepCard 
                      key={idx} 
                      name={member.name} 
                      address={member.address}
                      telephone={member.telephone}
                      mobile={member.mobile}
                      image={member.image} 
                    />
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