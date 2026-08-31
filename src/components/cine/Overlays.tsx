"use client";
import { useEffect, useState } from "react";

/** Live Bangkok timecode for the HUD. */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function tc(d: Date) {
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function Overlays() {
  const now = useNow();
  return (
    <>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <div className="letterbox-top" aria-hidden />
      <div className="letterbox-bot" aria-hidden />
      <div className="hud hud-tl">
        <span className="rec-dot" />
        REC · {now ? tc(now) : "--:--:--"}
      </div>
      <div className="hud hud-tr">f/1.8 · 24fps · ราชวงศ์</div>
      <div className="hud hud-bl">เรื่องของเรา · สารคดีความรัก ๓ ปี</div>
      <div className="hud hud-br">ต้าร์ & ฟร้อนท์</div>
    </>
  );
}
