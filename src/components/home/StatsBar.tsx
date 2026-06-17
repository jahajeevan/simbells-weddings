"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 480,  suffix: "+",   label: "Weddings Crafted" },
  { value: 1200, suffix: "+",   label: "Happy Families" },
  { value: 25,   suffix: "+",   label: "Live Counters" },
  { value: 12,   suffix: "",    label: "Years of Love" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const steps = 60;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { setN(target); clearInterval(t); }
          else setN(Math.floor(cur));
        }, dur / steps);
      }
    }, { threshold: 0.35 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export function StatsBar() {
  return (
    <section className="relative section-x -mt-12 md:-mt-16 z-10">
      <div className="wrap">
        <div className="glass rounded-2xl px-6 md:px-10 py-8 md:py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-gold-grad text-4xl md:text-5xl lg:text-6xl font-light leading-none tracking-tight">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="eyebrow text-stone text-[0.6rem] mt-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
