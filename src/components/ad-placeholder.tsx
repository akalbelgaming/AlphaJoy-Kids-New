"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useEffect } from "react";

/**
 * A component that renders a real Google AdSense banner ad unit.
 */
export function AdBanner({ className }: { className?: string }) {
  useEffect(() => {
    const pushAd = () => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    // Delay the ad push slightly to ensure the container has dimensions
    const timeoutId = setTimeout(pushAd, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-gray-100 text-black min-h-[50px]",
        className
      )}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3781633352100587"
        data-ad-slot="YOUR_AD_SLOT_ID" // TODO: Replace with your Ad Unit ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

/**
 * NOTE: This component is now deprecated. Google AdSense automatically
 * handles interstitial ads when page-level ads are enabled.
 * This component is kept for potential future use but is not active.
 */
export function InterstitialAd({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      // Immediately call onClose to prevent the ad from showing,
      // as Google will handle it automatically.
      onClose();
    }
  }, [isOpen, onClose]);

  return null; // Render nothing
}
