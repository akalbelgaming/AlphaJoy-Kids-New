
"use client";

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle2, Download, BookOpen, Palette, Mic, Fingerprint, Wand2, Star, Shield, Heart, Languages, Info } from 'lucide-react';
import { AppLogo } from './app-logo';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"


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
      download_google: "Download from Google Play",
      rating: "4.8/5 Star Rating",
      downloads: "50k+ Downloads",
    },
    features: {
      title: "What's Special in AlphaJoy Kids?",
      list: [
        { icon: <Fingerprint className="h-8 w-8 text-blue-500" />, title: "Tracing Games", description: "Learn to write letters, numbers, and more with guided tracing activities.", bgColor: "bg-blue-100", details: "Our app offers a wide variety of tracing activities, including English letters (ABC), numbers (1-100), and Hindi alphabets (vowels and consonants). The guided tracing helps children develop fine motor skills and learn the correct formation of each character in a fun, interactive way." },
        { icon: <Palette className="h-8 w-8 text-green-500" />, title: "Coloring & Drawing", description: "Unleash creativity with colors and shapes, or draw anything you can imagine.", bgColor: "bg-green-100", details: "Kids can color beautiful pre-defined shapes like circles, stars, and hearts, or let their imagination run wild in the free-draw mode. With multiple colors and adjustable pencil sizes, it's a complete digital canvas for your little artist." },
        { icon: <Wand2 className="h-8 w-8 text-purple-500" />, title: "AI Coloring Pages", description: "Instantly create unique coloring pages from any word you can think of.", bgColor: "bg-purple-100", details: "A truly magical feature! Just type any word like 'apple' or 'car', and our advanced AI will generate a brand new, custom coloring page for you in seconds. It provides endless coloring fun and helps kids associate words with images." },
        { icon: <BookOpen className="h-8 w-8 text-red-500" />, title: "Story Time", description: "Listen to fun, short audio stories that build vocabulary and listening skills.", bgColor: "bg-red-100", details: "Build vocabulary and listening skills with our collection of short, engaging stories. Each story is based on a word, helping children learn its meaning and context in an entertaining format. Just click 'Listen' and enjoy!" },
        { icon: <Mic className="h-8 w-8 text-yellow-500" />, title: "Fun Poems (Kabita)", description: "Enjoy classic English and Hindi nursery rhymes with audio.", bgColor: "bg-yellow-100", details: "Enjoy a collection of timeless nursery rhymes and poems in both English and Hindi. This feature is perfect for improving pronunciation and language skills while listening to familiar classics like 'Twinkle, Twinkle' and 'Machli Jal Ki Rani'." },
        { icon: <CheckCircle2 className="h-8 w-8 text-pink-500" />, title: "And Much More!", description: "Includes interactive counting games, multiplication tables, and more!", bgColor: "bg-pink-100", details: "The fun never stops! AlphaJoy Kids also includes interactive counting games to learn numbers visually and a complete section for learning multiplication tables (Pahada) from 2 to 20, making math easy and enjoyable." },
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
    reviews: {
      title: "Built for a Great Learning Experience",
      list: [
        { name: "Perfect for Preschoolers!", text: "Designed to improve writing skills in a fun and interactive way. A great start for early learners." },
        { name: "Endless Creativity!", text: "The AI coloring feature provides a unique new page every time. A must-have for little artists." },
        { name: "Bilingual Fun!", text: "A great collection of activities, including Hindi poems and alphabets to help connect with native language." },
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
      download: " अभी डाउनलोड करें",
      toggle: "View in English",
    },
    hero: {
      title: "जहाँ सीखना एक खेल है!",
      subtitle: "AlphaJoy Kids बच्चों के लिए एक मजेदार और सुरक्षित दुनिया है जहाँ वे अक्षर, अंक, रंग और कहानियों के माध्यम से सीखते हैं।",
      download_google: "Google Play से डाउनलोड करें",
      rating: "4.8/5 स्टार रेटिंग",
      downloads: "50k+ डाउनलोड",
    },
    features: {
      title: "AlphaJoy Kids में क्या है खास?",
      list: [
        { icon: <Fingerprint className="h-8 w-8 text-blue-500" />, title: "ट्रेसिंग गेम्स", description: "निर्देशित ट्रेसिंग गतिविधियों के साथ अक्षर, अंक, और बहुत कुछ लिखना सीखें।", bgColor: "bg-blue-100", details: "हमारा ऐप कई तरह की ट्रेसिंग गतिविधियाँ प्रदान करता है, जिसमें अंग्रेजी अक्षर (ABC), संख्याएँ (1-100), और हिंदी अक्षर (स्वर और व्यंजन) शामिल हैं। निर्देशित ट्रेसिंग बच्चों को ठीक मोटर कौशल विकसित करने और मजेदार, इंटरैक्टिव तरीके से प्रत्येक अक्षर का सही गठन सीखने में मदद करती है।" },
        { icon: <Palette className="h-8 w-8 text-green-500" />, title: "रंग भरना और ड्राइंग", description: "रंगों और आकृतियों के साथ रचनात्मकता दिखाएँ, या अपनी कल्पना से कुछ भी बनाएं।", bgColor: "bg-green-100", details: "बच्चे सुंदर पूर्व-निर्धारधारित आकृतियों जैसे वृत्त, तारे और दिल में रंग भर सकते हैं, या फ्री-ड्रा मोड में अपनी कल्पना को उड़ान दे सकते हैं। कई रंगों और समायोज्य पेंसिल आकारों के साथ, यह आपके छोटे कलाकार के लिए एक संपूर्ण डिजिटल कैनवास है।" },
        { icon: <Wand2 className="h-8 w-8 text-purple-500" />, title: "AI कलरिंग पेज", description: "किसी भी शब्द से तुरंत अद्वितीय कलरिंग पेज बनाएं।", bgColor: "bg-purple-100", details: "एक जादुई सुविधा! बस 'सेब' या 'गाड़ी' जैसा कोई भी शब्द टाइप करें, और हमारा उन्नत AI सेकंडों में आपके लिए एक नया, कस्टम कलरिंग पेज बना देगा। यह अंतहीन रंग भरने का मज़ा प्रदान करता है और बच्चों को शब्दों को छवियों से जोड़ने में मदद करता है।" },
        { icon: <BookOpen className="h-8 w-8 text-red-500" />, title: "कहानी का समय", description: "मजेदार, छोटी ऑडियो कहानियाँ सुनें जो शब्दावली और सुनने के कौशल का निर्माण करती हैं।", bgColor: "bg-red-100", details: "छोटी, आकर्षक कहानियों के हमारे संग्रह के साथ शब्दावली और सुनने के कौशल का निर्माण करें। प्रत्येक कहानी एक शब्द पर आधारित है, जो बच्चों को मनोरंजक प्रारूप में उसका अर्थ और संदर्भ सीखने में मदद करती है। बस 'सुनो' पर क्लिक करें और आनंद लें!" },
        { icon: <Mic className="h-8 w-8 text-yellow-500" />, title: "मजेदार कविताएं", description: "ऑडियो के साथ क्लासिक अंग्रेजी और हिंदी कविताओं का आनंद लें।", bgColor: "bg-yellow-100", details: "अंग्रेजी और हिंदी दोनों में सदाबहार कविताओं और कविताओं के संग्रह का आनंद लें। यह सुविधा 'मछली जल की रानी' और 'ट्विंकल, ट्विंकल' जैसे परिचित क्लासिक्स को सुनते हुए उच्चारण और भाषा कौशल में सुधार के लिए एकदम सही है।" },
        { icon: <CheckCircle2 className="h-8 w-8 text-pink-500" />, title: "और भी बहुत कुछ!", description: "इसमें इंटरैक्टिव गिनती के खेल, पहाड़ा, और बहुत कुछ शामिल है!", bgColor: "bg-pink-100", details: "मज़ा कभी खत्म नहीं होता! AlphaJoy Kids में संख्याओं को सीखने के लिए इंटरैक्टिव गिनती के खेल और 2 से 20 तक गुणा सारणी (पहाड़ा) सीखने के लिए एक पूरा खंड भी शामिल है, जो गणित को आसान और मनोरंजक बनाता है।" },
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
     reviews: {
      title: "एक बेहतरीन सीखने के अनुभव के लिए बनाया गया",
      list: [
        { name: "छोटे बच्चों के लिए बिल्कुल सही!", text: "मज़ेदार और इंटरैक्टिव तरीके से लिखने के कौशल में सुधार करने के लिए डिज़ाइन किया गया। छोटे बच्चों के लिए एक बेहतरीन शुरुआत।" },
        { name: "अंतहीन रचनात्मकता!", text: "AI कलरिंग सुविधा हर बार एक अनूठा नया पेज प्रदान करती है। छोटे कलाकारों के लिए यह ज़रूरी है।" },
        { name: "द्विभाषी मज़ा!", text: "मातृभाषा से जुड़ने में मदद करने के लिए हिंदी कविताओं और अक्षरों सहित गतिविधियों का एक बड़ा संग्रह।" },
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

            <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-gray-600">
              <div className="flex items-center gap-2 font-semibold">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <span>{currentContent.hero.rating}</span>
              </div>
              <div className="hidden md:block">|</div>
              <div className="flex items-center gap-2 font-semibold">
                <Download className="w-6 h-6 text-green-600" />
                <span>{currentContent.hero.downloads}</span>
              </div>
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
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden p-6 flex flex-col items-center gap-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${feature.bgColor}`}>
                        {feature.icon}
                      </div>
                      <div className="mt-2">
                         <h4 className="font-bold text-xl text-gray-800">{feature.title}</h4>
                         <p className="text-muted-foreground mt-1 text-sm">{feature.description}</p>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${feature.bgColor}`}>
                          {React.cloneElement(feature.icon, {className: "h-6 w-6"})}
                        </div>
                        <span className="text-2xl">{feature.title}</span>
                      </DialogTitle>
                      <DialogDescription className="pt-4 text-base text-muted-foreground">
                        {feature.details}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
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
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image src="/screenshot-1.png.png" alt="App Screenshot 1" width="300" height="500" className="w-full h-auto" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image src="/screenshot-2.png.png" alt="App Screenshot 2" width="300" height="500" className="w-full h-auto" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image src="/screenshot-3.png.png" alt="App Screenshot 3" width="300" height="500" className="w-full h-auto" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image src="/screenshot-4.png.png" alt="App Screenshot 4" width="300" height="500" className="w-full h-auto" />
                  </div>
              </div>
            </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-white py-12 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-12">{currentContent.reviews.title}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentContent.reviews.list.map((review, index) => (
                <Card key={index} className="text-left shadow-lg">
                  <CardContent className="p-6">
                    <p className="font-bold text-lg text-gray-800">{review.name}</p>
                    <p className="text-muted-foreground mt-2">"{review.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4 pb-20">
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

    