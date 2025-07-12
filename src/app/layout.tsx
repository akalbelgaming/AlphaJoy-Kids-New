import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { InterstitialWrapper } from '@/components/interstitial-wrapper';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Trace & Earn',
  description: 'A fun tracing game for kids to learn numbers and alphabets and earn points!',
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