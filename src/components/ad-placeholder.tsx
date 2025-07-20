
"use client";

import { cn } from "@/lib/utils";
import React from "react";
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
  // This component now simply renders the ad slot.
  // The main AdSense script loaded in layout.tsx will automatically
  // find and fill this slot. This avoids the race condition
  // that was causing the "availableWidth=0" error.
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
