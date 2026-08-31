import type { Chapter as Ch } from "@/data/film";
import { CineMedia } from "./CineMedia";

function SceneHeader({ ch }: { ch: Ch }) {
  return (
    <header className="relative mb-8">
      <div className="scene-ghost pointer-events-none select-none absolute -top-[0.18em] -left-2 -z-0" aria-hidden>
        {ch.scene}
      </div>
      <div className="relative z-10">
        <p className="eyebrow reveal">ตอนที่ {ch.scene}</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ fontFamily: "var(--ff-mono)", fontSize: "12px", letterSpacing: "0.12em", color: "var(--paper-dim)" }}>
          <span className="reveal reveal-d1">{ch.date}</span>
          <span className="reveal reveal-d1">·</span>
          <span className="reveal reveal-d1">{ch.time}</span>
          <span className="reveal reveal-d1">·</span>
          <span className="reveal reveal-d1">{ch.media.length} ช็อต</span>
        </div>
        {ch.caption ? (
          <h3
            className="reveal reveal-d2 mt-4 text-[var(--paper)]"
            style={{ fontFamily: "var(--ff-serif-th)", fontWeight: 600, fontSize: "clamp(26px, 4.4vw, 48px)", lineHeight: 1.15 }}
          >
            {ch.caption}
          </h3>
        ) : null}
      </div>
    </header>
  );
}

function Narrative({ ch }: { ch: Ch }) {
  return (
    <p
      className="reveal reveal-d3 mt-6 max-w-2xl text-[var(--paper)]"
      style={{ fontFamily: "var(--ff-serif-th)", fontStyle: "italic", fontSize: "clamp(17px, 2.2vw, 23px)", lineHeight: 1.7, opacity: 0.92 }}
    >
      <span className="mr-2 text-[var(--gold)]" style={{ fontStyle: "normal" }}>“</span>
      {ch.narrative}
      <span className="ml-1 text-[var(--gold)]" style={{ fontStyle: "normal" }}>”</span>
    </p>
  );
}

/* ---------- film strip of many media ---------- */
function Strip({ media }: { media: Ch["media"] }) {
  return (
    <div className="sprockets mt-2">
      <div className="strip">
        {media.map((m, i) => (
          <figure
            key={i}
            className="filmframe"
            style={{ width: "clamp(260px, 34vw, 440px)", aspectRatio: "3 / 4" }}
          >
            <CineMedia m={m} className="h-full w-full object-cover" eager={i === 0} />
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ---------- layouts ---------- */
function MediaBlock({ ch }: { ch: Ch }) {
  const [m0, ...rest] = ch.media;

  if (ch.layout === "hero") {
    return (
      <div className="mt-2">
        <div className="filmframe relative aspect-[16/10] w-full sm:aspect-[21/9]">
          <CineMedia m={m0} className="kenburns-slow h-full w-full object-cover" eager />
          <div
            className="absolute inset-x-0 bottom-0 p-5 sm:p-8"
            style={{ background: "linear-gradient(0deg, rgba(11,10,8,0.85), transparent)" }}
          >
            <p className="eyebrow"> establishing shot </p>
          </div>
        </div>
        {rest.length > 0 ? <Strip media={rest} /> : null}
      </div>
    );
  }

  if (ch.layout === "solo") {
    return (
      <div className="mt-2">
        <figure className="filmframe mx-auto max-w-3xl" style={{ aspectRatio: "4 / 5" }}>
          <CineMedia m={m0} className="h-full w-full object-cover" eager />
        </figure>
      </div>
    );
  }

  if (ch.layout === "duo") {
    const [m1, m2] = ch.media;
    return (
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <figure className="filmframe" style={{ aspectRatio: "3 / 4" }}>
          <CineMedia m={m1} className="h-full w-full object-cover" eager />
        </figure>
        <figure className="filmframe" style={{ aspectRatio: "3 / 4" }}>
          <CineMedia m={m2 ?? m1} className="h-full w-full object-cover" />
        </figure>
      </div>
    );
  }

  if (ch.layout === "video") {
    return (
      <div className="mt-2">
        <figure className="filmframe mx-auto max-w-3xl" style={{ aspectRatio: "9 / 13" }}>
          <CineMedia m={m0} className="h-full w-full object-cover" eager />
          <span className="absolute left-3 top-3 z-10 bg-[var(--ink)]/70 px-2 py-1 text-[10px] tracking-widest text-[var(--gold)]" style={{ fontFamily: "var(--ff-mono)" }}>
            ● CLIP
          </span>
        </figure>
        {rest.length > 0 ? <Strip media={rest} /> : null}
      </div>
    );
  }

  // strip (default)
  return <Strip media={ch.media} />;
}

export function Chapter({ ch }: { ch: Ch }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-[14vh] sm:px-8">
      <SceneHeader ch={ch} />
      <MediaBlock ch={ch} />
      <Narrative ch={ch} />
    </section>
  );
}
