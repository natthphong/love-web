"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const lastTime = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime.current < 60) return;
      lastTime.current = now;
      const el = document.createElement("div");
      el.textContent = "♥";
      el.style.position = "fixed";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.color = "var(--pink-500)";
      el.style.fontSize = "14px";
      el.style.pointerEvents = "none";
      el.style.zIndex = "9999";
      el.style.transform = "translate(-50%, -50%)";
      el.style.animation = "floatup 0.8s ease-out forwards";
      el.style.textShadow = "1px 1px 0 var(--ink)";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 850);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}
