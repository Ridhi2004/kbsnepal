"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPhone, FaMobileAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// --- TYPES ---
interface Member {
  id: number;
  name: string;
  address: string;
  telephone: string;
  mobile: string;
  image: string | null;
  image_url: string | null;
}

interface Zone {
  id: number;
  zone_number: number;
  members: Member[];
}

// --- HELPER: Single Representative Card ---
function RepCard({
  name,
  address,
  telephone,
  mobile,
  image,
  image_url,
}: {
  name: string;
  address?: string;
  telephone?: string;
  mobile?: string;
  image?: string | null;
  image_url?: string | null;
}) {
  // Fallback initials if image path doesn't exist
  const initials = name
    .replace("श्री ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  // Use image_url if available, otherwise fallback to image
  const imageSrc = image_url || image;

  return (
    <div className="flex flex-col rounded-xl border border-[#8B1A1A]/10 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#8B1A1A]/10 bg-gray-100">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="56px"
              className="object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'flex h-full w-full items-center justify-center text-lg font-bold text-[#8B1A1A]/50';
                  fallback.textContent = initials;
                  parent.appendChild(fallback);
                }
              }}
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

// --- LOADING SKELETON ---
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[#8B1A1A]/10 bg-white/80 p-4 shadow-md animate-pulse"
        >
          <div className="mb-3 flex items-center gap-3 border-b border-[#8B1A1A]/10 pb-2">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
          <div className="space-y-3">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex flex-col rounded-xl border border-gray-100 bg-white p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-14 w-14 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="space-y-1 pt-2 border-t border-gray-100">
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-28 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- MAIN SECTION ---
export default function RepresentativesPage() {
  const [representatives, setRepresentatives] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/representatives/`,
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRepresentatives(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching representatives:', err);
        setError('Failed to load representatives. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepresentatives();
  }, []);

  // Format zone name for display
  const formatZoneName = (zoneNumber: number) => {
    // Convert number to Nepali numerals
    const nepaliNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    const nepaliNumber = String(zoneNumber)
      .split('')
      .map(digit => nepaliNumerals[parseInt(digit)] || digit)
      .join('');
    return `भेग नं. ${nepaliNumber}`;
  };

  if (loading) {
    return (
      <section id="representatives" className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
              क्षेत्रीय प्रतिनिधित्व
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              भेग प्रतिनिधिहरु
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          </div>
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="representatives" className="relative bg-white py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
              क्षेत्रीय प्रतिनिधित्व
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              भेग प्रतिनिधिहरु
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          </div>
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">⚠️</div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                window.location.reload();
              }}
              className="mt-4 px-6 py-2 bg-[#8B1A1A] text-white rounded-lg hover:bg-[#6B1414] transition-colors"
            >
              पुन: प्रयास गर्नुहोस्
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (representatives.length === 0) {
    return (
      <section id="representatives" className="relative bg-white py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
              क्षेत्रीय प्रतिनिधित्व
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              भेग प्रतिनिधिहरु
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">कुनै प्रतिनिधि उपलब्ध छैन</p>
          </div>
        </div>
      </section>
    );
  }

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
          {representatives.map((zone) => (
            <div
              key={zone.id}
              className="rounded-2xl border border-[#8B1A1A]/10 bg-white/80 p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Zone Title */}
              <div className="mb-3 flex items-center gap-3 border-b border-[#8B1A1A]/10 pb-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-sm font-bold text-[#8B1A1A]">
                  {zone.zone_number}
                </span>
                <h3 className="font-display text-base font-semibold text-[#8B1A1A]">
                  {formatZoneName(zone.zone_number)}
                </h3>
              </div>

              {/* Members Grid inside the Zone */}
              {zone.members.length > 0 ? (
                <div className="space-y-3">
                  {zone.members.map((member) => (
                    <RepCard
                      key={member.id}
                      name={member.name}
                      address={member.address}
                      telephone={member.telephone}
                      mobile={member.mobile}
                      image={member.image}
                      image_url={member.image_url}
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