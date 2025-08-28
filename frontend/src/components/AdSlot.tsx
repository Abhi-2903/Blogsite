"use client"

import { useEffect } from "react"

interface AdSlotProps {
  adSlot?: string
  className?: string
}

export default function AdSlot({
  adSlot = "1076716203", // Using your default ad slot from Google AdSense
  className = "",
}: AdSlotProps) {
  useEffect(() => {
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement("script")
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2457849009076329"
      script.async = true
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)
    }

    const timer = setTimeout(() => {
      try {
   
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        ;(window as any).adsbygoogle.push({})
      } catch (error) {
        console.error("AdSense error:", error)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2457849009076329"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
