"use client";
import { useState } from "react";

/** Hidden YouTube audio — starts at 0:20, loops. Toggled by a small button. */
export function Music() {
  const [on, setOn] = useState(false);
  // ni326FjAV6Q — start at 20s, loop via playlist trick
  const videoId = "ni326FjAV6Q";
  const start = 20;
  const src = `https://www.youtube.com/embed/${videoId}?start=${start}&autoplay=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`;

  return (
    <>
      <button
        onClick={() => setOn((v) => !v)}
        aria-label={on ? "ปิดเพลง" : "เปิดเพลง"}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 90,
          width: 46,
          height: 46,
          borderRadius: "50%",
          border: "1px solid rgba(218,172,100,0.4)",
          background: "rgba(10,8,6,0.7)",
          backdropFilter: "blur(8px)",
          color: on ? "#d8aa66" : "#8a7e6e",
          fontSize: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color .25s",
        }}
      >
        {on ? "♪" : "♪"}
      </button>
      {on && (
        <iframe
          src={src}
          allow="autoplay; encrypted-media"
          style={{ position: "fixed", right: -9999, bottom: -9999, width: 1, height: 1, border: 0, opacity: 0 }}
          aria-hidden
        />
      )}
    </>
  );
}
