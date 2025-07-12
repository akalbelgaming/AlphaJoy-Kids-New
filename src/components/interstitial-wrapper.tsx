"use client";

import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { InterstitialAd } from '@/components/ad-placeholder';

// List of paths that trigger the interstitial ad
const adTriggerPaths = ['/letters', '/numbers', '/shapes', '/counting', '/reading', '/drawing', '/story'];

export function InterstitialWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showAd, setShowAd] = useState(false);
  const previousPath = useRef<string | null>(pathname);

  useEffect(() => {
    // Show ad when navigating from home ('/') to an activity page
    if (adTriggerPaths.includes(pathname) && previousPath.current === '/') {
      setShowAd(true);
    }
    
    // Update previous path *after* checking
    previousPath.current = pathname;
    
  }, [pathname]);

  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
    <>
      <InterstitialAd isOpen={showAd} onClose={handleCloseAd} />
      {/* Conditionally render children to prevent content from showing behind the ad */}
      {!showAd && children}
    </>
  );
}
