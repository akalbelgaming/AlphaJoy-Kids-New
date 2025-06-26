"use client";

import { cn } from "@/lib/utils";
import { VenetianMask } from "lucide-react";

export function AdBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-muted/50 border border-dashed rounded-lg text-muted-foreground p-4 min-h-[60px]",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <VenetianMask className="h-6 w-6" />
        <p className="text-sm font-medium">Advertisement</p>
      </div>
    </div>
  );
}

export function InterstitialAd({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[101] bg-black/80 flex items-center justify-center p-4">
      <div className="relative bg-background rounded-lg shadow-xl w-full max-w-md h-[80vh] flex flex-col items-center justify-center text-center p-6 border">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-background rounded-full p-1.5 text-foreground/70 hover:text-foreground hover:bg-muted"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span className="sr-only">Close</span>
        </button>
        <div className="flex flex-col items-center gap-4">
          <VenetianMask className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold font-headline">Advertisement</h2>
          <p className="text-muted-foreground">
            Your content will resume shortly.
          </p>
        </div>
        <div className="absolute bottom-4 text-xs text-muted-foreground">
          Ad placeholder
        </div>
      </div>
    </div>
  );
}
