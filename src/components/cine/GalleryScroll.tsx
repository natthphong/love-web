"use client";

import { useEffect, useRef } from "react";
import { chapters, type Media } from "@/data/film";

/**
 * Bottom gallery — collects every image & video from all chapters into
 * one long horizontal film strip.  Videos autoplay (muted, loop) while
 * they are in view, and pause when scrolled past.
 */

// flatten all media from all chapters
const ALL_MEDIA: Media[] = chapters.flatMap((ch) => ch.media);

export function GalleryScroll() {
  return (
    <section className="relative bg-[var(--ink)] py-[10vh]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow reveal">ARCHIVE</p>
        <h2
          className="reveal reveal-d1 mt-4 text-[var(--paper)]"
          style={{ fontFamily: "var(--ff-serif-th)", fontWeight: 600, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.1 }}
        >
          ทุกช็อต
        </h2>
        <p className="reveal reveal-d2 mt-2 text-[var(--paper-dim)]" style={{ fontFamily: "var(--ff-sans-th)" }}>
          {ALL_MEDIA.length} ช็อต · เลื่อนดู →
        </p>
      </div>

      <div className="sprockets mt-6">
        <div className="strip">
          {ALL_MEDIA.map((m, i) => (
            <figure
              key={i}
              className="filmframe"
              style={{ width: "clamp(220px, 30vw, 380px)", aspectRatio: "3 / 4" }}
            >
              <GalleryMedia m={m} eager={i === 0} />
              {m.type === "video" ? (
                <span
                  className="absolute left-2 top-2 z-10 bg-[var(--ink)]/70 px-1.5 py-0.5 text-[9px] tracking-widest text-[var(--gold)]"
                  style={{ fontFamily: "var(--ff-mono)" }}
                >
                  ●
                </span>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Like CineMedia but self-contained for the gallery. */
function GalleryMedia({ m, eager }: { m: Media; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || m.type !== "video") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
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
        className="h-full w-full object-cover"
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
      className="h-full w-full object-cover"
      src={m.src}
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ filter: "saturate(0.92) contrast(1.06)" }}
    />
  );
}
