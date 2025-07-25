
'use client';

import { WebLandingPage } from '@/components/web-landing-page';

export default function Home() {
  // Always render the WebLandingPage component for all users on all devices.
  // This forces users to go to the app store to download the mobile app
  // instead of using it in the browser.
  return <WebLandingPage />;
}
