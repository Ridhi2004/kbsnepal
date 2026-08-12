// "use client";

// import Image from "next/image";

// // --- COMMITTEE DATA ---
// // Add the image path (e.g., "/images/president.jpg") for each person.
// // If an image is missing, it will automatically show their initials.
// const COMMITTEE_MEMBERS = [
//   {
//     name: "Pabitra Bajracharya",
//     role: "President",
//     phone: "9851032771",
//     image: "/images/committee/pabitra.jpg", // <-- Replace with your image path
//   },
//   {
//     name: "Naresh Babu Shahi",
//     role: "Vice President",
//     phone: "9841546689",
//     image: "/images/committee/naresh.jpg",
//   },
//   {
//     name: "Amul Kaji Tuladhar",
//     role: "General Secretary",
//     phone: "9841297568",
//     image: "/images/committee/amul.jpg",
//   },
//   {
//     name: "Raju Maskey",
//     role: "Secretary",
//     phone: "9841235403",
//     image: "/images/committee/raju.jpg",
//   },
//   {
//     name: "Basanta Shrestha",
//     role: "Treasurer",
//     phone: "9840385385",
//     image: "/images/committee/basanta.jpg",
//   },
//   {
//     name: "Dhruba Prasad Adhikari",
//     role: "Join Treasure",
//     phone: "9849352197",
//     image: "/images/committee/dhruba.jpg",
//   },
//   {
//     name: "Shiva Dangol",
//     role: "Exe. Member",
//     phone: "9841460421",
//     image: "/images/committee/shiva.jpg",
//   },
//   {
//     name: "Suraj Hona",
//     role: "Exe. Member",
//     phone: "9841346338",
//     image: "/images/committee/suraj.jpg",
//   },
//   {
//     name: "Dinesh Udash Tuladhar",
//     role: "Exe. Member",
//     phone: null,
//     image: "/images/committee/dinesh.jpg",
//   },
//   {
//     name: "Birandra singh",
//     role: "Exe. Member",
//     phone: "9841244331",
//     image: "/images/committee/birandra.jpg",
//   },
//   {
//     name: "Prem Bahadur Shrestha",
//     role: "Exe. Member",
//     phone: "9851023370",
//     image: "/images/committee/prem.jpg",
//   },
//   {
//     name: "Roshan Shahi",
//     role: "Exe. Member",
//     phone: null,
//     image: "/images/committee/roshan.jpg",
//   },
//   {
//     name: "Devendra Bhakta Shrestha",
//     role: "Working Committee Advisor",
//     phone: "9851026125",
//     image: "/images/committee/devendra.jpg",
//   },
//   {
//     name: "Ramesh (Narayan) Maharjan",
//     role: "Working Committee Advisor",
//     phone: "9841223690",
//     image: "/images/committee/ramesh.jpg",
//   },
//   {
//     name: "Rajendra Krishna Shrestha",
//     role: "Working Committee Advisor",
//     phone: null,
//     image: "/images/committee/rajendra.jpg",
//   },
//   {
//     name: "JYOTI THAPA",
//     role: "STAFF",
//     phone: "9841282691",
//     image: "/images/committee/jyoti.jpg",
//   },
// ];

// // --- HELPER COMPONENT: Single Committee Card ---
// function CommitteeCard({ member }: { member: typeof COMMITTEE_MEMBERS[0] }) {
//   // Get initials for fallback if image is missing or fails to load
//   const initials = member.name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .substring(0, 2)
//     .toUpperCase();

//   return (
//     <div className="group relative flex flex-col items-center rounded-2xl border border-[#8B1A1A]/10 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#8B1A1A]/25">
      
//       {/* --- IMAGE AREA --- */}
//       <div className="relative mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-[#8B1A1A]/10 transition-all group-hover:ring-[#8B1A1A]/30">
//         {/* If you want to use a fallback placeholder, this handles it gracefully */}
//         <Image
//           src={member.image || "/images/placeholder-avatar.png"}
//           alt={member.name}
//           fill
//           sizes="96px"
//           className="object-cover"
//         />
//       </div>

//       {/* --- NAME & ROLE --- */}
//       <h3 className="text-center font-display text-lg font-bold text-gray-800">
//         {member.name}
//       </h3>
//       <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#8B1A1A] mt-1">
//         {member.role}
//       </p>

//       {/* --- PHONE NUMBER --- */}
//       {member.phone && (
//         <a
//           href={`tel:${member.phone}`}
//           className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#8B1A1A]/5 px-4 py-1.5 text-sm font-medium text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A] hover:text-white"
//         >
//           <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
//           {member.phone}
//         </a>
//       )}
//     </div>
//   );
// }

// // --- MAIN PAGE COMPONENT ---
// export default function CommitteePage() {
//   return (
//     <section id="committee" className="relative bg-white py-20 overflow-hidden">
      
//       {/* --- BACKGROUND GLOWS (Matches your theme) --- */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
//         <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col items-center text-center mb-12">
//           <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
//             कार्यसमिति
//           </span>
//           <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
//             पदाधिकारीहरु
//           </h2>
//           <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
//           <p className="mt-4 max-w-2xl text-gray-500 text-sm">
//             नेपाल खुद्रा व्यापार संघको समर्पित कार्यसमिति सदस्यहरू।
//           </p>
//         </div>

//         {/* --- COMMITTEE GRID --- */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {COMMITTEE_MEMBERS.map((member, index) => (
//             <CommitteeCard key={index} member={member} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// --- TYPES ---
interface BodMember {
  id: number;
  name: string;
  role: string;
  phone: string | null;
  image: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

// --- HELPER COMPONENT: Single Committee Card ---
function CommitteeCard({ member }: { member: BodMember }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="group relative flex flex-col items-center rounded-2xl border border-[#8B1A1A]/10 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:border-[#8B1A1A]/25">
      {/* --- IMAGE AREA --- */}
      <div className="relative mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-[#8B1A1A]/10 transition-all group-hover:ring-[#8B1A1A]/30">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#8B1A1A]/10 text-lg font-bold text-[#8B1A1A]">
            {initials}
          </div>
        )}
      </div>

      {/* --- NAME & ROLE --- */}
      <h3 className="text-center font-display text-lg font-bold text-gray-800">
        {member.name}
      </h3>
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#8B1A1A] mt-1">
        {member.role}
      </p>

      {/* --- PHONE NUMBER --- */}
      {member.phone && (
        <a
          href={`tel:${member.phone}`}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#8B1A1A]/5 px-4 py-1.5 text-sm font-medium text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A] hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {member.phone}
        </a>
      )}
    </div>
  );
}

// --- SKELETON LOADER ---
function CommitteeCardSkeleton() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-[#8B1A1A]/10 bg-white p-6 shadow-md animate-pulse">
      <div className="mb-4 h-24 w-24 rounded-full bg-gray-200" />
      <div className="h-4 w-28 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-20 rounded bg-gray-200" />
      <div className="mt-3 h-7 w-24 rounded-full bg-gray-200" />
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function CommitteePage() {
  const [members, setMembers] = useState<BodMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMembers() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/bod/`, {
          // Use "no-store" if you always want fresh data,
          // or remove this line to allow Next.js caching.
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch committee members (${res.status})`);
        }

        const data: BodMember[] = await res.json();

        if (isMounted) {
          setMembers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Something went wrong while loading the committee."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="committee" className="relative bg-white py-20 overflow-hidden">
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
            कार्यसमिति
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            पदाधिकारीहरु
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          <p className="mt-4 max-w-2xl text-gray-500 text-sm">
            नेपाल खुद्रा व्यापार संघको समर्पित कार्यसमिति सदस्यहरू।
          </p>
        </div>

        {/* --- ERROR STATE --- */}
        {error && (
          <div className="mx-auto mb-8 max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {/* --- COMMITTEE GRID --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <CommitteeCardSkeleton key={i} />)
            : members.map((member) => <CommitteeCard key={member.id} member={member} />)}
        </div>

        {/* --- EMPTY STATE --- */}
        {!loading && !error && members.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No committee members found.</p>
        )}
      </div>
    </section>
  );
}