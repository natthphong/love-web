"use client";

import { useGame } from "./GameProvider";

export default function SecretMessage() {
  const { secretMode } = useGame();
  if (!secretMode) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] px-4 py-3 pixel-border font-pixel text-[9px] sm:text-[10px] text-center max-w-xs" style={{ background: "var(--pink-600)", color: "var(--gold)" }}>
      SECRET MODE UNLOCKED ♥
      <br />
      YOU FOUND THE KONAMI CODE.
      <br />
      P.S. I LOVE YOU MORE THAN PIXELS.
    </div>
  );
}
