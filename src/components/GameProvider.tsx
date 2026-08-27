"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type GameCtx = {
  muted: boolean;
  toggleMuted: () => void;
  playBlip: (freq?: number) => void;
  secretMode: boolean;
  score: number;
};

const Ctx = createContext<GameCtx | null>(null);

export function useGame() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // safe fallback for components rendered outside provider
    return {
      muted: true,
      toggleMuted: () => {},
      playBlip: () => {},
      secretMode: false,
      score: 0,
    } as GameCtx;
  }
  return ctx;
}

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function GameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [muted, setMuted] = useState(true);
  const [secretMode, setSecretMode] = useState(false);
  const [score, setScore] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const progressRef = useRef(0);

  const playBlip = useCallback(
    (freq = 660) => {
      if (muted) return;
      try {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AC();
        }
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      } catch {
        // ignore audio errors
      }
    },
    [muted]
  );

  const toggleMuted = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  // konami code listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[progressRef.current];
      if (key === expected) {
        progressRef.current += 1;
        if (progressRef.current === KONAMI.length) {
          setSecretMode((s) => !s);
          progressRef.current = 0;
        }
      } else {
        progressRef.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-secret",
      secretMode ? "1" : "0"
    );
  }, [secretMode]);

  // score increments on scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? window.scrollY / max : 0;
        setScore(Math.floor(pct * 9999));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Ctx.Provider value={{ muted, toggleMuted, playBlip, secretMode, score }}>
      {children}
    </Ctx.Provider>
  );
}
