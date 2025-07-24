
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
    const timeout = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error("AdSense error:", err);
        }
    }, 100);

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
        data-ad-client="ca-app-pub-9307441315088203" // Your AdMob App ID's publisher part
        data-ad-slot="6590213011" // Your AdMob Banner Ad Unit ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
