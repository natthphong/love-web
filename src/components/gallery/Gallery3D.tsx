"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { galleryItems, introClip, type GalleryItem } from "@/data/gallery";
import { ShootingStars } from "./ShootingStars";
import { Music } from "./Music";
import { DetailModal } from "./DetailModal";

// ── corridor geometry ──
const WALL_X = 520;          // wall distance from center axis
const STATION_SP = 760;      // distance between stations
const FRAME_W = 360;         // frame width
const FRAME_H = 480;         // frame height (portrait-ish)
const PERSPECTIVE = 1150;
const RENDER_RANGE = 5;      // stations rendered each side of camera
const MOVE_SPEED = 14;       // px per key frame
const MAX_Z = galleryItems.length * STATION_SP * 0.5 + 1000;

/** Single framed photo on a wall. */
function Frame({
  item,
  station,
  side,
  onClick,
}: {
  item: GalleryItem;
  station: number;
  side: 1 | -1 | 0;
  onClick: (item: GalleryItem) => void;
}) {
  const z = -station * STATION_SP;
  const x = side * WALL_X;
  // side 0 = back wall (facing camera), side 1 = right, -1 = left
  const rotY = side === 0 ? 0 : side === 1 ? -90 : 90;
  const w = side === 0 ? FRAME_W * 1.3 : FRAME_W;
  const h = side === 0 ? FRAME_H * 1.3 : FRAME_H;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        transform: `translate3d(${x}px,0px,${z}px) rotateY(${rotY}deg)`,
        transformStyle: "preserve-3d",
        cursor: "pointer",
      }}
      onClick={() => onClick(item)}
    >
      {/* frame border */}
      <div
        style={{
          position: "absolute",
          inset: -10,
          border: "2px solid rgba(201,165,92,0.45)",
          boxShadow:
            "0 0 30px rgba(201,165,92,0.15), inset 0 0 20px rgba(0,0,0,0.5)",
          background: "#050403",
          pointerEvents: "none",
        }}
      />
      {/* media */}
      {item.type === "video" ? (
        <video
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="none"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
      {/* plaque */}
      <div
        style={{
          position: "absolute",
          bottom: -42,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--ff-mono, monospace)",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "rgba(201,165,92,0.7)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          pointerEvents: "none",
        }}
      >
        {item.scene} · {item.date}
      </div>
    </div>
  );
}

export function Gallery3D() {
  const worldRef = useRef<HTMLDivElement>(null);
  const camZ = useRef(0);
  const yaw = useRef(0);
  const pitch = useRef(0);
  const targetZ = useRef(0);
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);
  const keys = useRef<Record<string, boolean>>({});
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [range, setRange] = useState({ start: 0, end: 12 });
  const [hud, setHud] = useState({ z: 0, pct: 0 });

  // place items: station 0 = intro (back wall), then pairs on walls
  // item index i → station = ceil(i / 2), side = i even ? left : right
  const stationOf = (i: number) => (i === -1 ? 0 : Math.floor(i / 2) + 1);
  const sideOf = (i: number) => (i % 2 === 0 ? -1 : 1);

  const handleSelect = useCallback((item: GalleryItem) => setSelected(item), []);

  // ── camera loop ──
  useEffect(() => {
    let raf = 0;
    let lastRangeStart = -999;

    function loop() {
      // keyboard movement
      const k = keys.current;
      if (k["w"] || k["arrowup"]) targetZ.current += MOVE_SPEED;
      if (k["s"] || k["arrowdown"]) targetZ.current -= MOVE_SPEED;
      if (k["a"] || k["arrowleft"]) targetYaw.current += 1.5;
      if (k["d"] || k["arrowright"]) targetYaw.current -= 1.5;

      // clamp
      targetZ.current = Math.max(-200, Math.min(MAX_Z, targetZ.current));
      targetYaw.current = Math.max(-45, Math.min(45, targetYaw.current));
      targetPitch.current = Math.max(-15, Math.min(15, targetPitch.current));

      // lerp
      camZ.current += (targetZ.current - camZ.current) * 0.12;
      yaw.current += (targetYaw.current - yaw.current) * 0.15;
      pitch.current += (targetPitch.current - pitch.current) * 0.15;

      if (worldRef.current) {
        worldRef.current.style.transform =
          `translateZ(${camZ.current}px) rotateY(${yaw.current}deg) rotateX(${pitch.current}deg)`;
      }

      // visible station range
      const camStation = camZ.current / STATION_SP;
      const start = Math.max(0, Math.floor(camStation) - RENDER_RANGE);
      const end = Math.floor(camStation) + RENDER_RANGE + 2;
      if (start !== lastRangeStart) {
        lastRangeStart = start;
        setRange({ start, end });
      }

      // hud throttle
      if (raf % 10 === 0) {
        setHud({ z: camZ.current, pct: Math.round((camZ.current / MAX_Z) * 100) });
      }

      raf++;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── input handlers ──
  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase()))
        e.preventDefault();
    };
    const ku = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZ.current += e.deltaY * 0.6;
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("wheel", wheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      window.removeEventListener("wheel", wheel);
    };
  }, []);

  // ── pointer drag to look (window-level, so frame clicks still work) ──
  const drag = useRef({ active: false, x: 0, y: 0, moved: false });
  useEffect(() => {
    const pd = (e: PointerEvent) => {
      drag.current = { active: true, x: e.clientX, y: e.clientY, moved: false };
    };
    const pm = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
      targetYaw.current = Math.max(-45, Math.min(45, targetYaw.current + dx * 0.15));
      targetPitch.current = Math.max(-15, Math.min(15, targetPitch.current - dy * 0.08));
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
    };
    const pu = () => { drag.current.active = false; };
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    return () => {
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
    };
  }, []);

  // ── render visible frames ──
  const frames: React.ReactNode[] = [];
  // intro at station 0
  frames.push(
    <div
      key="intro"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: FRAME_W * 1.5,
        height: FRAME_H * 1.5,
        marginLeft: -(FRAME_W * 1.5) / 2,
        marginTop: -(FRAME_H * 1.5) / 2,
        transform: "translate3d(0px,0px,0px) rotateY(0deg)",
        cursor: "pointer",
      }}
      onClick={() =>
        setSelected({
          id: "intro",
          src: introClip.src,
          type: "image",
          title: introClip.title,
          date: introClip.label,
          time: "",
          caption: "",
          narrative: "จุดเริ่มต้นของเรื่องเล่า ๓ ปี — เดินผ่าน gallery เพื่อดูเรื่องราวของเรา",
          group: "story",
          scene: "00",
        })
      }
    >
      <div
        style={{
          position: "absolute",
          inset: -12,
          border: "3px solid rgba(201,165,92,0.6)",
          boxShadow: "0 0 50px rgba(201,165,92,0.25), inset 0 0 30px rgba(0,0,0,0.6)",
          background: "#050403",
          pointerEvents: "none",
        }}
      />
      <img
        src={introClip.src}
        alt={introClip.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          animation: "kenburns 14s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -48,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--ff-serif-th, serif)",
          fontSize: 18,
          color: "rgba(201,165,92,0.85)",
          pointerEvents: "none",
        }}
      >
        เรื่องของเรา
      </div>
    </div>,
  );

  for (let i = 0; i < galleryItems.length; i++) {
    const st = stationOf(i);
    if (st < range.start || st > range.end) continue;
    frames.push(
      <Frame
        key={galleryItems[i].id}
        item={galleryItems[i]}
        station={st}
        side={sideOf(i) as 1 | -1}
        onClick={handleSelect}
      />,
    );
  }

  return (
    <>
      <ShootingStars />
      <Music />

      {/* scene */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          background: "#050403",
          perspective: PERSPECTIVE,
          perspectiveOrigin: "50% 50%",
          touchAction: "none",
          cursor: "grab",
        }}
      >
        <div
          ref={worldRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* floor */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 2400,
              height: MAX_Z + 4000,
              marginLeft: -1200,
              marginTop: -2000,
              transform: "translate3d(0px,340px,0px) rotateX(90deg)",
              background:
                "linear-gradient(180deg, rgba(20,16,12,0.95), rgba(8,6,5,1) 60%), repeating-linear-gradient(90deg, rgba(201,165,92,0.04) 0 1px, transparent 1px 120px)",
              pointerEvents: "none",
            }}
          />
          {/* ceiling */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 2400,
              height: MAX_Z + 4000,
              marginLeft: -1200,
              marginTop: -2000,
              transform: "translate3d(0px,-340px,0px) rotateX(-90deg)",
              background:
                "linear-gradient(0deg, rgba(15,12,9,0.9), rgba(5,4,3,1) 70%)",
              pointerEvents: "none",
            }}
          />
          {frames}
        </div>
      </div>

      {/* vignette */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 50%, transparent 38%, rgba(0,0,0,0.25) 72%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* HUD */}
      <div
        style={{
          position: "fixed",
          left: 20,
          top: 16,
          zIndex: 50,
          fontFamily: "var(--ff-mono, monospace)",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(201,165,92,0.6)",
        }}
      >
        เรื่องของเรา · 3D GALLERY
      </div>
      <div
        style={{
          position: "fixed",
          right: 20,
          top: 16,
          zIndex: 50,
          fontFamily: "var(--ff-mono, monospace)",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(201,165,92,0.6)",
        }}
      >
        ต้าร์ & ฟร้อนท์
      </div>
      <div
        style={{
          position: "fixed",
          left: 20,
          bottom: 18,
          zIndex: 50,
          fontFamily: "var(--ff-mono, monospace)",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "rgba(180,168,148,0.5)",
        }}
      >
        SCROLL / W·A·S·D เดิน · DRAG หันมอง
      </div>
      {/* progress bar */}
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: 2, zIndex: 50, background: "rgba(201,165,92,0.1)" }}>
        <div
          style={{
            height: "100%",
            width: `${Math.max(0, Math.min(100, hud.pct))}%`,
            background: "rgba(201,165,92,0.5)",
            transition: "width .15s",
          }}
        />
      </div>

      <DetailModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
