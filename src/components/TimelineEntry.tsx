"use client";

import type { StoryEntry } from "@/data/story";
import PixelImage from "./PixelImage";
import useReveal from "./useReveal";

export default function TimelineEntry({
  entry,
  index,
}: {
  entry: StoryEntry;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const isRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-6 ${
        isRight ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* milestone marker */}
      <div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 items-center justify-center z-10 pixel-border-sm"
        style={{ background: "var(--gold)", color: "var(--ink)" }}
      >
        <span className="text-xs" aria-hidden>
          ★
        </span>
      </div>

      <div
        className={`w-full md:w-1/2 ${visible ? (isRight ? "reveal-right" : "reveal-left") : "pre-reveal"}`}
      >
        <div className="pixel-border p-4 sm:p-5" style={{ background: "var(--white)" }}>
          <div className="flex items-center justify-between mb-2 font-pixel text-[9px] sm:text-[10px]">
            <span style={{ color: "var(--pink-600)" }}>{entry.chapter}</span>
            <span style={{ color: "var(--pink-400)" }}>{entry.date}</span>
          </div>
          <h3 className="font-thai text-xl sm:text-2xl font-semibold mb-3" style={{ color: "var(--ink)" }}>
            {entry.title}
          </h3>
          <div className="w-full aspect-video relative pixel-border-sm mb-3" style={{ background: "var(--pink-200)" }}>
            <PixelImage src={entry.image} alt={entry.title} />
          </div>
          <p className="font-thai text-sm sm:text-base leading-relaxed">{entry.body}</p>
        </div>
      </div>

      <div className="hidden md:block w-full md:w-1/2" />
    </div>
  );
}
