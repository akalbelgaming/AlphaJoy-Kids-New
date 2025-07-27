
'use client';

import { MobileHomePage } from '@/components/mobile-home-page';

// This component is the entry point for the app.
// For the mobile app build, we will always show the MobileHomePage.
// The logic to differentiate between web and mobile has been removed from here
// and is now handled by deploying the web-landing-page separately for the website.
export default function Home() {
  return <MobileHomePage />;
}
