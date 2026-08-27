"use client";

import { useState } from "react";
import { photos } from "@/data/photos";
import PixelImage from "./PixelImage";
import { useGame } from "./GameProvider";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const { playBlip } = useGame();

  return (
    <section className="px-4 py-20 max-w-5xl mx-auto">
      <h2 className="font-pixel text-lg sm:text-2xl text-center mb-2" style={{ color: "var(--pink-600)" }}>
        ITEM BOX
      </h2>
      <p className="font-pixel text-[9px] sm:text-[10px] text-center mb-10 opacity-70">
        TAP AN ITEM TO INSPECT
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
        {photos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => {
              playBlip(740);
              setOpen(i);
            }}
            className="relative aspect-square pixel-border-sm overflow-hidden"
            style={{ background: "var(--pink-200)" }}
          >
            <PixelImage src={p.src} alt={p.caption} />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: "rgba(43,27,36,0.85)" }}
          onClick={() => setOpen(null)}
        >
          <div
            className="pixel-border max-w-md w-full p-4 sm:p-6"
            style={{ background: "var(--white)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3 font-pixel text-[9px]" style={{ color: "var(--pink-600)" }}>
              <span>ITEM DESCRIPTION</span>
              <button
                onClick={() => {
                  playBlip(220);
                  setOpen(null);
                }}
                className="pixel-btn px-2 py-1"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="w-full aspect-square relative pixel-border-sm mb-4" style={{ background: "var(--pink-200)" }}>
              <PixelImage src={photos[open].src} alt={photos[open].caption} />
            </div>
            <p className="font-thai text-base sm:text-lg text-center">{photos[open].caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
