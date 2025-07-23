
"use client";

import { BookOpen, Brush, Fingerprint, MousePointer, Paintbrush, Square, Type, Volume2, Loader2, Info } from "lucide-react";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing" | "hindi" | "pahada" | "hindivowels" | "coloring";

interface ActivityInstructionsProps {
    mode: Mode;
}

const instructions = {
    alphabet: {
        icon: <Type className="h-5 w-5" />,
        titleEn: "How to Play",
        titleHi: "कैसे खेलें",
        textEn: "Trace the letter on the screen with your finger or mouse. Follow the guide to learn the shape of each letter of the alphabet. Click 'Done!' when you are finished.",
        textHi: "स्क्रीन पर दिए गए अक्षर पर अपनी उंगली या माउस से ट्रेस करें। वर्णमाला के प्रत्येक अक्षर का आकार जानने के लिए गाइड का पालन करें। जब आप समाप्त कर लें तो 'Done!' पर क्लिक करें।",
    },
    numbers: {
        icon: <Type className="h-5 w-5" />,
        titleEn: "How to Play",
        titleHi: "कैसे खेलें",
        textEn: "Trace the number on the screen. Follow the dotted lines to learn how to write each number correctly. This will help you learn to count!",
        textHi: "स्क्रीन पर दिए गए नंबर को ट्रेस करें। प्रत्येक संख्या को सही ढंग से लिखना सीखने के लिए बिंदीदार रेखाओं का पालन करें। इससे आपको गिनती सीखने में मदद मिलेगी!",
    },
    hindi: {
        icon: <Type className="h-5 w-5" />,
        titleEn: "How to Play",
        titleHi: "कैसे खेलें",
        textEn: "Trace the letter on the screen with your finger or mouse. Follow the guide to learn the shape of each letter.",
        textHi: "स्क्रीन पर दिए गए अक्षर पर अपनी उंगली या माउस से ट्रेस करें। प्रत्येक अक्षर का आकार सीखने के लिए गाइड का पालन करें।",
    },
    hindivowels: {
        icon: <Type className="h-5 w-5" />,
        titleEn: "How to Play",
        titleHi: "कैसे खेलें",
        textEn: "Trace the Hindi vowel and its English form on the screen. This will help you learn Hindi vowels and their pronunciation.",
        textHi: "स्क्रीन पर दिए गए स्वर और उसके अंग्रेजी रूप को ट्रेस करें। इससे आपको हिंदी स्वर और उनका उच्चारण सीखने में मदद मिलेगी।",
    },
    pahada: {
        icon: <BookOpen className="h-5 w-5" />,
        titleEn: "How to Read",
        titleHi: "कैसे पढ़ें",
        textEn: "Look at and listen to the multiplication table (Pahada). Use the audio button to read each line and the 'Next' button to go to the next table.",
        textHi: "गुणन तालिका (पहाड़ा) को देखें और सुनें। प्रत्येक पंक्ति को पढ़ने के लिए ऑडियो बटन का उपयोग करें और अगली तालिका पर जाने के लिए 'Next' बटन दबाएँ।",
    },
    shapes: {
        icon: <Square className="h-5 w-5" />,
        titleEn: "How to Play",
        titleHi: "कैसे खेलें",
        textEn: "Color inside the shape! Use your finger or mouse to fill the shape with beautiful colors. Try to stay inside the lines to complete the activity.",
        textHi: "आकृति के अंदर रंग भरें! आकृति को सुंदर रंगों से भरने के लिए अपनी उंगली या माउस का उपयोग करें। गतिविधि को पूरा करने के लिए लाइनों के अंदर रहने का प्रयास करें।",
    },
    counting: {
        icon: <Fingerprint className="h-5 w-5" />,
        titleEn: "How to Play",
        titleHi: "कैसे खेलें",
        textEn: "Tap the 'Tap to Count' button to see the items. Count the items on the screen to learn numbers in a fun way! Click 'Next' for the next number.",
        textHi: "वस्तुओं को देखने के लिए 'Tap to Count' बटन पर टैप करें। मजेदार तरीके से संख्याएँ सीखने के लिए स्क्रीन पर मौजूद वस्तुओं की गिनती करें! अगली संख्या के लिए 'Next' पर क्लिक करें।",
    },
    coloring: {
        icon: <Brush className="h-5 w-5" />,
        titleEn: "How to Create & Color",
        titleHi: "कैसे बनाएं और रंग भरें",
        textEn: "Type a word (like 'Apple' or 'Car') into the box and click 'Get New Page'. Our AI will draw a coloring page for you! Then, use the tools to color your picture.",
        textHi: "बॉक्स में एक शब्द (जैसे 'Apple' या 'Car') टाइप करें और 'Get New Page' पर क्लिक करें। हमारा AI आपके लिए एक कलरिंग पेज बनाएगा! फिर, अपनी तस्वीर में रंग भरने के लिए टूल का उपयोग करें।",
    },
    reading: {
        icon: <BookOpen className="h-5 w-5" />,
        titleEn: "How to Play",
        titleHi: "कैसे खेलें",
        textEn: "Practice reading by tracing the word on the screen. Listen to the pronunciation to improve your reading skills. Click 'Next' for a new word.",
        textHi: "स्क्रीन पर शब्द को ट्रेस करके पढ़ने का अभ्यास करें। अपने पढ़ने के कौशल को बेहतर बनाने के लिए उच्चारण सुनें। एक नए शब्द के लिए 'Next' पर क्लिक करें।",
    },
    drawing: {
        icon: <Paintbrush className="h-5 w-5" />,
        titleEn: "How to Draw",
        titleHi: "कैसे बनाएं",
        textEn: "This is your canvas! Use your finger or mouse to draw anything you can imagine. Choose your favorite colors and pencil sizes to create a masterpiece.",
        textHi: "यह आपका कैनवास है! आप अपनी कल्पना से कुछ भी बनाने के लिए अपनी उंगली या माउस का उपयोग कर सकते हैं। एक उत्कृष्ट कृति बनाने के लिए अपने पसंदीदा रंग और पेंसिल आकार चुनें।",
    },
    story: {
        icon: <BookOpen className="h-5 w-5" />,
        titleEn: "How to Listen",
        titleHi: "कैसे सुनें",
        textEn: "Listen to a short, fun story about the word on the screen. Click the 'Listen' button to hear the story again. Click 'Next' to hear a new story.",
        textHi: "स्क्रीन पर दिए गए शब्द के बारे में एक छोटी, मजेदार कहानी सुनें। कहानी को फिर से सुनने के लिए 'Listen' बटन पर क्लिक करें। एक नई कहानी सुनने के लिए 'Next' पर क्लिक करें।",
    }
};

export function ActivityInstructions({ mode }: ActivityInstructionsProps) {
    const [isSpeaking, setIsSpeaking] = useState<null | 'en' | 'hi'>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const instruction = instructions[mode];

    const speak = useCallback((text: string, lang: 'en-US' | 'hi-IN', langCode: 'en' | 'hi') => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        setIsSpeaking(langCode);

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;
        utterance.lang = lang;

        const voices = window.speechSynthesis.getVoices();
        let femaleVoice;

        if (lang === 'hi-IN') {
            femaleVoice = voices.find(v => v.lang === 'hi-IN' && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Kalpana')));
        } else { // en-US
            femaleVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Samantha')));
        }

        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        utterance.onend = () => setIsSpeaking(null);
        utterance.onerror = () => setIsSpeaking(null);

        window.speechSynthesis.speak(utterance);

    }, []);

    useEffect(() => {
        const cleanup = () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
        // Ensure voices are loaded
        if (typeof window !== 'undefined' && window.speechSynthesis) {
           window.speechSynthesis.onvoiceschanged = cleanup;
        }
        
        return cleanup;
    }, [mode]);

    if (!instruction) {
        return null;
    }

    return (
        <Card className="w-full shadow-md border animate-fade-in-zoom">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-2 text-lg text-primary font-bold">
                            <Info className="h-5 w-5"/>
                            <span>{instruction.titleEn} / {instruction.titleHi}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0 space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground font-semibold">English:</p>
                          <p className="text-sm text-muted-foreground">{instruction.textEn}</p>
                        </div>
                         <div>
                          <p className="text-sm text-muted-foreground font-semibold">हिंदी:</p>
                          <p className="text-sm text-muted-foreground">{instruction.textHi}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => speak(instruction.textEn, 'en-US', 'en')} disabled={isSpeaking !== null}>
                                {isSpeaking === 'en' ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Volume2 className="mr-2 h-4 w-4" />}
                                Listen
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => speak(instruction.textHi, 'hi-IN', 'hi')} disabled={isSpeaking !== null}>
                                {isSpeaking === 'hi' ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Volume2 className="mr-2 h-4 w-4" />}
                                सुनो
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}
