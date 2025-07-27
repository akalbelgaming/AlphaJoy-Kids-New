
'use client';

import { useState, useEffect } from 'react';
import { WebLandingPage } from '@/components/web-landing-page';
import { MobileHomePage } from '@/components/mobile-home-page';

// This function checks if the app is running on a native platform (Android/iOS)
const isNativePlatform = () => {
  // Use a type guard to ensure Capacitor is on the window object
  if (typeof window !== 'undefined' && (window as any).Capacitor) {
    return (window as any).Capacitor.isNativePlatform();
  }
  return false;
};

export default function Home() {
  const [isNative, setIsNative] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This code now runs only on the client-side
    setIsClient(true);
    setIsNative(isNativePlatform());
  }, []);

  if (!isClient) {
    // While waiting for the client to render, show a loading state
    // or a default page. This also helps with server-side rendering/crawlers.
    return <WebLandingPage />;
  }

  // If it's a native app (Android/iOS), show the main game menu.
  // Otherwise (in a regular web browser), show the landing page.
  return isNative ? <MobileHomePage /> : <WebLandingPage />;
}
