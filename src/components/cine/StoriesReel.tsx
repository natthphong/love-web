import { storyReels } from "@/data/film";

export function StoriesReel() {
  return (
    <section className="relative bg-[var(--ink)] py-[12vh]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow reveal">INTERLUDE</p>
        <h2
          className="reveal reveal-d1 mt-4 text-[var(--paper)]"
          style={{ fontFamily: "var(--ff-serif-th)", fontWeight: 600, fontSize: "clamp(32px,6vw,64px)", lineHeight: 1.1 }}
        >
          ภาพยนตร์สั้น
        </h2>
        <p className="reveal reveal-d2 mt-3 max-w-2xl text-[var(--paper-dim)]">
          บันทึกเล็กๆ ที่ไม่ได้เป็นโพสต์ — แต่เก็บไว้ในไฮไลต์ เหมือนฟิล์มตัดต่อ
          ที่ไม่ได้ตัดจบ ยังถูกเลื่อนต่อไปเรื่อยๆ ทุกครั้งที่มีเรื่องใหม่
        </p>
      </div>

      {storyReels.map((reel) => (
        <div key={reel.name} className="mt-10">
          <div className="mx-auto flex max-w-6xl items-baseline gap-3 px-5 sm:px-8">
            <span className="text-[var(--gold)]" style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", fontSize: "22px" }}>
              {reel.name}
            </span>
            <span className="text-[var(--paper-dim)]" style={{ fontFamily: "var(--ff-mono)", fontSize: "11px", letterSpacing: "0.18em" }}>
              @{reel.owner} · {reel.items.length} ช็อต
            </span>
          </div>
          <div className="sprockets mt-3">
            <div className="strip">
              {reel.items.map((it, i) => (
                <figure key={i} className="story-card filmframe" style={{ width: "clamp(180px, 26vw, 280px)" }}>
                  <img src={it.src} alt="" loading="lazy" decoding="async" />
                  <figcaption
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ink)] to-transparent p-3 pt-8"
                    style={{ fontFamily: "var(--ff-mono)", fontSize: "10px", letterSpacing: "0.14em", color: "var(--paper-dim)" }}
                  >
                    {it.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
