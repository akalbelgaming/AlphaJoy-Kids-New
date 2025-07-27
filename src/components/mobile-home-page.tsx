
'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Brush,
  Calculator,
  Fingerprint,
  Languages,
  Mic,
  Palette,
  Shapes,
  SpellCheck,
  Star,
  Type
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AppLogo } from '@/components/app-logo';
import { ScrollArea } from './ui/scroll-area';
import { AdBanner } from './ad-placeholder';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const activities = [
  { href: '/letters', icon: <Type className="h-10 w-10" />, title: 'ABC Letters', description: 'Trace uppercase & lowercase letters', color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { href: '/numbers', icon: <Calculator className="h-10 w-10" />, title: '123 Numbers', description: 'Learn to write numbers 1 to 100', color: 'text-green-500', bgColor: 'bg-green-100' },
  { href: '/shapes', icon: <Shapes className="h-10 w-10" />, title: 'Color Shapes', description: 'Fill beautiful shapes with colors', color: 'text-purple-500', bgColor: 'bg-purple-100' },
  { href: '/counting', icon: <Fingerprint className="h-10 w-10" />, title: 'Counting Fun', description: 'Count objects from 1 to 100', color: 'text-red-500', bgColor: 'bg-red-100' },
  { href: '/drawing', icon: <Brush className="h-10 w-10" />, title: 'Free Drawing', description: 'Unleash your inner artist', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
  { href: '/coloring', icon: <Palette className="h-10 w-10" />, title: 'AI Coloring', description: 'Create coloring pages with AI', color: 'text-pink-500', bgColor: 'bg-pink-100' },
  { href: '/reading', icon: <SpellCheck className="h-10 w-10" />, title: 'Word Tracing', description: 'Practice spelling and reading', color: 'text-orange-500', bgColor: 'bg-orange-100' },
  { href: '/story', icon: <BookOpen className="h-10 w-10" />, title: 'Story Time', description: 'Listen to short audio stories', color: 'text-teal-500', bgColor: 'bg-teal-100' },
  { href: '/hindi', icon: <Languages className="h-10 w-10" />, title: 'Hindi Letters', description: 'Trace Hindi varnmala (अ, आ)', color: 'text-indigo-500', bgColor: 'bg-indigo-100' },
  { href: '/hindivowels', icon: <Type className="h-10 w-10" />, title: 'Hindi Vowels', description: 'Learn Hindi vowels & pronunciation', color: 'text-cyan-500', bgColor: 'bg-cyan-100' },
  { href: '/pahada', icon: <Calculator className="h-10 w-10" />, title: 'Math Tables', description: 'Learn tables from 2 to 20', color: 'text-lime-500', bgColor: 'bg-lime-100' },
  { href: '/poem', icon: <Mic className="h-10 w-10" />, title: 'English Poems', description: 'Listen to classic nursery rhymes', color: 'text-rose-500', bgColor: 'bg-rose-100' },
  { href: '/kabita', icon: <Mic className="h-10 w-10" />, title: 'Hindi Kabita', description: 'Listen to fun Hindi poems', color: 'text-fuchsia-500', bgColor: 'bg-fuchsia-100' },
];

export function MobileHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AppLogo className="h-12 w-12 flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-bold font-headline tracking-tight">AlphaJoy Kids</h1>
              <p className="text-sm text-primary-foreground/90">Learning is a game!</p>
            </div>
          </div>
           <Link href="/privacy" passHref>
             <Button variant="ghost" size="icon" className="text-yellow-300 hover:text-yellow-400 hover:bg-primary/80">
                <Star className="h-7 w-7" />
             </Button>
           </Link>
        </div>
      </header>
      
      <ScrollArea className="flex-1">
        <main className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {activities.map((activity) => (
              <Link href={activity.href} key={activity.href} passHref>
                <Card className={cn("shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col items-center text-center overflow-hidden border-2", activity.bgColor.replace('bg-','border-'))}>
                  <CardContent className="p-4 flex-1 flex flex-col justify-center items-center gap-3 w-full">
                    <div className={cn("w-16 h-16 rounded-full flex items-center justify-center", activity.bgColor)}>
                       {React.cloneElement(activity.icon, { className: cn("h-8 w-8", activity.color) })}
                    </div>
                    <div className="text-center">
                        <h3 className="text-base font-bold text-gray-800">{activity.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-tight">{activity.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </main>
      </ScrollArea>
      
      <div className="sticky bottom-0 left-0 right-0 p-2 bg-background/80 backdrop-blur-sm border-t z-10">
        <AdBanner className="max-w-4xl mx-auto" />
      </div>
    </div>
  );
}
