"use client";

import { BookOpen, Brush, Fingerprint, MousePointer, Paintbrush, Square, Type } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing" | "hindi" | "pahada" | "hindivowels" | "coloring";

interface ActivityInstructionsProps {
    mode: Mode;
}

const instructions = {
    alphabet: {
        icon: <Type className="h-6 w-6" />,
        title: "How to Play",
        text: "Trace the letter on the screen with your finger or mouse. Follow the guide to learn the shape of each letter of the alphabet. Click 'Done!' when you are finished.",
    },
    numbers: {
        icon: <Type className="h-6 w-6" />,
        title: "How to Play",
        text: "Trace the number on the screen. Follow the dotted lines to learn how to write each number correctly. This will help you learn to count!",
    },
    hindi: {
        icon: <Type className="h-6 w-6" />,
        title: "Kaise Khelen",
        text: "Screen par diye gaye akshar par ungli ya mouse se trace karein. Har akshar ka aakar seekhne ke liye guide ka paalan karein.",
    },
    hindivowels: {
        icon: <Type className="h-6 w-6" />,
        title: "Kaise Khelen",
        text: "Screen par diye gaye swar aur uske English roop ko trace karein. Isse aapko Hindi swar aur unka uchchaaran seekhne mein madad milegi.",
    },
    pahada: {
        icon: <BookOpen className="h-6 w-6" />,
        title: "Kaise Padhein",
        text: "Multiplication table (Pahada) ko dekhein aur sunein. Har line ko padhne ke liye audio button ka istemaal karein aur 'Next' button se agle table par jayein.",
    },
    shapes: {
        icon: <Square className="h-6 w-6" />,
        title: "How to Play",
        text: "Color inside the shape! Use your finger or mouse to fill the shape with beautiful colors. Try to stay inside the lines to complete the activity.",
    },
    counting: {
        icon: <Fingerprint className="h-6 w-6" />,
        title: "How to Play",
        text: "Tap the 'Tap to Count' button to see the items. Count the items on the screen to learn numbers in a fun way! Click 'Next' for the next number.",
    },
    coloring: {
        icon: <Brush className="h-6 w-6" />,
        title: "How to Create & Color",
        text: "Type a word (like 'Apple' or 'Car') into the box and click 'Get New Page'. Our AI will draw a coloring page for you! Then, use the tools to color your picture.",
    },
    reading: {
        icon: <BookOpen className="h-6 w-6" />,
        title: "How to Play",
        text: "Practice reading by tracing the word on the screen. Listen to the pronunciation to improve your reading skills. Click 'Next' for a new word.",
    },
    drawing: {
        icon: <Paintbrush className="h-6 w-6" />,
        title: "How to Draw",
        text: "This is your canvas! Use your finger or mouse to draw anything you can imagine. Choose your favorite colors and pencil sizes to create a masterpiece.",
    },
    story: {
        icon: <BookOpen className="h-6 w-6" />,
        title: "How to Listen",
        text: "Listen to a short, fun story about the word on the screen. Click the 'Listen' button to hear the story again. Click 'Next' to hear a new story.",
    }
};

export function ActivityInstructions({ mode }: ActivityInstructionsProps) {
    const instruction = instructions[mode];

    if (!instruction) {
        return null;
    }

    return (
        <Card className="w-full shadow-md border animate-fade-in-zoom mt-4 lg:mt-0">
            <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                    {instruction.icon}
                    {instruction.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{instruction.text}</p>
            </CardContent>
        </Card>
    );
}
