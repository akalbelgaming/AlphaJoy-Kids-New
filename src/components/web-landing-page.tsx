
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle2, Download, BookOpen, Palette, Mic, Fingerprint, Wand2, Star, Shield, Heart, Languages } from 'lucide-react';
import { AppLogo } from './app-logo';
import Image from 'next/image';

type Language = 'en' | 'hi';

const content = {
  en: {
    header: {
      download: "Download Now",
      toggle: "हिंदी में देखें",
    },
    hero: {
      title: "Where Learning is a Game!",
      subtitle: "AlphaJoy Kids is a fun and safe world for kids to learn through letters, numbers, colors, and stories.",
      download_google: "Download from Google Play"
    },
    features: {
      title: "What's Special in AlphaJoy Kids?",
      list: [
        { icon: <Fingerprint className="h-8 w-8 text-white" />, title: "Tracing Games", description: "Learn to write letters (ABC), numbers (123), and Hindi alphabets (कखग) with guided tracing.", bgColor: "bg-blue-500" },
        { icon: <Palette className="h-8 w-8 text-white" />, title: "Coloring & Drawing", description: "Color beautiful shapes or enjoy free-drawing on a digital canvas.", bgColor: "bg-green-500" },
        { icon: <Wand2 className="h-8 w-8 text-white" />, title: "AI Coloring Pages", description: "Type any word and let our AI create a unique coloring page for you instantly!", bgColor: "bg-purple-500" },
        { icon: <BookOpen className="h-8 w-8 text-white" />, title: "Story Time", description: "Listen to fun, short audio stories for different words to build vocabulary.", bgColor: "bg-red-500" },
        { icon: <Mic className="h-8 w-8 text-white" />, title: "Fun Poems (Kabita)", description: "Listen to classic English and Hindi nursery rhymes and poems.", bgColor: "bg-yellow-500" },
        { icon: <CheckCircle2 className="h-8 w-8 text-white" />, title: "And Much More!", description: "Counting games, learning multiplication tables (Pahada), and more activities.", bgColor: "bg-pink-500" },
      ]
    },
    why: {
      title: "Why Choose AlphaJoy Kids?",
      list: [
        { icon: <Shield className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />, title: "Safe for Kids", description: "We have implemented safe ads following AdSense policies to ensure a child-friendly environment." },
        { icon: <Heart className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />, title: "Parent-Approved", description: "This app is designed under parental guidance to provide a positive and educational experience for children." },
        { icon: <Star className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />, title: "Learning Through Play", description: "Our interactive games keep children engaged, allowing them to learn new things while having fun." },
      ]
    },
    gallery: {
      title: "A Glimpse of Our App",
    },
    footer: {
      copyright: "© 2024 AlphaJoy Kids. All rights reserved.",
      privacy: "Privacy Policy",
    }
  },
  hi: {
    header: {
      download: "अभी डाउनलोड करें",
      toggle: "View in English",
    },
    hero: {
      title: "जहाँ सीखना एक खेल है!",
      subtitle: "AlphaJoy Kids बच्चों के लिए एक मजेदार और सुरक्षित दुनिया है जहाँ वे अक्षर, अंक, रंग और कहानियों के माध्यम से सीखते हैं।",
      download_google: "Google Play से डाउनलोड करें"
    },
    features: {
      title: "AlphaJoy Kids में क्या है खास?",
      list: [
        { icon: <Fingerprint className="h-8 w-8 text-white" />, title: "ट्रेसिंग गेम्स", description: "निर्देशित ट्रेसिंग के साथ अक्षर (ABC), अंक (123), और हिंदी अक्षर (कखग) लिखना सीखें।", bgColor: "bg-blue-500" },
        { icon: <Palette className="h-8 w-8 text-white" />, title: "रंग भरना और ड्राइंग", description: "सुंदर आकृतियों में रंग भरें या डिजिटल कैनवास पर मुफ्त ड्राइंग का आनंद लें।", bgColor: "bg-green-500" },
        { icon: <Wand2 className="h-8 w-8 text-white" />, title: "AI कलरिंग पेज", description: "कोई भी शब्द टाइप करें और हमारे AI को तुरंत आपके लिए एक अनूठा कलरिंग पेज बनाने दें!", bgColor: "bg-purple-500" },
        { icon: <BookOpen className="h-8 w-8 text-white" />, title: "कहानी का समय", description: "शब्दावली बनाने के लिए विभिन्न शब्दों के लिए मजेदार, छोटी ऑडियो कहानियां सुनें।", bgColor: "bg-red-500" },
        { icon: <Mic className="h-8 w-8 text-white" />, title: "मजेदार कविताएं", description: "क्लासिक अंग्रेजी और हिंदी नर्सरी राइम और कविताएं सुनें।", bgColor: "bg-yellow-500" },
        { icon: <CheckCircle2 className="h-8 w-8 text-white" />, title: "और भी बहुत कुछ!", description: "गिनती के खेल, गुणा सारणी (पहाड़ा) सीखना, और अधिक गतिविधियाँ।", bgColor: "bg-pink-500" },
      ]
    },
    why: {
      title: "AlphaJoy Kids क्यों चुनें?",
      list: [
        { icon: <Shield className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />, title: "बच्चों के लिए सुरक्षित", description: "हमने बच्चों की सुरक्षा को ध्यान में रखते हुए, AdSense की नीतियों का पालन करते हुए, केवल सुरक्षित विज्ञापन लगाए हैं।"},
        { icon: <Heart className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />, title: "माता-पिता द्वारा प्रमाणित", description: "यह ऐप माता-पिता की देखरेख में बनाया गया है ताकि बच्चों को एक सकारात्मक और सीखने योग्य माहौल मिल सके।"},
        { icon: <Star className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />, title: "खेल-खेल में पढ़ाई", description: "हमारे इंटरैक्टिव गेम्स बच्चों को बोर नहीं होने देते और वे खेल-खेल में ही बहुत कुछ सीख जाते हैं।"},
      ]
    },
    gallery: {
      title: "हमारे App की एक झलक",
    },
    footer: {
      copyright: "© 2024 AlphaJoy Kids. सर्वाधिकार सुरक्षित।",
      privacy: "गोपनीयता नीति",
    }
  }
};


export function WebLandingPage() {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'hi' ? 'en' : 'hi'));
  };
  
  const currentContent = content[language];

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto flex justify-between items-center p-2 md:p-4">
          <div className="flex items-center gap-2 md:gap-3">
            <AppLogo className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0" />
            <h1 className="text-lg md:text-xl font-bold text-primary">AlphaJoy Kids</h1>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
             <Button variant="outline" size="sm" onClick={toggleLanguage}>
                <Languages className="mr-1 md:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{currentContent.header.toggle}</span>
            </Button>
            <a href="https://play.google.com/store/apps/details?id=YOUR_APP_ID" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Download className="mr-1 md:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{currentContent.header.download}</span>
                <span className="sm:hidden">Download</span>
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="text-center py-12 md:py-24 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight">
              {currentContent.hero.title}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-xl text-muted-foreground">
              {currentContent.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
               <a href="https://play.google.com/store/apps/details?id=YOUR_APP_ID" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full sm:w-auto text-base md:text-lg h-12 md:h-14 px-8 md:px-10 bg-green-600 hover:bg-green-700 shadow-lg">
                    <Download className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
                    {currentContent.hero.download_google}
                  </Button>
                </a>
            </div>
             <div className="mt-12 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
                <Image 
                  src="/hero-image.png"
                  alt="Kids playing with AlphaJoy Kids app on a tablet"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
             </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-12 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-12">{currentContent.features.title}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentContent.features.list.map((feature, index) => (
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

        {/* Why Choose AlphaJoy Kids Section */}
        <section className="bg-white py-12 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">{currentContent.why.title}</h3>
                 <ul className="space-y-4">
                    {currentContent.why.list.map((item, index) => (
                       <li key={index} className="flex items-start gap-4">
                          {item.icon}
                          <div>
                              <h4 className="font-semibold text-lg">{item.title}</h4>
                              <p className="text-muted-foreground">{item.description}</p>
                          </div>
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
                 <Image 
                      src="/why-us-image.png"
                      alt="A happy child using the app"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                  />
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-12 md:py-24 px-4">
            <div className="container mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-12">{currentContent.gallery.title}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                  <div className="rounded-lg overflow-hidden shadow-lg"><Image src="/screenshot-1.png" width={300} height={500} alt="App Screenshot 1" className="w-full" unoptimized/></div>
                  <div className="rounded-lg overflow-hidden shadow-lg"><Image src="/screenshot-2.png" width={300} height={500} alt="App Screenshot 2" className="w-full" unoptimized/></div>
                  <div className="rounded-lg overflow-hidden shadow-lg"><Image src="/screenshot-3.png" width={300} height={500} alt="App Screenshot 3" className="w-full" unoptimized/></div>
                  <div className="rounded-lg overflow-hidden shadow-lg"><Image src="/screenshot-4.png" width={300} height={500} alt="App Screenshot 4" className="w-full" unoptimized/></div>
              </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <p>{currentContent.footer.copyright}</p>
          <div className="mt-4">
            <Link href="/privacy" className="text-sm text-primary-foreground/80 hover:text-white hover:underline">
              {currentContent.footer.privacy}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

    