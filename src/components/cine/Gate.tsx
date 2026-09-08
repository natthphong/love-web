"use client";
import { useEffect, useRef, useState } from "react";

const PASSCODE = "20231128";
const STORAGE_KEY = "ourstory.unlock";

export function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [tries, setTries] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === PASSCODE) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      onUnlock();
    } else {
      setError(true);
      setTries((t) => t + 1);
      setValue("");
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[var(--ink)] px-6">
      {/* faint background still for mood */}
      <img
        src="/media/posts/C0LRo6ELYcwNHnNK4yVaOSpb9On20fb2uHbcLA0/01.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.6) contrast(1.1) brightness(0.28)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(11,10,8,0.5) 0%, rgba(11,10,8,0.92) 100%)" }}
      />

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-sm text-center"
        style={{
          animation: error ? "shake 0.5s" : undefined,
        }}
      >
        <p className="eyebrow title-in" style={{ animationDelay: "0.1s" }}>
          A&nbsp;PRIVATE&nbsp;SCREENING
        </p>
        <h1
          className="title-in mt-5 text-[var(--paper)]"
          style={{
            fontFamily: "var(--ff-serif-th)",
            fontWeight: 600,
            fontSize: "clamp(34px, 7vw, 56px)",
            lineHeight: 1.1,
            animationDelay: "0.4s",
          }}
        >
          เรื่องของต้าร์
        </h1>
        <p
          className="title-in mt-2 text-[var(--gold)]"
          style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", fontSize: "16px", animationDelay: "0.7s" }}
        >
          for ฟร้อนท์ — from ต้าร์
        </p>

        <div className="fade-up mt-10" style={{ animationDelay: "1s" }}>
          <label
            htmlFor="passcode"
            className="block text-left text-[var(--paper-dim)]"
            style={{ fontFamily: "var(--ff-mono)", fontSize: "11px", letterSpacing: "0.2em" }}
          >
            รหัสผ่าน
          </label>
          <input
            ref={inputRef}
            id="passcode"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="• • • • • • • •"
            className="mt-2 w-full border-0 border-b bg-transparent px-0 py-3 text-center text-[var(--paper)] outline-none transition-colors focus:border-[var(--gold)]"
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "24px",
              letterSpacing: "0.4em",
              borderBottom: "2px solid var(--gold-soft)",
            }}
          />
          <button
            type="submit"
            className="mt-6 w-full border py-3 text-[var(--ink)] transition-opacity hover:opacity-90"
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "12px",
              letterSpacing: "0.3em",
              background: "var(--gold)",
              borderColor: "var(--gold)",
            }}
          >
            เข้าชม ▸
          </button>
        </div>

        {error ? (
          <p
            className="mt-5 text-[var(--red)]"
            style={{ fontFamily: "var(--ff-mono)", fontSize: "12px", letterSpacing: "0.15em" }}
          >
            รหัสไม่ถูก — ลองอีกครั้ง
          </p>
        ) : (
          <p
            className="fade-up mt-8 text-[var(--paper-dim)]"
            style={{ fontFamily: "var(--ff-mono)", fontSize: "10px", letterSpacing: "0.18em", animationDelay: "1.4s" }}
          >
            คำใบ: วันแรกของเรา (YYYYMMDD)
          </p>
        )}

        {tries >= 3 ? (
          <p
            className="mt-4 text-[var(--paper-dim)]"
            style={{ fontFamily: "var(--ff-sans-th)", fontSize: "13px" }}
          >
            วันที่เราเริ่มต้นนับเวลาด้วยกัน — 8 หลัก
          </p>
        ) : null}
      </form>

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-7px)}80%{transform:translateX(7px)}}`}</style>
    </section>
  );
}

/** Check sessionStorage for a prior unlock in this session. */
export function wasUnlocked(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}
