"use client";

import React from 'react';

// This wrapper is no longer needed as interstitial ads have been removed to comply with AdSense policy.
// It is kept to avoid breaking imports, but its functionality is disabled.
export function InterstitialWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
