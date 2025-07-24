
"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, Download, BookOpen, Palette, Mic, Fingerprint, Wand2 } from 'lucide-react';
import { AppLogo } from './app-logo';

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
        <Card className="max-w-4xl w-full shadow-2xl animate-fade-in-zoom border-2 border-primary/20">
          <div className="grid md:grid-cols-2">
            <div className="p-8 space-y-6 flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <AppLogo className="h-16 w-16" />
                </div>
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
            <div className="bg-primary/5 p-8 rounded-b-lg md:rounded-r-lg md:rounded-b-none">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">What's Inside?</h2>
                <div className="space-y-5">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div>{feature.icon}</div>
                            <div>
                                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
