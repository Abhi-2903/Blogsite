// src/components/AdSlot.tsx
"use client";
import { useEffect } from "react";

type AdSlotProps = {
  slot: string; // TypeScript knows slot is a string
};

export default function AdSlot({ slot }: AdSlotProps) {
  useEffect(() => {
    try {
      // TypeScript doesn't know adsbygoogle exists on window
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2457849009076329"
      data-ad-slot={slot} // Use the prop here
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
