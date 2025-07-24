import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { InterstitialWrapper } from '@/components/interstitial-wrapper';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'AlphaJoy Kids: ABC, 123 & Art',
  description: 'A fun game for kids to trace letters, count numbers, draw, and listen to stories!',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3781633352100587" crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <InterstitialWrapper>
          {children}
        </InterstitialWrapper>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
