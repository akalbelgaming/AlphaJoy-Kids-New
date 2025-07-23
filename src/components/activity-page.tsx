
'use client';
import Link from 'next/link';
import { ArrowLeft, ToyBrick } from 'lucide-react';
import GameClient from '@/components/game-client';
import { AdBanner } from '@/components/ad-placeholder';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ActivityInstructions } from './activity-instructions';

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing" | "hindi" | "pahada" | "hindivowels" | "coloring";

interface ActivityPageProps {
  mode: Mode;
  title: string;
}

export default function ActivityPage({ mode, title }: ActivityPageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-2 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between gap-4">
           <div className="flex items-center gap-2">
             <Link href="/">
               <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                  <ArrowLeft className="h-6 w-6"/>
                  <span className="sr-only">Back to Home</span>
               </Button>
             </Link>
            <h1 className="text-xl font-bold font-headline">{title}</h1>
           </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col p-4">
        {isClient ? <GameClient mode={mode} /> : (
          <div className="flex-1 flex items-center justify-center">
             {/* This will be shown to crawlers and during server render */}
            <ActivityInstructions mode={mode} />
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-2 bg-background/80 backdrop-blur-sm border-t z-10">
        <AdBanner className="max-w-4xl mx-auto"/>
      </div>
    </div>
  );
}
