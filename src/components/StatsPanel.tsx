"use client";

import useReveal from "./useReveal";

const STATS: { label: string; value: number }[] = [
  { label: "AFFECTION", value: 10 },
  { label: "TRUST", value: 9 },
  { label: "LAUGHTER", value: 10 },
  { label: "PATIENCE", value: 8 },
];

function SegmentBar({
  label,
  value,
  visible,
  delay,
}: {
  label: string;
  value: number;
  visible: boolean;
  delay: number;
}) {
  return (
    <div>
      <div className="flex justify-between font-pixel text-[9px] sm:text-[10px] mb-1">
        <span>{label}</span>
        <span style={{ color: "var(--pink-500)" }}>{value}/10</span>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`stat-block ${visible && i < value ? "filled" : ""}`}
            style={{
              transitionDelay: `${delay + i * 40}ms`,
              transition: "background 0.2s steps(2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function StatsPanel() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="px-4 py-20 flex justify-center">
      <div
        ref={ref}
        className="pixel-border w-full max-w-xl p-5 sm:p-8"
        style={{ background: "var(--white)" }}
      >
        <div className="flex items-center justify-between mb-6 font-pixel text-[10px] sm:text-xs">
          <span style={{ color: "var(--pink-600)" }}>STATUS WINDOW</span>
          <span style={{ color: "var(--gold)" }}>LV 3</span>
        </div>

        <div className="space-y-1 mb-6">
          <div className="flex justify-between font-pixel text-[9px]">
            <span>HP</span>
            <span>♥♥♥</span>
          </div>
          <div className="w-full h-4 border-2" style={{ borderColor: "var(--ink)", background: "var(--pink-200)" }}>
            <div
              className="h-full"
              style={{
                width: visible ? "100%" : "0%",
                background: "var(--pink-500)",
                transition: "width 1s steps(20)",
              }}
            />
          </div>
        </div>

        <div className="space-y-1 mb-8">
          <div className="flex justify-between font-pixel text-[9px]">
            <span>EXP</span>
            <span>3 YRS</span>
          </div>
          <div className="w-full h-4 border-2" style={{ borderColor: "var(--ink)", background: "var(--pink-200)" }}>
            <div
              className="h-full"
              style={{
                width: visible ? "82%" : "0%",
                background: "var(--gold)",
                transition: "width 1.2s steps(20)",
                transitionDelay: "200ms",
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {STATS.map((s, i) => (
            <SegmentBar key={s.label} label={s.label} value={s.value} visible={visible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
