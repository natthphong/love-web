import type { ReactNode } from "react";

/** Full-screen act title card between groups of chapters. */
export function ActDivider({
  roman,
  title,
  year,
  subtitle,
}: {
  roman: string;
  title: string;
  year: string;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden bg-[var(--ink)] px-6">
      <div className="text-center">
        <p className="eyebrow reveal">ACT {roman}</p>
        <h2
          className="reveal reveal-d1 mt-5 text-[var(--paper)]"
          style={{
            fontFamily: "var(--ff-serif-th)",
            fontWeight: 600,
            fontSize: "clamp(40px, 8vw, 96px)",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
        <p
          className="reveal reveal-d2 mt-4 text-[var(--gold)]"
          style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", fontSize: "clamp(18px,3vw,28px)" }}
        >
          {year}
        </p>
        {subtitle ? (
          <p className="reveal reveal-d3 mx-auto mt-6 max-w-xl text-[var(--paper-dim)]" style={{ fontFamily: "var(--ff-sans-th)" }}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
