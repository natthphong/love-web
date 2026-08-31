"use client";
import { useEffect, useRef } from "react";
import type { Media } from "@/data/film";

/** A single cinematic still or clip. Videos autoplay (muted, loop) only while in view. */
export function CineMedia({
  m,
  className,
  eager,
}: {
  m: Media;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || m.type !== "video") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [m.type]);

  if (m.type === "video") {
    return (
      <video
        ref={ref}
        className={className}
        src={m.src}
        poster={m.poster}
        muted
        loop
        playsInline
        preload="none"
        style={{ filter: "saturate(0.92) contrast(1.06)" }}
      />
    );
  }
  return (
    <img
      className={className}
      src={m.src}
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ filter: "saturate(0.92) contrast(1.06)" }}
    />
  );
}
