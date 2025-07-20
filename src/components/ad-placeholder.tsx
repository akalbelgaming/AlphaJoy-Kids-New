"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

/**
 * A component that renders a real Google AdSense banner ad unit.
 */
export function AdBanner({ className }: { className?: string }) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // This effect runs when the adRef is attached to the <ins> element.
    // This is a more reliable way to know the container is in the DOM.
    if (adRef.current && adRef.current.children.length === 0) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []); // The dependency array is empty to run once on mount. The check inside handles the logic.

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-gray-100 text-black min-h-[50px]",
        className
      )}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3781633352100587" // This is your publisher ID
        data-ad-slot="YOUR_AD_SLOT_ID" // TODO: Replace with your Ad Unit ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

/**
 * A component that shows an interstitial ad.
 * This is currently disabled but kept for reference.
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
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Interstitial ad error", e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
     <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Advertisement</AlertDialogTitle>
          <AlertDialogDescription>
            Please enjoy this ad while we load the next activity for you.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="min-h-[250px] flex items-center justify-center">
            {/* AdSense will automatically fill this */}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Continue to App</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
