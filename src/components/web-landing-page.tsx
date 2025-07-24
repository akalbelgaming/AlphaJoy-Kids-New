
"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, Download, BookOpen, Palette, Mic, Fingerprint, Wand2 } from 'lucide-react';
import { AppLogo } from './app-logo';
import Image from 'next/image';

const features = [
  { icon: <Fingerprint className="h-6 w-6 text-primary" />, title: "Tracing Games", description: "Learn to write letters (ABC), numbers (123), and Hindi alphabets (कखग) with guided tracing." },
  { icon: <Palette className="h-6 w-6 text-primary" />, title: "Coloring & Drawing", description: "Color beautiful shapes or enjoy free-drawing on a digital canvas." },
  { icon: <Wand2 className="h-6 w-6 text-primary" />, title: "AI Coloring Pages", description: "Type any word and let our AI create a unique coloring page for you instantly!" },
  { icon: <BookOpen className="h-6 w-6 text-primary" />, title: "Story Time", description: "Listen to fun, short audio stories for different words to build vocabulary." },
  { icon: <Mic className="h-6 w-6 text-primary" />, title: "Fun Poems (Kabita)", description: "Listen to classic English and Hindi nursery rhymes and poems." },
  { icon: <CheckCircle2 className="h-6 w-6 text-primary" />, title: "And Much More!", description: "Counting games, learning multiplication tables (Pahada), and more activities." },
];

export function WebLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-6xl w-full mx-auto">
          <Card className="w-full shadow-2xl animate-fade-in-zoom border-2 border-primary/20 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 space-y-6 flex flex-col justify-center bg-primary/5">
                <div className="flex items-center gap-4">
                  <AppLogo className="h-16 w-16 flex-shrink-0" />
                  <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight">Play Pad: ABC, Stories & Art</h1>
                    <p className="text-lg text-muted-foreground mt-1">The complete fun-learning app for kids.</p>
                  </div>
                </div>
                <CardDescription className="text-base">
                  This app is designed for mobile phones. For the best experience, please install it from the Google Play Store. Enjoy all features like tracing, coloring, AI stories, and poems on your mobile device!
                </CardDescription>
                <div className="pt-4">
                  <a href="https://play.google.com/store/apps/details?id=YOUR_APP_ID" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full text-lg h-14 bg-green-600 hover:bg-green-700">
                      <Download className="mr-3 h-6 w-6" />
                      Download from Google Play
                    </Button>
                  </a>
                </div>
                 <div className="text-center mt-4">
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                    Read our Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                 <Image 
                    src="https://placehold.co/600x400.png"
                    alt="Children enjoying the Play Pad app"
                    fill
                    className="object-cover"
                    data-ai-hint="children playing tablet"
                  />
              </div>
            </div>
          </Card>

          <section className="py-12 px-4">
              <h2 className="text-3xl font-bold text-center text-primary mb-10">What's Inside?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                  
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors">
                        <div>{feature.icon}</div>
                        <div>
                            <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                ))}
                
                <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 rounded-lg overflow-hidden shadow-lg h-full">
                   <Image 
                      src="https://placehold.co/400x600.png"
                      alt="A child coloring on a tablet"
                      width={400}
                      height={600}
                      className="object-cover w-full h-full"
                      data-ai-hint="child coloring tablet"
                    />
                </div>
              </div>
          </section>
        </div>
      </main>
    </div>
  );
}
