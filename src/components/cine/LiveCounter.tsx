"use client";
import { useEffect, useState } from "react";
import { startDate } from "@/data/film";

function diff(target: number) {
  let s = Math.max(0, Math.floor((Date.now() - target) / 1000));
  const sec = s % 60; s = Math.floor(s / 60);
  const min = s % 60; s = Math.floor(s / 60);
  const hr = s % 24; s = Math.floor(s / 24);
  const day = s;
  return { day, hr, min, sec };
}

export function LiveCounter() {
  const [d, setD] = useState<{ day: number; hr: number; min: number; sec: number } | null>(null);
  useEffect(() => {
    const t = new Date(startDate).getTime();
    const tick = () => setD(diff(t));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (!d) return null;
  const fmt = (n: number, w = 2) => n.toLocaleString("en-US").padStart(w, "0");
  return (
    <div className="font-mono" style={{ fontFamily: "var(--ff-mono)" }}>
      <span className="text-[clamp(28px,6vw,56px)] font-medium tracking-tight text-[var(--gold)]">
        {fmt(d.day, 4)}
      </span>
      <span className="text-[var(--paper-dim)]"> วัน </span>
      <span className="text-[var(--gold)]">{fmt(d.hr)}</span>
      <span className="text-[var(--paper-dim)]">:</span>
      <span className="text-[var(--gold)]">{fmt(d.min)}</span>
      <span className="text-[var(--paper-dim)]">:</span>
      <span className="text-[var(--gold)]">{fmt(d.sec)}</span>
      <span className="text-[var(--paper-dim)] text-xs ml-2">นับจากวันแรกที่เจอกัน</span>
    </div>
  );
}
