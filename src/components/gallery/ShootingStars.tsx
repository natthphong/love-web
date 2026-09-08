"use client";
import { useEffect, useRef } from "react";

type Meteor = {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  life: number;
  maxLife: number;
  size: number;
};

/** Canvas overlay — shooting stars / meteors every 5–10 s. */
export function ShootingStars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const meteors: Meteor[] = [];
    let nextMeteor = performance.now() + 2000;

    function spawn() {
      const fromTop = Math.random() < 0.5;
      const angle = fromTop
        ? Math.PI * (0.15 + Math.random() * 0.2) // diagonal down-right
        : Math.PI * (0.6 + Math.random() * 0.2); // diagonal down-left
      meteors.push({
        x: Math.random() * w,
        y: fromTop ? -20 : Math.random() * h * 0.4,
        len: 80 + Math.random() * 160,
        speed: 6 + Math.random() * 8,
        angle,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        size: 1.2 + Math.random() * 1.6,
      });
    }

    // background twinkle stars
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.3 + Math.random() * 1.1,
      tw: Math.random() * Math.PI * 2,
      sp: 0.01 + Math.random() * 0.03,
    }));

    let raf = 0;
    let t = 0;
    function frame() {
      t += 1;
      ctx!.clearRect(0, 0, w, h);

      // twinkle stars
      for (const s of stars) {
        s.tw += s.sp;
        const a = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(s.tw));
        ctx!.fillStyle = `rgba(255,240,210,${a})`;
        ctx!.beginPath();
        ctx!.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // meteors
      const now = performance.now();
      if (now > nextMeteor) {
        spawn();
        if (Math.random() < 0.3) spawn(); // occasional double
        nextMeteor = now + 5000 + Math.random() * 5000; // 5–10 s
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        const dx = Math.cos(m.angle) * m.speed;
        const dy = Math.sin(m.angle) * m.speed;
        m.x += dx;
        m.y += dy;

        const fade = 1 - m.life / m.maxLife;
        if (fade <= 0 || m.x < -200 || m.x > w + 200 || m.y > h + 200) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.len;
        const tailY = m.y - Math.sin(m.angle) * m.len;
        const grad = ctx!.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,250,235,${0.95 * fade})`);
        grad.addColorStop(0.3, `rgba(255,220,170,${0.6 * fade})`);
        grad.addColorStop(1, "rgba(255,200,140,0)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = m.size;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(m.x, m.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();

        // bright head
        ctx!.fillStyle = `rgba(255,255,245,${fade})`;
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, m.size * 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
