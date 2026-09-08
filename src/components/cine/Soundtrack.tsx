"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hidden YouTube soundtrack that starts at 00:20 and loops back to 00:20
 * whenever the track ends.  A small mute/unmute toggle sits in the corner.
 *
 * The component mounts only after the passcode gate is unlocked, so the
 * resulting play() call happens within the user-gesture chain of the submit
 * click and is not blocked by autoplay policies.
 */

const VIDEO_ID = "ni326FjAV6Q";
const START_SECOND = 20; // 00:20

/* ---- minimal YouTube IFrame Player API typings ---- */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function Soundtrack() {
  const playerRef = useRef<any>(null);
  const readyRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function createPlayer() {
      if (cancelled || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player("yt-soundtrack", {
        videoId: VIDEO_ID,
        playerVars: {
          start: START_SECOND,
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: any) => {
            readyRef.current = true;
            e.target.seekTo(START_SECOND, true);
            e.target.playVideo();
            // reveal the toggle after the track starts
            setTimeout(() => !cancelled && setShowToggle(true), 1200);
          },
          onStateChange: (e: any) => {
            // 0 === ENDED → loop back to START_SECOND
            if (e.data === 0) {
              const p = playerRef.current;
              if (p) {
                p.seekTo(START_SECOND, true);
                p.playVideo();
              }
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      // load API once
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
    }

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
      readyRef.current = false;
    };
  }, []);

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    if (muted) {
      p.unMute();
      p.playVideo();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  };

  return (
    <>
      {/* hidden YouTube player — 1×1, visually hidden but still functional */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          left: -9999,
          top: -9999,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div id="yt-soundtrack" />
      </div>

      {/* mute / unmute toggle */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "เปิดเสียงเพลง" : "ปิดเสียงเพลง"}
        className="fixed z-50 transition-all duration-700"
        style={{
          right: 20,
          bottom: 20,
          opacity: showToggle ? 0.7 : 0,
          pointerEvents: showToggle ? "auto" : "none",
          transform: showToggle ? "translateY(0)" : "translateY(8px)",
          background: "rgba(11,10,8,0.55)",
          border: "1px solid rgba(201,165,92,0.4)",
          borderRadius: 999,
          padding: "8px 14px",
          color: muted ? "var(--paper-dim)" : "var(--gold)",
          fontFamily: "var(--ff-mono)",
          fontSize: 11,
          letterSpacing: "0.15em",
          backdropFilter: "blur(4px)",
          cursor: "pointer",
        }}
      >
        {muted ? "♪ ─ ─" : "♪ ▸ ▸"}
      </button>
    </>
  );
}
