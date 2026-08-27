"use client";

import { useGame } from "./GameProvider";

export default function Hud() {
  const { muted, toggleMuted, playBlip, score, secretMode } = useGame();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 font-pixel text-[10px] sm:text-xs">
      <div
        className="flex items-center justify-between gap-2 px-2 sm:px-4 py-2 border-b-4"
        style={{
          background: secretMode ? "var(--pink-600)" : "var(--white)",
          borderColor: "var(--ink)",
          color: secretMode ? "var(--gold)" : "var(--ink)",
        }}
      >
        <div className="flex items-center gap-1">
          <span aria-hidden>♥</span>
          <span aria-hidden>♥</span>
          <span aria-hidden>♥</span>
          <span className="hidden sm:inline ml-1">LIVES</span>
        </div>
        <div className="flex-1 text-center truncate">
          SCORE {String(score).padStart(4, "0")}
        </div>
        <button
          onClick={() => {
            playBlip(880);
            toggleMuted();
          }}
          className="pixel-btn px-2 py-1 shrink-0"
          style={{ background: "var(--pink-300)", color: "var(--ink)" }}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}
