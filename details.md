# เรื่องของเรา — สารคดีความรัก ๓ ปี

เว็บไซต์สารคดีคู่รักสไตล์หนัง cinematic documentary สร้างจากโพสต์ Instagram จริงของ `pvanaparin` ทั้ง 16 โพสต์ + 2 story highlights

## ทำอะไรไปบ้าง

### 1. ดึงข้อมูลจาก Instagram (ผ่าน browser automation)
- เปิด Instagram ใน in-app browser (ล็อกอิน session ของผู้ใช้)
- ดึงข้อมูลจาก **16 โพสต์**: caption, วันที่เวลา (UTC→เวลาไทย +7), media URLs (full resolution 1440×1800), จำนวนไลค์/คอมเมนต์
  - อ่าน embedded JSON (`<script type="application/json">`) ที่ Instagram ฝังไว้ในหน้า  parse หา node ที่มี `code` == shortcode แล้ว extract `carousel_media` / `video_versions` / `image_versions2`
  - วันที่เวลาจาก `<time datetime>` ของ permalink
- ดึง **2 story highlights**:
  - `บิ้บิ้` (pvanaparin) — 7 items (ผู้ใช้ยืนยันให้กด View story แม้จะโดนเห็น)
  - `🎇` (__tarrr__) — 12 items
  - paginate ด้วยปุ่ม Next ขณะ pause playback

### 2. ดาวน์โหลด media
- **149 ไฟล์, 62 MB** ลง `public/media/`
  - `public/media/posts/<shortcode>/NN.jpg|mp4` + `_poster.jpg` สำหรับวิดีโอ
  - `public/media/stories/hl1|hl2/NN.jpg`
- 86 รูป + 22 วิดีโอ (โพสต์) + 19 รูป (stories) + 22 video posters
- ทดสอบ curl ดาวน์โหลดสำเร็จทั้งรูป (JPEG 1440×1800) และวิดีโอ (MP4)

### 3. ออกแบบ + พัฒนาเว็บ
เปลี่ยนจาก 8-bit love quest → **cinematic love documentary** สไตล์หนัง

**โครงสร้าง:**
- **Hero**: full-screen Ken Burns crossfade slideshow (6 ภาพ) + ชื่อเรื่อง "เรื่องของเรา" + live counter นับวัน-ชม.-นาที-วิ ตั้งแต่วันแรก (28 พ.ย. 2023)
- **4 Acts** (Act I–IV: 2023 / 2024 / 2025 / 2026) คั่นด้วย act title card
- **16 Chapters** (1 ตอนต่อ 1 โพสต์): scene number ตอนที่, วันที่เวลา, caption เดิม, narrative voice-over (ภาษาไทย), media ตาม layout (hero/solo/duo/strip/video)
- **Interlude: ภาพยนตร์สั้น** — 2 story highlights เป็น film strip แนวนอน (9:16 cards)
- **Finale: ยังไม่จบ** — to be continued + credits roll (starring ต้า & pvanaparin, directed by ความรัก, etc.)

**Design language (film-noir cinematic):**
- สี: near-black `#0b0a08`, warm cream `#ece3d2`, amber gold `#c9a55c`, REC red `#e2483d`
- ฟอนต์: Playfair Display (EN serif) + Noto Serif Thai (TH serif) + IBM Plex Sans Thai (body) + IBM Plex Mono (timecode)
- Film grain overlay (animated SVG noise), vignette, **letterbox bars** บน-ล่าง, **REC ● + live timecode** HUD มุมจอ
- Ken Burns slow zoom, scroll-triggered reveal (fade+translate+blur), **film strip มี sprocket holes** (รูเจาะฟิล์ม)
- วิดีโอ autoplay muted loop เฉพาะตอน in-view (IntersectionObserver), มี poster + "● CLIP" badge

**ไฟล์ที่เปลี่ยน:**
- `src/app/layout.tsx` — ฟอนต์ใหม่ + metadata ไทย
- `src/app/globals.css` — ระบบ design cinematic ทั้งหมด
- `src/app/page.tsx` — ประกอบ Hero + Acts + Chapters + Stories + Finale
- `src/data/film.ts` — ข้อมูล 16 chapters + 2 story reels + startDate (20KB)
- `src/components/cine/` — 9 components (Overlays, Hero, LiveCounter, ActDivider, Chapter, CineMedia, StoriesReel, Finale, useReveal)
- ลบ 8-bit components/data เดิม (18 ไฟล์) + `public/photos/` (30 รูปเดิม)

### 4. Setup env vars (ตามที่ขอ)
- `STREAM_RECOVERY_ENABLED=true` และ `STREAM_RECOVERY_MIDSTREAM_ENABLED=true` ตั้งผ่าน `launchctl setenv` + ใน `~/.zshrc` (ต้อง restart ZCode ถ้าให้มีผลกับ app process)

## การตรวจสอบ
- `next build` ผ่าน ไม่มี TypeScript error (Next 16.3.3, static export)
- เปิดใน browser ตรวจสอบ: 23 sections, 6 หัวข้อ act/interlude/finale, 13 chapter captions, 106 img + 21 video elements
- รูปแรก load สำเร็จที่ความละเอียดเต็ม (naturalWidth=1440)
- ข้อมูลครบ: ทุกโพสต์มีวันที่เวลา แคปชั่น (13/16 ที่มี, 3 โพสต์ไม่มีแคปชั่นใน IG จริง) narrative ไทยทุกตอน

## หมายเหตุ
- IG โพสต์ทั้ง 16 ไม่มีการ tag location จึงไม่มีข้อมูล location โดยตรง — แต่ narrative ใส่ context สถานที่ไว้ (ห้าง, ทะเล, เซินเจิ้น, ฮ่องกง, ภูเขา)
- Story videos (3 รายการ) เป็น blob URL ไม่สามารถดาวน์โหลดตรงได้ — ใช้ frame ภาพนิ่ง (poster) แทน
- ทั้งหมดยังไม่ commit (รอผู้ใช้ตรวจสอบก่อน)
