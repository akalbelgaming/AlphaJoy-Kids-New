"use client";

import { cn } from "@/lib/utils";
import { PlayCircle, Video } from "lucide-react";

export function AdBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-muted/50 border border-dashed rounded-lg text-muted-foreground p-4 min-h-[60px]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Video className="h-6 w-6" />
        <p className="text-sm font-medium">Video Advertisement</p>
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
    <div className="fixed inset-0 z-[101] bg-black/90 flex items-center justify-center p-4">
      <div className="relative bg-black rounded-lg w-full max-w-md h-[80vh] flex flex-col items-center justify-between p-6 border border-gray-700">
        <div className="w-full flex justify-between items-center text-white">
          <p className="text-sm">Video will play automatically</p>
          <button
            onClick={onClose}
            className="bg-gray-800/50 rounded-full p-1.5 text-white hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 text-white">
          <PlayCircle className="h-20 w-20 text-white/50" />
          <h2 className="text-2xl font-bold">Advertisement</h2>
        </div>

        <div className="w-full">
          <p className="text-xs text-white/50 text-right">Your content will resume shortly.</p>
          <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
            <div className="bg-yellow-400 h-1 rounded-full animate-pulse" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
