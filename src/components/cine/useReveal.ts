"use client";
import { useEffect, useRef } from "react";

/**
 * Adds `.in` to elements with `.reveal` when they enter the viewport.
 * Attach to the scroll root (or document). Runs once per element.
 */
export function useRevealOnScroll() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const root = ref.current ?? document;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    const els = root.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}
