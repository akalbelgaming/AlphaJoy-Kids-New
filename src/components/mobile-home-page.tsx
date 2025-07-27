
'use client';

import Link from 'next/link';
import {
  Baby,
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/app-logo';
import { ScrollArea } from './ui/scroll-area';
import { AdBanner } from './ad-placeholder';

const activities = [
  { href: '/letters', icon: <Type className="h-8 w-8 text-blue-500" />, title: 'ABC Letters', description: 'Trace uppercase & lowercase letters', bgColor: 'bg-blue-100' },
  { href: '/numbers', icon: <Calculator className="h-8 w-8 text-green-500" />, title: '123 Numbers', description: 'Learn to write numbers 1 to 100', bgColor: 'bg-green-100' },
  { href: '/shapes', icon: <Shapes className="h-8 w-8 text-purple-500" />, title: 'Color Shapes', description: 'Fill beautiful shapes with colors', bgColor: 'bg-purple-100' },
  { href: '/counting', icon: <Fingerprint className="h-8 w-8 text-red-500" />, title: 'Counting Fun', description: 'Count objects from 1 to 100', bgColor: 'bg-red-100' },
  { href: '/drawing', icon: <Brush className="h-8 w-8 text-yellow-500" />, title: 'Free Drawing', description: 'Unleash your inner artist', bgColor: 'bg-yellow-100' },
  { href: '/coloring', icon: <Palette className="h-8 w-8 text-pink-500" />, title: 'AI Coloring', description: 'Create coloring pages with AI', bgColor: 'bg-pink-100' },
  { href: '/reading', icon: <SpellCheck className="h-8 w-8 text-orange-500" />, title: 'Word Tracing', description: 'Practice spelling and reading', bgColor: 'bg-orange-100' },
  { href: '/story', icon: <BookOpen className="h-8 w-8 text-teal-500" />, title: 'Story Time', description: 'Listen to short audio stories', bgColor: 'bg-teal-100' },
  { href: '/hindi', icon: <Languages className="h-8 w-8 text-indigo-500" />, title: 'Hindi Letters', description: 'Trace Hindi varnmala (अ, आ)', bgColor: 'bg-indigo-100' },
  { href: '/hindivowels', icon: <Type className="h-8 w-8 text-cyan-500" />, title: 'Hindi Vowels', description: 'Learn Hindi vowels and pronunciation', bgColor: 'bg-cyan-100' },
  { href: '/pahada', icon: <Calculator className="h-8 w-8 text-lime-500" />, title: 'Math Tables', description: 'Learn tables from 2 to 20', bgColor: 'bg-lime-100' },
  { href: '/poem', icon: <Mic className="h-8 w-8 text-rose-500" />, title: 'English Poems', description: 'Listen to classic nursery rhymes', bgColor: 'bg-rose-100' },
  { href: '/kabita', icon: <Mic className="h-8 w-8 text-fuchsia-500" />, title: 'Hindi Kabita', description: 'Listen to fun Hindi poems', bgColor: 'bg-fuchsia-100' },
];

export function MobileHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AppLogo className="h-12 w-12 flex-shrink-0" />
            <div>
              <h1 className="text-xl font-bold font-headline">AlphaJoy Kids</h1>
              <p className="text-xs text-primary-foreground/80">Learning is a game!</p>
            </div>
          </div>
           <Link href="/privacy">
              <Star className="h-6 w-6 text-yellow-300 hover:text-yellow-400" />
           </Link>
        </div>
      </header>
      
      <ScrollArea className="flex-1">
        <main className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <Link href={activity.href} key={activity.href} passHref>
                <Card className="shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center overflow-hidden">
                  <CardHeader className={`w-full flex items-center justify-center p-4 ${activity.bgColor}`}>
                    {activity.icon}
                  </CardHeader>
                  <CardContent className="p-3 flex-1 flex flex-col justify-center">
                    <CardTitle className="text-base font-bold">{activity.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
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
