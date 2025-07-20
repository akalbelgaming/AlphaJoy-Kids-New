
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface CountingDisplayProps {
  count: number;
  isListening: boolean;
  showReward: boolean;
  onSpeak: () => void;
  onNext: () => void;
}

const appleImageSrc = "data:image/webp;base64,UklGRrIDAABXRUJQVlA4WAoAAAASAAAAjwEAlQAAQUxQSOIAAAABgGPZtneStEnb0nqX2LIsS9q2bZu2JP29bdu2bds2XQhItv27bdu2bbP9+6mHkplzYABeYf4P/g9f5C/yD/m7/E3+Jv+Mf8a/4V/wL/gX/AP+Af/pAIAaIIb/4x8AzQYAPj0GgGz7/QcAKvzfAwA1+tsCAHV+RwCA3DkUABRjYJgCgEACQAWgAEgAIgARwD2g/QZA+wEAUgAUAAYAAAC+/wIALgAYAFoAnwAAACgAFAAWABoAGgA6ABYAGgA6AP4PABQAAAAUAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAAACgAAgA4ACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACg...AAAAAAAAVlA4IIwDAABQlQCdASqPAJUAPpFGnkolo6IlIhpbAKASCWlu3XlZ4/95fG63R/wB6AD+w85P+P4Gfm/+d/0fM//L+F/rf83/bfyX/Pf2D/bf4L9yv77/j/2L/RfuT8p/s/6r/jPsF/o3+e/aH+j/1H/S/W/5t/cf2E/m/5V/i/3l/sv+X/f/m79S/7f+R/g39s/9L/////8tP63/1f81/+/+O/////8Qf1f+1f+n/jP+d96v/uP///wA/lf91/6f+N/jv2k/wP8AD+//tf/T/wP8F/xvgB/f/6n/2f8j/Gf3s/xf+Af//9nv8F/y3+I/9f/O/gD/L/+7/5P+f/eP+Xf3X/l///+AP8x/x//J/tf7P/5v+I////gB////+H5AP5n/a/9j/Q/4H/m//j3A/+X/2v/n/wH+N/8b/P////wE/nf9t/7P9z/av/Tf4r////+AD+f/3v/s/4T+P/8h/lf////UA/mf+A/9v/D/xz/kv8j/////QA/l/+F/9H/M/x3/kf9R/////LgD9xR6J15Y68468sdeWOvOOvLHXlgrR/vB1Lp9n4Y63gPzK3/A+eJd1vQfnj54+ePnj54+ePnWAP4C/0l3XhM9F8k+fH2/y9z8sfPHzx88fPHzyu2/y9yJd14/K2tJ4l3W8JnpS/KXy8sdeeOvLHXlgrYvLHTy52i/N4u7LHTlkh+a+Vlkh+a+Vlkh+a/yR6J4L7O3l7npS+XnKkdfGOt4TzJ4eWOvLHXljo7x58+eT9O3l5k8PLHXlZfLzJ4eWOvLHXnj5d7h88fPHzy/zS1lkh+XuywB/G8C/0l8vMhT8oPzJ4eWOvLFW3eXmTw8sdXwHnZlZJ+L7F3W9J4C+XlZfLzJ4TzJ4TzJ4eWOvKy+XmTw8sdXQ4H5ZIfmvlZJIfmvf+B+Vsl+a/yv4p8o70V+Vsl+a+Vlkh+X+Vlkh+a+Vlkh+a+Vlkh+a+Vlkh+a+Vlkh+a/iP/VAAA";

export function CountingDisplay({
  count,
  isListening,
  showReward,
  onSpeak,
  onNext,
}: CountingDisplayProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <div className="w-full max-w-2xl min-h-[420px] flex items-center justify-center">
        {showReward ? (
          <Card className="w-full shadow-lg border-2 animate-fade-in-zoom">
            <CardContent className="min-h-[400px] flex flex-col items-center justify-center gap-4 p-4">
              <div className="flex flex-wrap items-center justify-center gap-4 p-4">
                {Array.from({ length: Math.min(count, 12) }).map((_, index) => (
                  <div key={index} className="relative w-24 h-24 p-1">
                    <Image 
                      src={appleImageSrc} 
                      alt="A shiny red apple" 
                      width={100} 
                      height={100} 
                      className="drop-shadow-md"
                    />
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
        {showReward ? (
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
              onClick={onSpeak} 
              className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground" 
              disabled={isListening}
          >
              {isListening ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
              ) : (
                <Mic className="mr-2 h-5 w-5" />
              )}
              Speak
          </Button>
        )}

        <div className="flex items-center gap-2 text-muted-foreground font-semibold text-lg h-8">
            {!showReward && (isListening ? "Listening..." : "Press the mic and say the number!")}
        </div>
      </div>
    </div>
  );
}
