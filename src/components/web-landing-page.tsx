
"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, Download, BookOpen, Palette, Mic, Fingerprint, Wand2, Star, Shield, Heart } from 'lucide-react';
import { AppLogo } from './app-logo';
import Image from 'next/image';

const features = [
  { icon: <Fingerprint className="h-8 w-8 text-white" />, title: "Tracing Games", description: "Learn to write letters (ABC), numbers (123), and Hindi alphabets (कखग) with guided tracing.", bgColor: "bg-blue-500" },
  { icon: <Palette className="h-8 w-8 text-white" />, title: "Coloring & Drawing", description: "Color beautiful shapes or enjoy free-drawing on a digital canvas.", bgColor: "bg-green-500" },
  { icon: <Wand2 className="h-8 w-8 text-white" />, title: "AI Coloring Pages", description: "Type any word and let our AI create a unique coloring page for you instantly!", bgColor: "bg-purple-500" },
  { icon: <BookOpen className="h-8 w-8 text-white" />, title: "Story Time", description: "Listen to fun, short audio stories for different words to build vocabulary.", bgColor: "bg-red-500" },
  { icon: <Mic className="h-8 w-8 text-white" />, title: "Fun Poems (Kabita)", description: "Listen to classic English and Hindi nursery rhymes and poems.", bgColor: "bg-yellow-500" },
  { icon: <CheckCircle2 className="h-8 w-8 text-white" />, title: "And Much More!", description: "Counting games, learning multiplication tables (Pahada), and more activities.", bgColor: "bg-pink-500" },
];

export function WebLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <AppLogo className="h-12 w-12" />
            <h1 className="text-xl font-bold text-primary">Play Pad</h1>
          </div>
          <a href="https://play.google.com/store/apps/details?id=YOUR_APP_ID" target="_blank" rel="noopener noreferrer">
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="mr-2 h-5 w-5" />
              Download Now
            </Button>
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight">
              जहाँ सीखना एक खेल है!
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Play Pad बच्चों के लिए एक मजेदार और सुरक्षित दुनिया है जहाँ वे अक्षर, अंक, रंग और कहानियों के माध्यम से सीखते हैं।
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
               <a href="https://play.google.com/store/apps/details?id=YOUR_APP_ID" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-10 bg-green-600 hover:bg-green-700 shadow-lg">
                    <Download className="mr-3 h-6 w-6" />
                    Download from Google Play
                  </Button>
                </a>
            </div>
             <div className="mt-12 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
                <Image 
                  src="https://placehold.co/1200x600.png"
                  alt="Kids playing with Play Pad app on a tablet"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  data-ai-hint="children playing tablet"
                  priority
                />
             </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-12">Play Pad में क्या है खास?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${feature.bgColor}`}>
                      {feature.icon}
                    </div>
                    <h4 className="mt-5 text-xl font-semibold text-foreground">{feature.title}</h4>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Play Pad Section */}
        <section className="bg-white py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Play Pad क्यों चुनें?</h3>
                 <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <Shield className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">बच्चों के लिए सुरक्षित</h4>
                            <p className="text-muted-foreground">हमने बच्चों की सुरक्षा को ध्यान में रखते हुए, AdSense की नीतियों का पालन करते हुए, केवल सुरक्षित विज्ञापन लगाए हैं।</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <Heart className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">माता-पिता द्वारा प्रमाणित</h4>
                            <p className="text-muted-foreground">यह ऐप माता-पिता की देखरेख में बनाया गया है ताकि बच्चों को एक सकारात्मक और सीखने योग्य माहौल मिल सके।</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <Star className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">खेल-खेल में पढ़ाई</h4>
                            <p className="text-muted-foreground">हमारे इंटरैक्टिव गेम्स बच्चों को बोर नहीं होने देते और वे खेल-खेल में ही बहुत कुछ सीख जाते हैं।</p>
                        </div>
                    </li>
                 </ul>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                 <Image 
                      src="https://placehold.co/600x400.png"
                      alt="A happy child using the app"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      data-ai-hint="happy child tablet"
                  />
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-16 md:py-24 px-4">
            <div className="container mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-12">हमारे App की एक झलक</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-lg overflow-hidden shadow-lg"><Image src="https://placehold.co/300x500.png" data-ai-hint="app screenshot tracing" width={300} height={500} alt="App Screenshot 1" className="w-full"/></div>
                  <div className="rounded-lg overflow-hidden shadow-lg"><Image src="https://placehold.co/300x500.png" data-ai-hint="app screenshot coloring" width={300} height={500} alt="App Screenshot 2" className="w-full"/></div>
                  <div className="rounded-lg overflow-hidden shadow-lg"><Image src="https://placehold.co/300x500.png" data-ai-hint="app screenshot story" width={300} height={500} alt="App Screenshot 3" className="w-full"/></div>
                  <div className="rounded-lg overflow-hidden shadow-lg"><Image src="https://placehold.co/300x500.png" data-ai-hint="app screenshot poem" width={300} height={500} alt="App Screenshot 4" className="w-full"/></div>
              </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Play Pad. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/privacy" className="text-sm text-primary-foreground/80 hover:text-white hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

    