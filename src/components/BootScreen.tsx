"use client";

import { useEffect, useState } from "react";
import { useGame } from "./GameProvider";

export default function BootScreen({ onStart }: { onStart: () => void }) {
  const [flash, setFlash] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const { playBlip } = useGame();

  useEffect(() => {
    const t1 = setTimeout(() => setFlash(false), 900);
    const t2 = setTimeout(() => setShowSkip(true), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 px-4 text-center"
      style={{ background: "var(--ink)", color: "var(--pink-100)" }}
    >
      {flash ? (
        <div
          className="font-pixel text-2xl sm:text-4xl"
          style={{ color: "var(--white)", animation: "crtflash 0.9s steps(4) forwards" }}
        >
          ♥ LOVE-QUEST ♥
        </div>
      ) : (
        <>
          <div className="font-pixel leading-loose text-[10px] sm:text-sm space-y-3">
            <p style={{ color: "var(--pink-400)" }}>LOVE QUEST</p>
            <p style={{ color: "var(--gold)" }}>— 3RD ANNIVERSARY EDITION —</p>
          </div>
          <div className="heartbeat text-5xl" style={{ color: "var(--pink-500)" }}>
            ♥
          </div>
          <button
            onClick={() => {
              playBlip(523);
              onStart();
            }}
            className="font-pixel text-xs sm:text-sm blink px-6 py-3 pixel-border"
            style={{ background: "var(--pink-300)", color: "var(--ink)" }}
          >
            PRESS START
          </button>
          {showSkip && (
            <button
              onClick={onStart}
              className="font-pixel text-[9px] underline opacity-60"
              style={{ color: "var(--pink-200)" }}
            >
              skip intro &gt;&gt;
            </button>
          )}
        </>
      )}
    </div>
  );
}
