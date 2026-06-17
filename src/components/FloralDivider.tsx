// Calm botanical flourish — used as a soft visual rest between sections.
export function FloralDivider({
  className = "",
  color = "var(--gold)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span
        className="block h-px w-16 md:w-24"
        style={{ background: `linear-gradient(90deg, transparent, ${color})` }}
      />
      <svg width="48" height="20" viewBox="0 0 96 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* center diamond */}
        <path
          d="M48 6 L52 16 L48 26 L44 16 Z"
          stroke={color}
          strokeWidth="0.9"
          fill="none"
        />
        {/* left leaf */}
        <path
          d="M44 16 C 36 12, 26 12, 18 16 C 26 20, 36 20, 44 16 Z"
          stroke={color}
          strokeWidth="0.7"
          fill="none"
        />
        {/* right leaf */}
        <path
          d="M52 16 C 60 12, 70 12, 78 16 C 70 20, 60 20, 52 16 Z"
          stroke={color}
          strokeWidth="0.7"
          fill="none"
        />
        {/* outer dots */}
        <circle cx="14" cy="16" r="1.1" fill={color} />
        <circle cx="82" cy="16" r="1.1" fill={color} />
        <circle cx="48" cy="16" r="1.4" fill={color} />
      </svg>
      <span
        className="block h-px w-16 md:w-24"
        style={{ background: `linear-gradient(270deg, transparent, ${color})` }}
      />
    </div>
  );
}

// Compact floral "corner" used as a soft section-edge accent.
export function FloralSprig({
  className = "",
  color = "var(--gold)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 8 C 32 18, 28 22, 22 24 M32 8 C 32 18, 36 22, 42 24 M32 20 C 30 26, 26 30, 20 32 M32 20 C 34 26, 38 30, 44 32 M32 32 C 31 38, 29 42, 24 44 M32 32 C 33 38, 35 42, 40 44 M32 8 L32 56"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="22" cy="24" r="1.6" fill={color} />
      <circle cx="42" cy="24" r="1.6" fill={color} />
      <circle cx="20" cy="32" r="1.4" fill={color} />
      <circle cx="44" cy="32" r="1.4" fill={color} />
      <circle cx="24" cy="44" r="1.2" fill={color} />
      <circle cx="40" cy="44" r="1.2" fill={color} />
      <circle cx="32" cy="56" r="1.6" fill={color} />
    </svg>
  );
}
