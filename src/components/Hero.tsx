"use client";

import { useEffect, useState } from "react";
import PixelHeart from "./PixelHeart";
import PixelImage from "./PixelImage";

const START_DATE = new Date("2023-11-28T00:00:00");

export default function Hero() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const compute = () => {
      const diff = Date.now() - START_DATE.getTime();
      setDays(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))));
    };
    compute();
    const id = setInterval(compute, 1000 * 60);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-10 px-4 pt-24 pb-16 text-center">
      <h1 className="font-pixel text-2xl sm:text-4xl leading-relaxed" style={{ color: "var(--pink-600)" }}>
        LOVE QUEST
      </h1>
      <p className="font-pixel text-[10px] sm:text-sm" style={{ color: "var(--pink-500)" }}>
        3RD ANNIVERSARY EDITION
      </p>

      <PixelHeart size={10} />

      <div className="flex items-center justify-center gap-6 sm:gap-16 flex-wrap">
        <div className="flex flex-col items-center gap-2">
          <div className="pixel-border w-28 h-28 sm:w-36 sm:h-36 relative" style={{ background: "var(--pink-200)" }}>
            <PixelImage src="/photos/p05.jpg" alt="Player 1" />
          </div>
          <span className="font-pixel text-[10px]">PLAYER 1</span>
        </div>

        <div className="text-3xl sm:text-5xl" style={{ color: "var(--pink-500)" }} aria-hidden>
          ⚔
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="pixel-border w-28 h-28 sm:w-36 sm:h-36 relative" style={{ background: "var(--pink-200)" }}>
            <PixelImage src="/photos/p01.jpg" alt="Player 2" />
          </div>
          <span className="font-pixel text-[10px]">PLAYER 2</span>
        </div>
      </div>

      <div className="pixel-border px-6 py-4" style={{ background: "var(--white)" }}>
        <p className="font-pixel text-[10px] sm:text-xs mb-2" style={{ color: "var(--pink-600)" }}>
          DAYS TOGETHER
        </p>
        <p className="font-pixel text-2xl sm:text-4xl" style={{ color: "var(--pink-500)" }}>
          {days.toLocaleString()}
        </p>
      </div>

      <p className="font-pixel text-[9px] blink" style={{ color: "var(--pink-400)" }}>
        ▼ SCROLL TO CONTINUE
      </p>
    </section>
  );
}
