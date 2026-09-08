"use client";
import type { GalleryItem } from "@/data/gallery";

/** Photo detail card — shows the photo large with its story text. */
export function DetailModal({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  // Detail text: narrative if available, else caption, else date/time
  const hasStory = item.narrative.length > 0;
  const hasCaption = item.caption.length > 0;
  const fallback = !hasStory && !hasCaption;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "grid",
        placeItems: "center",
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(12px)",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 94vw)",
          maxHeight: "92vh",
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: window.innerWidth > 700 ? "1fr 320px" : "1fr",
          gap: 0,
          border: "1px solid rgba(224,180,108,0.35)",
          background: "linear-gradient(145deg,#0e0a07,#070604)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
          borderRadius: 4,
        }}
      >
        {/* Media */}
        <div style={{ position: "relative", background: "#050403", minHeight: 300 }}>
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          ) : (
            <img
              src={item.src}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          )}
        </div>

        {/* Text */}
        <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--ff-mono, monospace)",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "#8a7e6e",
            }}
          >
            {item.group === "story" ? "STORY" : `SCENE ${item.scene}`}
          </p>
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--ff-serif-th, serif)",
              fontWeight: 600,
              fontSize: 22,
              color: "#f2ede3",
              lineHeight: 1.3,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--ff-mono, monospace)",
              fontSize: 11,
              color: "#d8aa66",
              letterSpacing: "0.05em",
            }}
          >
            {item.date}
            {item.time ? ` · ${item.time}` : ""}
          </p>
          {hasCaption && (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--ff-serif-th, serif)",
                fontStyle: "italic",
                fontSize: 15,
                color: "#c8bcad",
                lineHeight: 1.6,
                opacity: 0.85,
              }}
            >
              {item.caption}
            </p>
          )}
          {hasStory && (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--ff-serif-th, serif)",
                fontSize: 15,
                color: "#e8ddce",
                lineHeight: 1.75,
                borderTop: "1px solid rgba(218,172,100,0.18)",
                paddingTop: 14,
              }}
            >
              {item.narrative}
            </p>
          )}
          {fallback && (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--ff-serif-th, serif)",
                fontStyle: "italic",
                fontSize: 14,
                color: "#8a7e6e",
                lineHeight: 1.6,
              }}
            >
              {item.date}
              {item.time ? ` · ${item.time}` : ""}
            </p>
          )}
          <button
            onClick={onClose}
            style={{
              marginTop: "auto",
              alignSelf: "flex-start",
              background: "none",
              border: "1px solid rgba(218,172,100,0.3)",
              color: "#d8aa66",
              padding: "6px 16px",
              borderRadius: 999,
              fontFamily: "var(--ff-mono, monospace)",
              fontSize: 11,
              letterSpacing: "0.2em",
              cursor: "pointer",
            }}
          >
            ปิด ✕
          </button>
        </div>
      </div>
    </div>
  );
}
