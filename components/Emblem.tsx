type EmblemProps = {
  className?: string;
  ringColor?: string;
};

/**
 * A kalash-and-laurel style crest, drawn in code so the redesign doesn't
 * depend on the old raster logo. Swap this out for the real crest artwork
 * whenever it's available — see the README for the exact spot to drop it.
 */
export default function Emblem({ className = "h-12 w-12", ringColor = "#7C1F2B" }: EmblemProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="नेपाल खुद्रा व्यापार संघको प्रतीक चिन्ह"
    >
      <circle cx="32" cy="32" r="30" fill="none" stroke={ringColor} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26" fill="none" stroke={ringColor} strokeWidth="1" opacity="0.5" />
      {/* kalash / vase */}
      <path
        d="M25 40c-2 3-2 7 1 9.5 3 2.5 9 2.5 12 0 3-2.5 3-6.5 1-9.5"
        fill="none"
        stroke={ringColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M27 40h10" stroke={ringColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M29 40v-8h6v8" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M22 32c3-2 6-3 10-3s7 1 10 3"
        fill="none"
        stroke={ringColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M32 29v-8" stroke={ringColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M27 21c2-3 8-3 10 0" fill="none" stroke={ringColor} strokeWidth="2" strokeLinecap="round" />
      {/* laurel accents */}
      <path
        d="M14 40c2 6 6 10 10 12"
        fill="none"
        stroke={ringColor}
        strokeWidth="1.4"
        opacity="0.7"
      />
      <path
        d="M50 40c-2 6-6 10-10 12"
        fill="none"
        stroke={ringColor}
        strokeWidth="1.4"
        opacity="0.7"
      />
    </svg>
  );
}
