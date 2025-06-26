"use client";

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface PointAnimationProps {
  points: number;
  trigger: number;
}

export function PointAnimation({ points, trigger }: PointAnimationProps) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger > 0) {
      setShow(true);
      setKey(prev => prev + 1);
      const timer = setTimeout(() => {
        setShow(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!show) return null;

  return (
    <div key={key} className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-fade-in-out-up flex items-center justify-center gap-2 bg-primary/80 text-primary-foreground p-4 rounded-full shadow-lg border-2 border-primary-foreground/50 backdrop-blur-sm">
        <Sparkles className="w-8 h-8 text-accent" />
        <span className="text-3xl font-bold font-headline text-white drop-shadow-md">+{points} Points!</span>
        <Sparkles className="w-8 h-8 text-accent" />
      </div>
    </div>
  );
}
