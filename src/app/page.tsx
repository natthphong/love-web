"use client";

import { useState } from "react";
import { Gate, wasUnlocked } from "@/components/cine/Gate";
import { Gallery3D } from "@/components/gallery/Gallery3D";

export default function Page() {
  const [locked, setLocked] = useState(!wasUnlocked());

  return (
    <div className="relative">
      {locked ? (
        <Gate onUnlock={() => setLocked(false)} />
      ) : (
        <Gallery3D />
      )}
    </div>
  );
}
