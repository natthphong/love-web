import { chapters, storyReels, type Media } from "./film";

/** Flat gallery item — one per photo/video/story frame. */
export type GalleryItem = {
  id: string;
  src: string;
  type: "image" | "video";
  poster?: string;
  /** Detail-card title (scene number or story name). */
  title: string;
  date: string;
  time: string;
  caption: string;
  narrative: string;
  /** "post" or "story". */
  group: "post" | "story";
  /** Chapter scene label for grouping. */
  scene: string;
};

/** Intro clip — first story of highlight 18037238878982845 (hl2 🎇). */
export const introClip = {
  src: "/media/stories/hl2/01.jpg",
  label: "พ.ย. 2023",
  title: "จุดเริ่มต้น",
};

/** Flatten all post media + story frames into a single gallery list. */
function buildGallery(): GalleryItem[] {
  const items: GalleryItem[] = [];

  for (const ch of chapters) {
    for (let i = 0; i < ch.media.length; i++) {
      const m = ch.media[i];
      items.push({
        id: `${ch.id}-${i}`,
        src: m.src,
        type: m.type,
        poster: m.poster,
        title: `ตอน ${ch.scene}`,
        date: ch.date,
        time: ch.time,
        caption: ch.caption,
        narrative: ch.narrative,
        group: "post",
        scene: ch.scene,
      });
    }
  }

  // Story frames (after all post photos)
  for (const reel of storyReels) {
    for (const item of reel.items) {
      items.push({
        id: `story-${item.src}`,
        src: item.src,
        type: "image",
        title: reel.name,
        date: item.label,
        time: "",
        caption: "",
        narrative: "",
        group: "story",
        scene: reel.name,
      });
    }
  }

  return items;
}

export const galleryItems: GalleryItem[] = buildGallery();
