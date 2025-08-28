import { useEffect } from "react";

export default function AdSlot({ slot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2457849009076329"
      data-ad-slot={slot}   // replace with your Ad slot id
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
