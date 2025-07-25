
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

/**
 * A component that renders a real Google AdMob banner ad unit.
 */
export function AdBanner({ className }: { className?: string }) {

  useEffect(() => {
    const pushAd = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    // Delay the push to ensure the container is rendered and has a width.
    const timeout = setTimeout(pushAd, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center text-black min-h-[50px] bg-transparent",
        className
      )}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3781633352100587"
        data-ad-slot="6590213011"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
