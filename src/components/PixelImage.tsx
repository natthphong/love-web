"use client";

import Image from "next/image";
import { useState } from "react";

export default function PixelImage({
  src,
  alt,
  className = "",
  fill = true,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center ${className}`}
        style={{
          background:
            "repeating-linear-gradient(45deg, var(--pink-300), var(--pink-300) 8px, var(--pink-200) 8px, var(--pink-200) 16px)",
        }}
      >
        <span className="font-pixel text-[10px] text-center px-2 text-[var(--ink)] opacity-70">
          NO SIGNAL
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      unoptimized
      className={`pixelated object-cover ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
