
'use client';

import { useState, useEffect } from 'react';
import { MobileHomePage } from '@/components/mobile-home-page';
import { WebLandingPage } from '@/components/web-landing-page';
import { Capacitor } from '@capacitor/core';
import { Skeleton } from '@/components/ui/skeleton';

// This component is the entry point for the app.
// It detects if the app is running on a native device (Capacitor) or in a web browser.
export default function Home() {
  const [isNative, setIsNative] = useState<boolean | null>(null);

  useEffect(() => {
    // This check only runs on the client-side after hydration.
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  // Show a loading skeleton while we determine the platform to prevent UI flicker.
  if (isNative === null) {
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
