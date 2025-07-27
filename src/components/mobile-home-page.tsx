
'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Brush,
  Fingerprint,
  Mic,
  Palette,
  Shapes,
  SpellCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AppLogo } from '@/components/app-logo';
import { ScrollArea } from './ui/scroll-area';
import { AdBanner } from './ad-placeholder';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const activities = [
  { href: '/letters', title: 'Letters', icon: 'A', color: 'bg-red-500' },
  { href: '/numbers', title: 'Numbers', icon: '123', color: 'bg-blue-500' },
  { href: '/hindi', title: 'Hindi', icon: 'अ', color: 'bg-orange-500' },
  { href: '/hindivowels', title: 'Hindi Swar', icon: 'अa', color: 'bg-pink-500' },
  { href: '/pahada', title: 'Tables', icon: '2x1', color: 'bg-cyan-500' },
  { href: '/shapes', title: 'Shapes', icon: <Shapes className="h-12 w-12" />, color: 'bg-yellow-500' },
  { href: '/counting', title: 'Counting', icon: <Fingerprint className="h-12 w-12" />, color: 'bg-green-500' },
  { href: '/drawing', title: 'Drawing', icon: <Brush className="h-12 w-12" />, color: 'bg-indigo-500' },
  { href: '/coloring', title: 'AI Coloring', icon: <Palette className="h-12 w-12" />, color: 'bg-purple-500' },
  { href: '/reading', title: 'Reading', icon: <SpellCheck className="h-12 w-12" />, color: 'bg-teal-500' },
  { href: '/story', title: 'Story Time', icon: <BookOpen className="h-12 w-12" />, color: 'bg-amber-500' },
  { href: '/poem', title: 'English Poem', icon: <Mic className="h-12 w-12" />, color: 'bg-rose-500' },
  { href: '/kabita', title: 'Hindi Kabita', icon: <Mic className="h-12 w-12" />, color: 'bg-fuchsia-500' },
];

export function MobileHomePage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-3 bg-red-500 text-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-md">
              <AppLogo className="h-10 w-10 flex-shrink-0" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">AlphaJoy Kids</h1>
          </div>
        </div>
      </header>
      
      <ScrollArea className="flex-1">
        <main className="p-4 pb-24">
          <div className="grid grid-cols-2 gap-4">
            {activities.map((activity) => (
              <Link href={activity.href} key={activity.href} passHref>
                <Card className={cn("shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 h-40 flex flex-col items-center justify-center text-center overflow-hidden border-2 border-gray-200", activity.color)}>
                  <CardContent className="p-2 flex-1 flex flex-col justify-center items-center gap-2 w-full text-white">
                    {typeof activity.icon === 'string' ? (
                      <div className="text-6xl font-bold">
                        {activity.icon}
                      </div>
                    ) : (
                      React.cloneElement(activity.icon, { className: "h-12 w-12" })
                    )}
                    <h3 className="text-lg font-semibold tracking-wide">{activity.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </main>
      </ScrollArea>
      
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t">
         <AdBanner />
         <div className="text-center py-1 bg-gray-100">
            <Link href="/privacy" className="text-xs text-gray-500 hover:underline">
             Privacy Policy
            </Link>
         </div>
      </footer>
    </div>
  );
}
