'use client';
import Link from 'next/link';
import { Home, ToyBrick } from 'lucide-react';
import GameClient from '@/components/game-client';
import { AdBanner } from '@/components/ad-placeholder';
import { Button } from '@/components/ui/button';

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing";

interface ActivityPageProps {
  mode: Mode;
  title: string;
}

export default function ActivityPage({ mode, title }: ActivityPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between gap-4">
           <div className="flex items-center gap-4">
            <ToyBrick className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-headline">{title}</h1>
           </div>
           <Link href="/">
             <Button variant="secondary" size="icon">
                <Home className="h-5 w-5"/>
                <span className="sr-only">Home</span>
             </Button>
           </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <GameClient mode={mode} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t z-10">
        <AdBanner className="max-w-4xl mx-auto"/>
      </div>
    </div>
  );
}
