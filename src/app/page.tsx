
'use client';

import { useState, useEffect } from 'react';
import { WebLandingPage } from '@/components/web-landing-page';
import { MobileHomePage } from '@/components/mobile-home-page';
import { Loader2 } from 'lucide-react';

const isNativePlatform = () => {
  if (typeof window !== 'undefined' && (window as any).Capacitor) {
    return (window as any).Capacitor.isNativePlatform();
  }
  return false;
};

export default function Home() {
  const [isNative, setIsNative] = useState<boolean | null>(null);

  useEffect(() => {
    // This check runs only on the client-side.
    // It sets the state to true or false after checking the platform.
    setIsNative(isNativePlatform());
  }, []);

  // While waiting for the client to check the platform, show a loading indicator.
  // This prevents the flicker of the wrong page showing.
  if (isNative === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // If isNative is true, show the mobile app home.
  // If isNative is false, show the web landing page.
  return isNative ? <MobileHomePage /> : <WebLandingPage />;
}
