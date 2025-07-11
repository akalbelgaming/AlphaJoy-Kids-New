"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlayCircle, Video, X } from "lucide-react";
import React, { useState, useEffect } from "react";

/**
 * A component that visually simulates a Google AdMob banner test ad.
 */
export function AdBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-start bg-gray-100 border border-gray-300 rounded-lg text-black p-2 min-h-[60px] shadow-sm",
        className
      )}
    >
      <div className="flex w-full items-center gap-3">
        <div className="flex-shrink-0">
          <Image 
            src="https://placehold.co/50x50.png" 
            data-ai-hint="logo"
            alt="Ad icon" 
            width={50} 
            height={50} 
            className="rounded-md"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold bg-yellow-400 px-1 rounded-[3px]">Ad</span>
            <p className="text-sm font-bold">Test Ad: Awesome Game</p>
          </div>
          <p className="text-xs text-gray-600">Install this great new game now!</p>
        </div>
        <button className="bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          Install
        </button>
      </div>
    </div>
  );
}

const AD_DURATION = 5; // 5 seconds for the ad video simulation

/**
 * A component that visually simulates a Google AdMob interstitial test ad.
 */
export function InterstitialAd({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isClosable, setIsClosable] = useState(false);
  const [countdown, setCountdown] = useState(AD_DURATION);

  useEffect(() => {
    if (isOpen) {
      setIsClosable(false);
      setCountdown(AD_DURATION);

      // Start the countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setIsClosable(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[101] bg-black/90 flex items-center justify-center p-4">
      <div className="relative bg-black rounded-lg w-full max-w-md h-[90vh] flex flex-col items-center justify-center p-2 border border-gray-700 overflow-hidden" onClick={(e) => isClosable && e.stopPropagation()}>
        <div className="w-full flex justify-between items-center absolute top-2 left-2 right-2 px-2 z-10">
            <span className="text-xs font-bold bg-yellow-400 px-1 rounded-[3px] text-black">Ad</span>
            <div className="flex items-center gap-2">
              {!isClosable && (
                <span className="text-white text-sm bg-black/50 rounded-full px-3 py-1">
                  {countdown}s
                </span>
              )}
              <button
                  onClick={onClose}
                  disabled={!isClosable}
                  className={cn(
                    "rounded-full p-1.5 text-white transition-colors",
                    isClosable ? "bg-gray-800/80 hover:bg-gray-700" : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                  )}
              >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close Ad</span>
              </button>
            </div>
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-center gap-4 text-white bg-gray-900 my-12">
            <Video className="h-20 w-20 text-white/50" />
            <h2 className="text-xl font-bold">Test Video Ad</h2>
            <p className="text-sm text-gray-400">Your content will resume after the ad.</p>
        </div>
        
        <div className="w-full bg-white p-3 flex items-center gap-3">
             <div className="flex-shrink-0">
                <Image 
                    src="https://placehold.co/50x50.png"
                    data-ai-hint="logo" 
                    alt="Ad icon" 
                    width={50} 
                    height={50} 
                    className="rounded-md"
                />
            </div>
            <div className="flex-1">
                <p className="text-base font-bold text-black">Test Ad: Awesome Game</p>
                <p className="text-sm text-gray-700">Install this great new game now!</p>
            </div>
            <button className="bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                Install
            </button>
        </div>

      </div>
    </div>
  );
}
