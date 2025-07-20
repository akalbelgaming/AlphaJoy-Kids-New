
"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, ArrowRight, Loader2 } from 'lucide-react';

interface CountingDisplayProps {
  count: number;
  imageUrls: string[];
  isLoading: boolean;
  isListening: boolean;
  isCorrect: boolean | null;
  onStartListening: () => void;
  onNext: () => void;
}

export function CountingDisplay({
  count,
  imageUrls,
  isLoading,
  isListening,
  isCorrect,
  onStartListening,
  onNext,
}: CountingDisplayProps) {
  
  const showImages = isCorrect === true;

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      {/* This main card container ensures consistent height */}
      <div className="w-full max-w-2xl min-h-[420px] flex items-center justify-center">
        {showImages ? (
            // Card to show when the answer is correct (shows images)
            <Card className="w-full shadow-lg border-2 animate-fade-in-zoom">
                <CardContent className="min-h-[400px] flex flex-col items-center justify-center gap-4 p-4">
                    {isLoading ? (
                        <div className="w-full h-full min-h-[350px] bg-muted/30 rounded-lg flex items-center justify-center">
                            <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        </div>
                    ) : (
                        <div className="flex flex-wrap items-center justify-center gap-4 p-4">
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
                    )}
                </CardContent>
            </Card>
        ) : (
            // Card to show initially (shows number)
            <Card className="w-full shadow-lg border-2 animate-fade-in-zoom">
                <CardHeader className="min-h-[400px] flex items-center justify-center">
                    <CardTitle className="text-center">
                        <p className="text-[12rem] font-bold text-primary drop-shadow-lg leading-none">{count}</p>
                    </CardTitle>
                </CardHeader>
            </Card>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-4 mt-4 h-24">
        {isCorrect ? (
          <Button 
              size="lg" 
              onClick={onNext} 
              className="w-32 animate-fade-in-zoom"
          >
              Next <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button 
              size="lg" 
              onClick={onStartListening} 
              className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground" 
              disabled={isLoading || isListening}
          >
              {isListening ? <Mic className="mr-2 h-5 w-5 animate-pulse" /> : <Mic className="mr-2 h-5 w-5" />}
              Speak
          </Button>
        )}

        <div className="flex items-center gap-2 text-muted-foreground font-semibold text-lg h-8">
            {!isCorrect && (isListening ? "Listening..." : "Press the mic and say the number!")}
        </div>
      </div>
    </div>
  );
}
