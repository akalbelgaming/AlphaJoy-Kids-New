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
    icon: <BookOpen className="h-10 w-10" />,
    color: 'from-red-400 to-red-600 text-white',
  },
  {
    href: '/numbers',
    title: 'Numbers',
    icon: <Hash className="h-10 w-10" />,
    color: 'from-blue-400 to-blue-600 text-white',
  },
  {
    href: '/hindi',
    title: 'Hindi',
    icon: <Languages className="h-10 w-10" />,
    color: 'from-orange-400 to-orange-600 text-white',
  },
  {
    href: '/shapes',
    title: 'Shapes',
    icon: <Shapes className="h-10 w-10" />,
    color: 'from-yellow-400 to-yellow-600 text-white',
  },
  {
    href: '/counting',
    title: 'Counting',
    icon: <Calculator className="h-10 w-10" />,
    color: 'from-green-400 to-green-600 text-white',
  },
  {
    href: '/reading',
    title: 'Reading',
    icon: <ScanEye className="h-10 w-10" />,
    color: 'from-purple-400 to-purple-600 text-white',
  },
  {
    href: '/drawing',
    title: 'Drawing',
    icon: <PenSquare className="h-10 w-10" />,
    color: 'from-indigo-400 to-indigo-600 text-white',
  },
  {
    href: '/story',
    title: 'Story Time',
    icon: <BookCopy className="h-10 w-10" />,
    color: 'from-pink-400 to-pink-600 text-white',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto flex items-center gap-4">
           <ToyBrick className="h-8 w-8" />
           <h1 className="text-2xl font-bold font-headline">Trace & Learn</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 md:p-6 mb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {activities.map((activity, index) => (
            <Link href={activity.href} key={activity.href} className="group">
              <Card 
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:scale-105 border-2 border-white/30 shadow-lg bg-gradient-to-br flex flex-col items-center justify-center aspect-square animate-fade-in-zoom',
                  activity.color
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 gap-3 text-center">
                  {activity.icon}
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
