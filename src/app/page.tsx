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
      <header className="p-6 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto flex items-center gap-4">
           <ToyBrick className="h-10 w-10" />
           <h1 className="text-3xl font-bold font-headline">Trace & Earn</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 md:p-6 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <Link href={activity.href} key={activity.href} className="group">
              <Card className={`overflow-hidden transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-1 border-2 border-transparent group-hover:border-primary bg-white`}>
                <CardHeader className="flex flex-col items-center justify-center p-6">
                  <div className={`p-4 rounded-full ${activity.color} ${activity.bgColor}`}>
                    {activity.icon}
                  </div>
                </CardHeader>
                <CardContent className="text-center p-4 pt-0">
                  <CardTitle className="text-xl font-bold text-foreground">{activity.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
        <AdBanner className="max-w-4xl mx-auto"/>
      </div>
    </div>
  );
}
