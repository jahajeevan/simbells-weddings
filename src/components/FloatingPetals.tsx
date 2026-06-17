// Calm floating petals — pure CSS animation, performance-aware.
// 10 petals max. Falls behind content (use a positive z-index on content).

const PETALS = [
  { left: "5%",  dur: 22, delay: 0,  size: 14, color: "#F0D5D2", op: 0.55 },
  { left: "12%", dur: 26, delay: 3,  size: 18, color: "#E8C7C0", op: 0.45 },
  { left: "22%", dur: 24, delay: 7,  size: 12, color: "#D9A7A1", op: 0.5  },
  { left: "33%", dur: 28, delay: 11, size: 16, color: "#F0D5D2", op: 0.4  },
  { left: "45%", dur: 23, delay: 4,  size: 14, color: "#E4C977", op: 0.45 },
  { left: "58%", dur: 26, delay: 9,  size: 18, color: "#F0D5D2", op: 0.5  },
  { left: "70%", dur: 25, delay: 1,  size: 12, color: "#E8C7C0", op: 0.45 },
  { left: "82%", dur: 27, delay: 6,  size: 16, color: "#D9A7A1", op: 0.4  },
  { left: "92%", dur: 24, delay: 12, size: 14, color: "#F0D5D2", op: 0.5  },
  { left: "98%", dur: 22, delay: 2,  size: 12, color: "#E4C977", op: 0.45 },
];

function PetalShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id={`p-${color.slice(1)}`} cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <path
        d="M12 2 C 16 6, 20 11, 12 22 C 4 11, 8 6, 12 2 Z"
        fill={`url(#p-${color.slice(1)})`}
      />
    </svg>
  );
}

export function FloatingPetals({
  count = 10,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}
    >
      {PETALS.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: p.left,
              top: "-10vh",
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.op,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          <PetalShape color={p.color} />
        </span>
      ))}
    </div>
  );
}
