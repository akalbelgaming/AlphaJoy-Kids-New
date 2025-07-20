
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Check, X, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface CountingDisplayProps {
  count: number;
  imageUrls: string[];
  isLoading: boolean;
  isListening: boolean;
  lastTranscript: string | null;
  isCorrect: boolean | null;
  onStartListening: () => void;
}

export function CountingDisplay({
  count,
  imageUrls,
  isLoading,
  isListening,
  lastTranscript,
  isCorrect,
  onStartListening,
}: CountingDisplayProps) {
  
  const getFeedbackMessage = () => {
    if (isListening) {
      return "Listening...";
    }
    if (isCorrect === false && lastTranscript) {
      return `You said "${lastTranscript}". Try again!`;
    }
    if (isCorrect === true) {
        return `That's right! This is ${count}!`;
    }
    return "Press the mic and say the number!";
  };

  const getFeedbackIcon = () => {
    if (isListening) {
      return <Mic className="w-6 h-6 text-primary animate-pulse" />;
    }
    if (isCorrect === false) {
      return <X className="w-6 h-6 text-destructive" />;
    }
    if (isCorrect === true) {
      return <Check className="w-6 h-6 text-green-500" />;
    }
    return <Mic className="w-6 h-6" />;
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg border-2">
        <CardContent className="min-h-[300px] flex flex-col items-center justify-center gap-4 p-4">
            {isLoading ? (
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {Array.from({length: Math.min(count, 12)}).map((_, index) => (
                        <Skeleton key={index} className="w-24 h-24 rounded-lg" />
                    ))}
                </div>
            ) : imageUrls.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-zoom">
                   {imageUrls.slice(0, 12).map((url, index) => (
                        <div key={index} className="relative w-24 h-24 p-2 bg-white rounded-lg shadow-inner">
                            <Image
                                src={url}
                                alt={`item ${index + 1}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 5vw"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full h-full min-h-[250px] bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground italic">What number is this?</p>
                </div>
            )}
        </CardContent>
        <CardHeader className="pt-2">
            <CardTitle className="text-center">
                <p className="text-[10rem] font-bold text-primary drop-shadow-lg leading-none">{count}</p>
            </CardTitle>
        </CardHeader>
      </Card>
      
      <div className="flex flex-col items-center gap-4 mt-4 h-24">
        <Button 
            size="lg" 
            onClick={onStartListening} 
            className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground" 
            disabled={isLoading || isListening || isCorrect === true}
        >
            {isListening ? <Mic className="mr-2 h-5 w-5 animate-pulse" /> : <Mic className="mr-2 h-5 w-5" />}
            Speak
        </Button>

        <div className="flex items-center gap-2 text-muted-foreground font-semibold text-lg h-8">
            {getFeedbackIcon()}
            <span>{getFeedbackMessage()}</span>
        </div>
      </div>
    </div>
  );
}
