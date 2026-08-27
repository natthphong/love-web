"use client";

import { useState } from "react";
import GameProvider from "@/components/GameProvider";
import BootScreen from "@/components/BootScreen";
import Hud from "@/components/Hud";
import CursorTrail from "@/components/CursorTrail";
import SecretMessage from "@/components/SecretMessage";
import Hero from "@/components/Hero";
import StatsPanel from "@/components/StatsPanel";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import LoveLetter from "@/components/LoveLetter";
import Footer from "@/components/Footer";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <GameProvider>
      <CursorTrail />
      <SecretMessage />
      {!started && <BootScreen onStart={() => setStarted(true)} />}
      {started && (
        <>
          <Hud />
          <main className="flex-1">
            <Hero />
            <StatsPanel />
            <Timeline />
            <Gallery />
            <LoveLetter />
          </main>
          <Footer />
        </>
      )}
    </GameProvider>
  );
}
