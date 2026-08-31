import { chapters } from "@/data/film";

const totalShots = chapters.reduce((n, c) => n + c.media.length, 0);

const CREDITS: { role: string; name: string }[] = [
  { role: "STARRING", name: "ต้า · pvanaparin" },
  { role: "DIRECTED BY", name: "ความรัก" },
  { role: "RUNTIME", name: "3 ปี (แล้วก็ต่อไป)" },
  { role: "CHAPTERS", name: `${chapters.length} ตอน` },
  { role: "SHOTS", name: `${totalShots}+ ช็อต` },
  { role: "LOCATION", name: "ห้าง · ทะเล · ภูเขา · เซินเจิ้น · ฮ่องกง · บ้าน" },
  { role: "SCORE", name: "ความเงียบ และเสียงหัวเราะ" },
  { role: "FORMAT", name: "16:9 · 24fps · film" },
  { role: "A FILM BY", name: "เราสองคน" },
];

export function Finale() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] px-6 py-[18vh] text-center">
      <p className="eyebrow reveal">EPilogue</p>
      <h2
        className="reveal reveal-d1 mt-6 text-[var(--paper)]"
        style={{ fontFamily: "var(--ff-serif-th)", fontWeight: 600, fontSize: "clamp(44px, 9vw, 110px)", lineHeight: 1.05 }}
      >
        ยังไม่จบ
      </h2>
      <p
        className="reveal reveal-d2 mx-auto mt-4 max-w-xl text-[var(--gold)]"
        style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", fontSize: "clamp(17px,2.6vw,24px)" }}
      >
        three years and counting — to be continued.
      </p>

      {/* credits */}
      <div className="reveal reveal-d3 mx-auto mt-16 max-w-md">
        {CREDITS.map((c, i) => (
          <div key={i} className="mb-5">
            <p className="eyebrow" style={{ color: "var(--paper-dim)", fontSize: "10px" }}>
              {c.role}
            </p>
            <p
              className="mt-1 text-[var(--paper)]"
              style={{ fontFamily: "var(--ff-serif-th)", fontSize: i === CREDITS.length - 1 ? "26px" : "18px" }}
            >
              {c.name}
            </p>
          </div>
        ))}
      </div>

      <p
        className="reveal reveal-d4 mt-20 text-[var(--paper-dim)]"
        style={{ fontFamily: "var(--ff-mono)", fontSize: "11px", letterSpacing: "0.3em" }}
      >
        © 2023 – 2026 · เรื่องของเรา
      </p>
      <a
        href="#top"
        className="reveal reveal-d4 mt-6 inline-block text-[var(--gold)] underline-offset-4 hover:underline"
        style={{ fontFamily: "var(--ff-mono)", fontSize: "12px", letterSpacing: "0.2em" }}
      >
        ↑ กลับไปเริ่มเรื่อง
      </a>
    </section>
  );
}
