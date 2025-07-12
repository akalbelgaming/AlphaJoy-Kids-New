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
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdBanner } from '@/components/ad-placeholder';

const activities = [
  {
    href: '/letters',
    title: 'Letters',
    icon: <BookOpen className="h-12 w-12" />,
    description: 'Learn the alphabet by tracing letters.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    href: '/numbers',
    title: 'Numbers',
    icon: <Hash className="h-12 w-12" />,
    description: 'Practice tracing numbers from 1 to 100.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    href: '/shapes',
    title: 'Shapes',
    icon: <Shapes className="h-12 w-12" />,
    description: 'Color in fun shapes like stars and hearts.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    href: '/counting',
    title: 'Counting',
    icon: <Calculator className="h-12 w-12" />,
    description: 'Count objects and learn numbers.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    href: '/reading',
    title: 'Reading',
    icon: <ScanEye className="h-12 w-12" />,
    description: 'Trace and read simple, fun words.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    href: '/drawing',
    title: 'Drawing',
    icon: <PenSquare className="h-12 w-12" />,
    description: 'Unleash your creativity on a blank canvas.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  {
    href: '/story',
    title: 'Story Time',
    icon: <BookCopy className="h-12 w-12" />,
    description: 'Listen to short stories about fun topics.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto flex items-center gap-4">
           <ToyBrick className="h-8 w-8" />
           <h1 className="text-xl font-bold font-headline">Trace & Learn</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 md:p-6 mb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {activities.map((activity, index) => (
            <Link href={activity.href} key={activity.href} className="group">
              <Card 
                className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:scale-105 bg-card border-none shadow-md animate-fade-in-zoom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-col items-center justify-center p-4">
                  <div className={`p-4 rounded-full ${activity.bgColor}`}>
                     {activity.icon}
                  </div>
                </CardHeader>
                <CardContent className="text-center p-2 pt-0">
                  <CardTitle className="text-base font-medium text-foreground">{activity.title}</CardTitle>
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
