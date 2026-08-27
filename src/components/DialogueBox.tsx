"use client";

import { useEffect, useState } from "react";
import PixelImage from "./PixelImage";
import useReveal from "./useReveal";

export default function DialogueBox({
  name,
  text,
  portrait,
  speed = 22,
  className = "",
}: {
  name: string;
  text: string;
  portrait?: string;
  speed?: number;
  className?: string;
}) {
  // same rAF-based reveal as the timeline: the observer never fired here
  const { ref, visible: started } = useReveal<HTMLDivElement>();
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [started, text, speed]);

  return (
    <div
      ref={ref}
      className={`pixel-border p-4 sm:p-5 flex gap-4 ${className}`}
      style={{ background: "var(--white)" }}
    >
      {portrait && (
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 pixel-border-sm relative"
          style={{ background: "var(--pink-200)" }}
        >
          <PixelImage src={portrait} alt={name} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-pixel text-[9px] sm:text-[10px] mb-2" style={{ color: "var(--pink-600)" }}>
          {name}
        </p>
        <p className="font-thai text-base sm:text-lg leading-relaxed whitespace-pre-wrap break-words">
          {shown}
          {!done && started && <span className="blink">▌</span>}
        </p>
        {done && (
          <p className="text-right mt-2 blink font-pixel text-[10px]" style={{ color: "var(--pink-500)" }}>
            ▼
          </p>
        )}
      </div>
    </div>
  );
}
