
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
