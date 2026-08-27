import type { Metadata } from "next";
import { Press_Start_2P, VT323, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt",
  display: "swap",
});

const plexThai = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600"],
  subsets: ["thai", "latin"],
  variable: "--font-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOVE QUEST — 3rd Anniversary",
  description: "A pixel-art RPG love story — 3 years and counting.",
  openGraph: {
    title: "LOVE QUEST — 3rd Anniversary",
    description: "A pixel-art RPG love story — 3 years and counting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${pressStart.variable} ${vt323.variable} ${plexThai.variable} h-full`}
    >
      <body className="min-h-full flex flex-col dither-bg">
        <div className="scanlines" />
        {children}
      </body>
    </html>
  );
}
