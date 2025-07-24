
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Volume2, ArrowRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface PahadaDisplayProps {
  table: string[];
  onComplete: () => void;
  onReplayAudio: () => void;
  isAudioAvailable: boolean;
  isSpeaking: boolean;
}

export function PahadaDisplay({
  table,
  onComplete,
  onReplayAudio,
  isAudioAvailable,
  isSpeaking,
}: PahadaDisplayProps) {
  if (!table || table.length === 0) {
    return <p>Loading table...</p>;
  }

  const tableNumber = table[0].split(' ')[0];

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Card className="w-full max-w-sm shadow-lg border-2 animate-fade-in-zoom">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-3 text-primary">
            <span className="text-2xl font-bold">Table of {tableNumber}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80 w-full">
            <div className="grid grid-cols-1 divide-y">
              {table.map((line, index) => (
                <p key={index} className="text-2xl text-center font-semibold py-2">
                  {line}
                </p>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="flex gap-4 mt-4">
        {isAudioAvailable && (
          <Button variant="outline" onClick={onReplayAudio} disabled={isSpeaking}>
            <Volume2 className="mr-2 h-5 w-5" />
            {isSpeaking ? 'Speaking...' : 'Listen'}
          </Button>
        )}
        <Button size="lg" onClick={onComplete} className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground">
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
