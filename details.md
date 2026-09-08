# Task Report: เพิ่มเพลงประกอบ YouTube เริ่ม 00:20 loop เมื่อใส่รหัสถูก

**Date:** 2026-09-08
**Branch:** main
**Commit:** 57c9457

## สิ่งที่ทำ

เพิ่มเพลงประกอบจาก YouTube (video ID: `ni326FjAV6Q`) ที่เริ่มเล่นทันทีเมื่อผู้ใช้ใส่รหัสผ่านถูก (`20231128`) โดยเพลงจะ:

- เริ่มเล่นที่ **00:20 วินาที**
- **Loop กลับไป 00:20** เมื่อเพลงจบ (ไม่ใช่ 00:00)
- มีปุ่ม **mute/unmute** มุมขวาล่าง สไตล์ cinematic (gold/mono)

## ไฟล์ที่เปลี่ยน

1. **`src/components/cine/Soundtrack.tsx`** (ใหม่) — Component ที่ใช้ YouTube IFrame Player API สร้าง hidden player ขนาด 1×1 ซ่อนไม่ให้เห็น พร้อม logic สำหรับ:
   - โหลด YouTube IFrame API แบบ lazy
   - สร้าง player ที่ start=20, autoplay=1
   - ตรวจจับ `onStateChange` เมื่อ video จบ (state 0) → seekTo(20) + playVideo() เพื่อ loop กลับ 00:20
   - ปุ่ม toggle mute/unmute สไตล์ cinematic

2. **`src/app/page.tsx`** — เพิ่ม `<Soundtrack />` ให้ render เมื่อ gate ปลดล็อก (locked=false) โดยอยู่ใน fragment ร่วมกับ `<Documentary />`

## การทำงาน

- ผู้ใช้ใส่รหัส → คลิก "เข้าชม ▸" → `onUnlock()` → `setLocked(false)` → `<Soundtrack />` mount → YouTube API โหลด → player ready → seekTo(20) + playVideo()
- เนื่องจากการเล่นเกิดภายใน user gesture chain ของการคลิกปุ่ม → autoplay ไม่ถูกบล็อก
- เมื่อเพลงจบ → onStateChange ตรวจจับ ENDED → seekTo(20) + playVideo() → loop

## Verification

- `npx next build` ✅ Compiled successfully (TypeScript ผ่าน, static pages สร้างครบ)
- `git pull origin main` → Already up to date
- `git push origin main` → f411a1b..57c9457 main -> main ✅
