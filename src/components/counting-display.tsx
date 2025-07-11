"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Check, Calculator } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface CountingDisplayProps {
  count: number;
  imageUrls: string[];
  isLoading: boolean;
  onComplete: () => void;
}

export function CountingDisplay({
  count,
  imageUrls,
  isLoading,
  onComplete,
}: CountingDisplayProps) {

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <Calculator className="w-8 h-8"/>
            <span className="text-3xl font-bold">Count the items!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[250px] flex flex-col items-center justify-center gap-6 p-6">
          {isLoading ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
                {Array.from({length: count}).map((_, index) => (
                    <Skeleton key={index} className="w-24 h-24 rounded-lg" />
                ))}
            </div>
          ) : imageUrls.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
               {imageUrls.map((url, index) => (
                    <div key={index} className="relative w-24 h-24">
                        <Image
                            src={url}
                            alt={`item ${index + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 5vw"
                        />
                    </div>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Could not load items to count.</p>
          )}
        </CardContent>
      </Card>
       <p className="text-9xl font-bold text-primary drop-shadow-lg">{count}</p>
      <div className="flex gap-4 mt-4">
        <Button size="lg" onClick={onComplete} className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
          <Check className="mr-2 h-5 w-5" />
          Next
        </Button>
      </div>
    </div>
  );
}
