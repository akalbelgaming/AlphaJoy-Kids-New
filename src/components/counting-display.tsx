
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.84,10.29C18.85,10.29,18.86,10.29,18.86,10.29C19.6,10.23,20.3,10.28,21,10.56C20.9,11.53,20.5,12.5,19.9,13.27C19.3,14.07,18.5,14.65,17.65,14.73C16.71,14.83,15.82,14.4,15.1,13.78C15.1,13.78,15.1,13.77,15.1,13.77C14.35,13.1,13.9,12.18,14,11.23C14.08,10.25,14.75,9.5,15.65,9.4C16.63,9.31,17.5,9.73,18.15,10.39C18.16,10.4,18.16,10.4,18.17,10.41C18.38,10.23,18.6,10.21,18.84,10.29M17.34,2C15.82,2,14.83,3.31,14.83,4.83C14.83,6.35,15.79,7.67,17.3,7.67C17.31,7.67,17.32,7.67,17.34,7.67C18.86,7.67,19.83,6.36,19.83,4.84C19.83,3.32,18.87,2,17.35,2H17.34Z" fill="#68a22d"/>
        <path d="M13,20.5C14.86,20.5,16.23,19.34,17.3,18.34C18.41,17.31,19.42,16.5,20.2,15.2C20.7,14.3,21,13.3,21,12.3C21,11.9,21,11.5,21,11.1C20.3,10.28,19.6,10.23,18.86,10.29C18.86,10.29,18.85,10.29,18.84,10.29C18.6,10.21,18.38,10.23,18.17,10.4C18.16,10.4,18.16,10.4,18.15,10.39C17.5,9.73,16.63,9.31,15.65,9.4C14.75,9.5,14.08,10.25,14,11.23C13.9,12.18,14.35,13.1,15.1,13.77C15.1,13.77,15.1,13.78,15.1,13.78C13.6,15.5,10,16.1,6.8,15.5C4,15,3,12.3,3,12.3C3,12.3,5.4,11.6,7.2,12.9C8.9,14.2,10.9,14.5,12.2,14.2C12.5,14.1,10.7,11.9,11.5,8.8C12.3,5.7,15.1,4.5,15.6,4.5C15.7,5.5,15.5,6.5,15,7.3C14,9.2,11.4,10.2,10.2,10.5C10.5,13.2,12.8,14.8,13.5,15.2C13.2,15.5,13,15.8,13,16.2C13,17,13,18.8,13,20.5Z" fill="#dd2e44"/>
    </svg>
);

interface CountingDisplayProps {
  count: number;
  showReward: boolean;
  onCount: () => void;
  onNext: () => void;
}

export function CountingDisplay({
  count,
  showReward,
  onCount,
  onNext,
}: CountingDisplayProps) {

  return (
    <div className="w-full h-full flex flex-1 flex-col gap-4 items-center justify-center">
      <div className="w-full max-w-2xl flex items-center justify-center flex-1">
        {showReward ? (
          <Card className="w-full shadow-lg border-2 animate-fade-in-zoom">
            <CardContent className="flex flex-col items-center justify-center gap-4 p-4 min-h-[300px]">
              <div className={cn("grid gap-2 items-center justify-center",
                count > 5 ? 'grid-cols-5' : `grid-cols-${count}`
              )}>
                {Array.from({ length: Math.min(count, 100) }).map((_, index) => (
                  <div key={index} className="relative w-16 h-16 sm:w-20 sm:h-20 p-1">
                    <AppleIcon className="w-full h-full drop-shadow-md" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full shadow-lg border-2 animate-fade-in-zoom">
            <CardHeader className="flex items-center justify-center min-h-[300px]">
              <CardTitle className="text-center">
                <p className="text-[12rem] font-bold text-primary drop-shadow-lg leading-none">{count}</p>
              </CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-4 h-24">
        {showReward ? (
          <Button 
              size="lg" 
              onClick={onNext} 
              className="w-40 animate-fade-in-zoom"
          >
              Next <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button 
              size="lg" 
              onClick={onCount} 
              className="w-40 bg-accent hover:bg-accent/90 text-accent-foreground" 
          >
              <Fingerprint className="mr-2 h-5 w-5" />
              Tap to Count
          </Button>
        )}
      </div>
    </div>
  );
}
