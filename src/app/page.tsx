
'use client';

import { useState, useEffect } from 'react';
import { MobileHomePage } from '@/components/mobile-home-page';
import { WebLandingPage } from '@/components/web-landing-page';
import { Capacitor } from '@capacitor/core';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [isNative, setIsNative] = useState(true); // Default to native to avoid flicker
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // This check only runs on the client-side.
    setIsNative(Capacitor.isNativePlatform());
    setIsChecking(false);
  }, []);

  if (isChecking) {
    // Show a loading skeleton only while we determine the platform.
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center p-4 gap-4 bg-background">
        <Skeleton className="h-16 w-full max-w-sm" />
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  // If it's a native app, show the mobile home page.
  // Otherwise, show the web landing page for browsers.
  return isNative ? <MobileHomePage /> : <WebLandingPage />;
}
