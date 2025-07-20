import Link from 'next/link';
import {
  BookOpen,
  Hash,
  Shapes,
  Calculator,
  ScanEye,
  PenSquare,
  BookCopy,
  ToyBrick,
  Languages,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdBanner } from '@/components/ad-placeholder';
import { cn } from '@/lib/utils';

const activities = [
  {
    href: '/letters',
    title: 'Letters',
    icon: <div className="text-4xl font-bold">A</div>,
    color: 'from-red-400 to-red-600 text-white',
  },
  {
    href: '/numbers',
    title: 'Numbers',
    icon: <div className="text-3xl font-bold">123</div>,
    "color": 'from-blue-400 to-blue-600 text-white',
  },
  {
    "href": '/hindi',
    "title": 'Hindi',
    "icon": <div className="text-4xl font-bold">अ</div>,
    "color": 'from-orange-400 to-orange-600 text-white',
  },
  {
    "href": '/shapes',
    "title": 'Shapes',
    "icon": <div className="text-4xl">△</div>,
    "color": 'from-yellow-400 to-yellow-600 text-white',
  },
  {
    "href": '/counting',
    "title": 'Counting',
    "icon": <div className="text-xl font-bold">1,2,3</div>,
    "color": 'from-green-400 to-green-600 text-white',
  },
  {
    "href": '/reading',
    "title": 'Reading',
    "icon": <div className="text-4xl font-bold">Aa</div>,
    "color": 'from-purple-400 to-purple-600 text-white',
  },
  {
    "href": '/drawing',
    "title": 'Drawing',
    "icon": <div className="text-4xl">✎</div>,
    "color": 'from-indigo-400 to-indigo-600 text-white',
  },
  {
    "href": '/story',
    "title": 'Story Time',
    "icon": <div className="text-4xl">📖</div>,
    "color": 'from-pink-400 to-pink-600 text-white',
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between gap-2">
           {/* Girl Icon */}
           <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/><path d="M18 20V18.5C18 16.567 16.433 15 14.5 15H9.5C7.567 15 6 16.567 6 18.5V20" stroke="currentColor" strokeWidth="1.5"/><path d="M4.5 10.5C4.5 10.5 5.5 10 6 9.5M19.5 10.5C19.5 10.5 18.5 10 18 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
           <h1 className="text-base sm:text-lg md:text-xl font-bold font-headline text-center whitespace-nowrap">Play Pad: ABC, Stories &amp; Art</h1>
           {/* Boy Icon */}
           <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5"/><path d="M18 20V18.5C18 16.567 16.433 15 14.5 15H9.5C7.567 15 6 16.567 6 18.5V20" stroke="currentColor" strokeWidth="1.5"/></svg>
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
                <CardContent className="flex flex-col items-center justify-center p-2 sm:p-4 gap-2 text-center">
                  <div className="h-10 w-10 flex items-center justify-center">
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
      </div>
    </div>
  );
}
