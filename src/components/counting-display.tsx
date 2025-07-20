
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, ArrowRight, Loader2 } from 'lucide-react';

interface CountingDisplayProps {
  count: number;
  isListening: boolean;
  isCorrect: boolean | null;
  onStartListening: () => void;
  onNext: () => void;
}

// A simple, friendly SVG for an apple.
function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <path d="M82,36.19c-0.23-10.29-11-19.19-22-18.19c-8.62,0.76-15.38,6.84-18,14.19c-3.37-7.58-10.37-13.19-19-13.19c-10,0-17,7-17,17c0,11,10,24.19,20,33.19c7,6,14,11,16,11" fill="#ff4b5c"></path>
      <path d="M50.13,32.06c2.51-7.35,9.27-13.43,17.89-14.19c11-1,21.77,7.9,22,18.19c0.2,7.37-4.2,14.2-10,18.81c-0.5,0.5-0.5,1.5,0,2c5,4,9,10,9,16c0,10-8,18-18,18s-18-8-18-18c0-8.62,6.38-16.19,14-17.19" fill="#ff7f8a"></path>
      <path d="M54,2.19c0,0-4,2-11,2s-13-4-13-4s2,6,5,10s3,10,3,10s2-6,4-8S54,2.19,54,2.19z" fill="#7cb342"></path>
    </svg>
  );
}


export function CountingDisplay({
  count,
  isListening,
  isCorrect,
  onStartListening,
  onNext,
}: CountingDisplayProps) {
  
  const showImages = isCorrect === true;

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <div className="w-full max-w-2xl min-h-[420px] flex items-center justify-center">
        {showImages ? (
            <Card className="w-full shadow-lg border-2 animate-fade-in-zoom">
                <CardContent className="min-h-[400px] flex flex-col items-center justify-center gap-4 p-4">
                    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
                    {Array.from({ length: Math.min(count, 12) }).map((_, index) => (
                        <div key={index} className="relative w-24 h-24 p-1">
                            <AppleIcon className="w-full h-full drop-shadow-md" />
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
        ) : (
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
              disabled={isListening}
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
