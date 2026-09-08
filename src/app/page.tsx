"use client";

import { useState } from "react";
import { useRevealOnScroll } from "@/components/cine/useReveal";
import { Overlays } from "@/components/cine/Overlays";
import { Gate, wasUnlocked } from "@/components/cine/Gate";
import { Hero } from "@/components/cine/Hero";
import { ActDivider } from "@/components/cine/ActDivider";
import { Chapter } from "@/components/cine/Chapter";
import { StoriesReel } from "@/components/cine/StoriesReel";
import { Finale } from "@/components/cine/Finale";
import { Soundtrack } from "@/components/cine/Soundtrack";
import { chapters } from "@/data/film";

function Documentary() {
  const ref = useRevealOnScroll();
  const I = chapters.slice(0, 3);
  const II = chapters.slice(3, 6);
  const III = chapters.slice(6, 10);
  const IV = chapters.slice(10, 16);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} id="top" className="relative">
      <Hero />

      <ActDivider
        roman="I"
        title="จุดเริ่มต้น"
        year="2023"
        subtitle="โพสต์แรกปักหมุดไว้บนหน้าโปรไฟล์ — วันนั้นยังไม่มีใครรู้ว่ามันจะนับต่อไปอีกสามปี"
      />
      {I.map((ch) => (
        <Chapter key={ch.id} ch={ch} />
      ))}

      <ActDivider
        roman="II"
        title="ปีแรกของเรา"
        year="2024"
        subtitle="วาเลนไทน์ปีแรก เที่ยวด้วยกันครั้งแรก เริ่มนับว่า ‘ปีนี้’ ของเรา"
      />
      {II.map((ch) => (
        <Chapter key={ch.id} ch={ch} />
      ))}

      <ActDivider
        roman="III"
        title="ปีที่สอง"
        year="2025"
        subtitle="ปีที่เริ่มพูดว่ารักกันเป็นภาษาอื่น แล้วก็ยังกินกันเยอะขึ้น"
      />
      {III.map((ch) => (
        <Chapter key={ch.id} ch={ch} />
      ))}

      <ActDivider
        roman="IV"
        title="ปีที่สาม"
        year="2026"
        subtitle="วาเลนไทน์ปีที่สาม ทริปจีน-ฮ่องกง ทะเล แล้วก็ยังมีตอนต่อไป"
      />
      {IV.map((ch) => (
        <Chapter key={ch.id} ch={ch} />
      ))}

      <StoriesReel />
      <Finale />
    </div>
  );
}

export default function Page() {
  const [locked, setLocked] = useState(!wasUnlocked());

  return (
    <div className="relative">
      <Overlays />
      {locked ? (
        <Gate onUnlock={() => setLocked(false)} />
      ) : (
        <>
          <Soundtrack />
          <Documentary />
        </>
      )}
    </div>
  );
}
