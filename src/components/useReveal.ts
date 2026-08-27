"use client";

import { useEffect, useState } from "react";

/**
 * Reveals an element once its top edge crosses 90% of the viewport height.
 *
 * Uses a scroll listener plus an immediate check rather than an
 * IntersectionObserver: the observer did not fire reliably here, which left
 * entries stuck at opacity 0 forever. The immediate check also covers an
 * element that is already on screen (or already scrolled past) at mount,
 * so a restored scroll position or an in-page jump never strands content.
 */
export default function useReveal<T extends HTMLElement>() {
  const [el, setEl] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!el || visible) return;

    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        setVisible(true);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [el, visible]);

  // callback ref: fires as soon as the node is attached, so the first
  // check runs without waiting for a second render
  return { ref: setEl, visible };
}
