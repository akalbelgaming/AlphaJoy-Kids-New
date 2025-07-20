"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, Check, Volume2 } from 'lucide-react';

interface StoryDisplayProps {
  word: string;
  story: string | null;
  audioUrl: string | null; // This will be null now, but keeping for prop consistency
  isLoading: boolean;
  onComplete: () => void;
  onReplayAudio: () => void;
  isAudioAvailable: boolean;
}

export function StoryDisplay({
  word,
  story,
  audioUrl,
  isLoading,
  onComplete,
  onReplayAudio,
  isAudioAvailable,
}: StoryDisplayProps) {

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Card className="w-full max-w-lg shadow-lg border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <BookOpen className="w-8 h-8"/>
            <span className="text-2xl">Story about: <span className="font-bold">{word}</span></span>
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[250px] flex flex-col items-center justify-center gap-6 p-6">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <p>Loading story...</p>
            </div>
          ) : story ? (
            <>
              <p className="text-lg text-center leading-relaxed p-4 bg-primary/5 rounded-lg whitespace-pre-wrap">
                {story}
              </p>
              {isAudioAvailable && (
                 <Button variant="outline" onClick={onReplayAudio}>
                    <Volume2 className="mr-2 h-5 w-5"/>
                    Listen Again
                 </Button>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">Could not find a story for this.</p>
          )}
        </CardContent>
      </Card>
      <div className="flex gap-4 mt-4">
        <Button size="lg" onClick={onComplete} className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
          <Check className="mr-2 h-5 w-5" />
          Next
        </Button>
      </div>
    </div>
  );
}
