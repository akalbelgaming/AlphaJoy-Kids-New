
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Volume2, Mic, Loader2, ArrowRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import type { Poem } from '@/lib/characters';

interface PoemDisplayProps {
  poem: Poem;
  onComplete: () => void;
  onReplayAudio: () => void;
  isAudioAvailable: boolean;
  isSpeaking: boolean;
}

export function PoemDisplay({
  poem,
  onComplete,
  onReplayAudio,
  isAudioAvailable,
  isSpeaking,
}: PoemDisplayProps) {
  if (!poem || poem.lines.length === 0) {
    return <p>Loading poem...</p>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Card className="w-full max-w-lg shadow-lg border-2 animate-fade-in-zoom">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-3 text-primary">
            <Mic className="w-7 h-7"/>
            <span className="text-2xl font-bold">{poem.title}</span>
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">by {poem.author}</p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full">
            <div className="grid grid-cols-1 gap-2 p-4">
              {poem.lines.map((line, index) => (
                <p key={index} className="text-xl text-center font-semibold py-1 whitespace-pre-wrap">
                  {line}
                </p>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="flex gap-4 mt-4">
        {isAudioAvailable && (
          <Button variant="outline" size="lg" onClick={onReplayAudio} disabled={isSpeaking}>
             {isSpeaking ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <Volume2 className="mr-2 h-5 w-5" />}
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
