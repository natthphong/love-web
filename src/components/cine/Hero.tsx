"use client";
import { useEffect, useState } from "react";
import { LiveCounter } from "./LiveCounter";

const STILLS = [
  { src: "/media/posts/DRFJbxXjzp9y1BA7KaLk4i073IjhYnVrduLViU0/01.jpg", kb: "kenburns" },
  { src: "/media/posts/DWhA-6wDxza4iJqieZQoyh47pVJiL9vj0AOC0w0/10.jpg", kb: "kenburns-slow" },
  { src: "/media/posts/DY_pD8FGJRrk0R7kGIWURc_n1swZOvfijhpMsE0/03.jpg", kb: "kenburns" },
  { src: "/media/posts/C0LRo6ELYcwNHnNK4yVaOSpb9On20fb2uHbcLA0/01.jpg", kb: "kenburns-slow" },
  { src: "/media/posts/DUvmqGbD0LOvmqMUM9XfuOIrq4Y2akeIPXR4lY0/01.jpg", kb: "kenburns" },
  { src: "/media/posts/DRFJbxXjzp9y1BA7KaLk4i073IjhYnVrduLViU0/03.jpg", kb: "kenburns-slow" },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % STILLS.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[var(--ink)]">
      {/* crossfade Ken Burns slideshow */}
      {STILLS.map((s, idx) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
          style={{ opacity: idx === i ? 1 : 0 }}
        >
          <img
            src={s.src}
            alt=""
            aria-hidden
            loading={idx === 0 ? "eager" : "lazy"}
            className={`h-full w-full object-cover ${idx === i ? s.kb : ""}`}
            style={{ filter: "saturate(0.85) contrast(1.08) brightness(0.7)" }}
          />
        </div>
      ))}
      {/* darkening gradient for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,10,8,0.55) 0%, rgba(11,10,8,0.25) 40%, rgba(11,10,8,0.85) 100%)",
        }}
      />

      {/* title block */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow title-in" style={{ animationDelay: "0.2s" }}>
          A&nbsp;TRUE&nbsp;STORY
        </p>
        <h1
          className="title-in mt-6 text-[var(--paper)]"
          style={{
            fontFamily: "var(--ff-serif-th)",
            fontWeight: 600,
            fontSize: "clamp(48px, 11vw, 132px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            animationDelay: "0.6s",
          }}
        >
          เรื่องของเรา
        </h1>
        <p
          className="title-in mt-3 text-[var(--gold)]"
          style={{
            fontFamily: "var(--ff-serif)",
            fontStyle: "italic",
            fontSize: "clamp(16px, 2.6vw, 30px)",
            animationDelay: "1.1s",
          }}
        >
          a three-year love documentary
        </p>

        <div className="mt-10 fade-up" style={{ animationDelay: "1.8s" }}>
          <LiveCounter />
        </div>

        <p
          className="fade-up mt-8 text-[var(--paper-dim)]"
          style={{ fontFamily: "var(--ff-mono)", fontSize: "12px", letterSpacing: "0.3em", animationDelay: "2.4s" }}
        >
          เลื่อนลงเพื่อเริ่มเรื่อง ↓
        </p>
      </div>
    </section>
  );
}
