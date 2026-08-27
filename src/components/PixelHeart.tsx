"use client";

// 9x8 pixel heart grid drawn with divs, so we get a chunky retro heart
const ROWS: number[][] = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

export default function PixelHeart({ size = 8 }: { size?: number }) {
  return (
    <div
      className="heartbeat"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(8, ${size}px)`,
        gridTemplateRows: `repeat(7, ${size}px)`,
      }}
      aria-hidden
    >
      {ROWS.flatMap((row, ri) =>
        row.map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            style={{
              width: size,
              height: size,
              background: cell ? "var(--pink-500)" : "transparent",
              boxShadow: cell ? "inset 0 0 0 1px var(--pink-600)" : "none",
            }}
          />
        ))
      )}
    </div>
  );
}
