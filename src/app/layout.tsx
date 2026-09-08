import type { Metadata } from "next";
import {
  Playfair_Display,
  Noto_Serif_Thai,
  IBM_Plex_Sans_Thai,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const serifThai = Noto_Serif_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-th",
  display: "swap",
});

const sansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-th",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "เรื่องของต้าร์ — สารคดีความรัก ๓ ปี",
  description:
    "A three-year love documentary — 16 chapters, told through real Instagram moments. ต้า & pvanaparin.",
  openGraph: {
    title: "เรื่องของต้าร์ — สารคดีความรัก ๓ ปี",
    description:
      "A three-year love documentary — told through real Instagram moments from Nov 2023 to Jul 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${serif.variable} ${serifThai.variable} ${sansThai.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
