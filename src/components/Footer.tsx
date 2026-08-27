"use client";

import { useGame } from "./GameProvider";

export default function Footer() {
  const { playBlip } = useGame();

  return (
    <footer className="px-4 py-16 text-center" style={{ background: "var(--ink)" }}>
      <div className="pixel-border inline-block px-6 py-4" style={{ background: "var(--pink-300)" }}>
        <p className="font-pixel text-[10px] sm:text-xs mb-2" style={{ color: "var(--ink)" }}>
          © 20XX LOVE QUEST CO.
        </p>
        <button
          onClick={() => {
            playBlip(440);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-pixel text-[9px] underline"
          style={{ color: "var(--pink-600)" }}
        >
          PRESS RESET TO REPLAY
        </button>
      </div>
    </footer>
  );
}
