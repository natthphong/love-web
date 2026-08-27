"use client";

import { useState } from "react";
import DialogueBox from "./DialogueBox";
import { useGame } from "./GameProvider";

const LETTER =
  "ถึงคนที่ฉันรักที่สุด\n\nสามปีผ่านไปแล้วนับตั้งแต่วันที่เราเจอกันครั้งแรก และทุกวันที่ผ่านมาคือของขวัญที่ฉันไม่เคยคาดฝันว่าจะได้รับ ขอบคุณที่อยู่เคียงข้างกันทั้งในวันที่มีความสุขและวันที่ยากลำบาก ขอบคุณที่เลือกเดินเควสนี้ไปพร้อมกับฉัน\n\nไม่ว่าจะอีกกี่ปี ฉันก็ยังอยากมีเธอเป็นผู้เล่นคนที่สองในเกมชีวิตของฉันเสมอ รักเธอที่สุดนะ";

export default function LoveLetter() {
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState<{ id: number; x: number; rot: number }[]>([]);
  const { playBlip } = useGame();

  const handleSave = () => {
    playBlip(988);
    setSaved(true);
    const hearts = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      rot: Math.random() * 360,
    }));
    setBurst(hearts);
    setTimeout(() => setBurst([]), 1800);
  };

  return (
    <section className="relative px-4 py-20 max-w-2xl mx-auto overflow-hidden">
      <h2 className="font-pixel text-lg sm:text-2xl text-center mb-10" style={{ color: "var(--pink-600)" }}>
        FINAL MESSAGE
      </h2>

      <DialogueBox name="TO: MY PLAYER 2" text={LETTER} speed={18} />

      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="pixel-border px-6 py-5 text-center" style={{ background: "var(--white)" }}>
          <p className="font-pixel text-[10px] sm:text-xs mb-4" style={{ color: "var(--pink-600)" }}>
            SAVE GAME?
          </p>
          {!saved ? (
            <div className="flex gap-4 justify-center">
              <button onClick={handleSave} className="pixel-btn font-pixel text-[10px] px-4 py-2">
                YES
              </button>
              <button onClick={handleSave} className="pixel-btn font-pixel text-[10px] px-4 py-2">
                YES
              </button>
            </div>
          ) : (
            <p className="font-pixel text-[10px]" style={{ color: "var(--pink-500)" }}>
              GAME SAVED ♥
            </p>
          )}
        </div>
      </div>

      {burst.map((h) => (
        <span
          key={h.id}
          className="pointer-events-none absolute bottom-0"
          style={{
            left: `${h.x}%`,
            color: "var(--pink-500)",
            fontSize: "18px",
            animation: `floatup 1.6s ease-out forwards`,
            transform: `rotate(${h.rot}deg)`,
          }}
          aria-hidden
        >
          ♥
        </span>
      ))}
    </section>
  );
}
