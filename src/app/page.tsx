
import Link from 'next/link';
import {
  BookOpen,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdBanner } from '@/components/ad-placeholder';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const activities = [
  {
    href: '/letters',
    title: 'Letters',
    icon: <div className="text-5xl font-bold leading-none">A</div>,
    color: 'from-red-400 to-red-600 text-white',
  },
  {
    href: '/numbers',
    title: 'Numbers',
    icon: <div className="text-5xl font-bold leading-none">123</div>,
    "color": 'from-blue-400 to-blue-600 text-white',
  },
  {
    "href": '/hindi',
    "title": 'Hindi',
    "icon": <div className="text-5xl font-bold leading-none">अ</div>,
    "color": 'from-orange-400 to-orange-600 text-white',
  },
   {
    "href": '/hindivowels',
    "title": 'Hindi Swar',
    icon: <div className="text-5xl font-bold">अa</div>,
    "color": 'from-rose-400 to-rose-600 text-white',
  },
  {
    "href": '/pahada',
    "title": 'Pahada',
    icon: <div className="text-5xl font-bold">2x1</div>,
    "color": 'from-cyan-400 to-cyan-600 text-white',
  },
  {
    "href": '/shapes',
    "title": 'Shapes',
    "icon": <div className="text-5xl">△</div>,
    "color": 'from-yellow-400 to-yellow-600 text-white',
  },
  {
    "href": '/counting',
    "title": 'Counting',
    "icon": <div className="text-5xl font-bold">123</div>,
    "color": 'from-green-400 to-green-600 text-white',
  },
    {
    "href": '/coloring',
    "title": 'Coloring',
    "icon": <div className="text-5xl">🎨</div>,
    "color": 'from-teal-400 to-teal-600 text-white',
  },
  {
    "href": '/reading',
    "title": 'Reading',
    "icon": <div className="text-5xl font-bold">Aa</div>,
    "color": 'from-purple-400 to-purple-600 text-white',
  },
  {
    "href": '/drawing',
    "title": 'Drawing',
    "icon": <div className="text-5xl">✎</div>,
    "color": 'from-indigo-400 to-indigo-600 text-white',
  },
  {
    "href": '/story',
    "title": 'Story Time',
    "icon": <div className="text-5xl">📖</div>,
    "color": 'from-pink-400 to-pink-600 text-white',
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-center gap-3">
           <div className="text-3xl flex-shrink-0">📖</div>
           <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-headline text-center whitespace-nowrap">Play Pad: ABC, Stories & Art</h1>
        </div>
      </header>
      
      <main className="flex-1 p-6 pt-6 md:p-8 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <Link href={activity.href} key={activity.href} className="group">
              <Card 
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:scale-105 border-2 border-white/30 shadow-lg bg-gradient-to-br flex flex-col items-center justify-center aspect-square animate-fade-in-zoom',
                  activity.color
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="flex flex-col items-center justify-center p-2 sm:p-4 gap-2 text-center w-full h-full">
                  <div className="flex-1 flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-shadow-sm">{activity.title}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-2 bg-background/80 backdrop-blur-sm border-t">
        <AdBanner className="max-w-4xl mx-auto"/>
        <div className="text-center mt-2">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
        </div>
      </div>
    </div>
  );
}
