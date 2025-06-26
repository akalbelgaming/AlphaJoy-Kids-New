"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eraser, Check } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface TracingCanvasProps {
  character: string;
  onComplete: () => void;
  onClear: () => void;
  strokeColor: string;
  strokeWidth: number;
  difficulty: 'easy' | 'medium' | 'hard';
  fontFamily: string;
}

export function TracingCanvas({
  character,
  onComplete,
  onClear,
  strokeColor,
  strokeWidth,
  difficulty,
  fontFamily,
}: TracingCanvasProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const difficultyStyles = {
    easy: 'opacity-50',
    medium: 'opacity-30',
    hard: 'opacity-10',
  };

  const getPointInSVG = (e: React.PointerEvent<SVGSVGElement>): Point | null => {
    if (!svgRef.current) return null;
    const svg = svgRef.current;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const screenCTM = svg.getScreenCTM();
    if (screenCTM) {
      return point.matrixTransform(screenCTM.inverse());
    }
    return null;
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const point = getPointInSVG(e);
    if (point) {
      setPaths(prev => [...prev, `M ${point.x} ${point.y}`]);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing) return;
    const point = getPointInSVG(e);
    if (point) {
      setPaths(prev => {
        const newPaths = [...prev];
        newPaths[newPaths.length - 1] += ` L ${point.x} ${point.y}`;
        return newPaths;
      });
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setPaths([]);
    onClear();
  };

  const handleComplete = () => {
    if (paths.length > 0) {
      onComplete();
      setPaths([]);
    }
  };

  useEffect(() => {
    setPaths([]);
  }, [character, fontFamily]);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <div className="relative w-full aspect-square max-w-lg bg-card rounded-xl shadow-lg border touch-none overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full h-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          viewBox="0 0 500 500"
        >
          {/* Guide character */}
          <text
            x="50%"
            y="50%"
            dy="0.35em"
            textAnchor="middle"
            className={cn("select-none text-[350px] font-bold fill-muted pointer-events-none", difficultyStyles[difficulty])}
            style={{ fontFamily }}
          >
            {character}
          </text>
          
          {/* User drawing */}
          {paths.map((path, index) => (
            <path
              key={index}
              d={path}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="pointer-events-none"
            />
          ))}
        </svg>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={handleClear} className="w-32">
          <Eraser className="mr-2 h-5 w-5" />
          Clear
        </Button>
        <Button size="lg" onClick={handleComplete} className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Check className="mr-2 h-5 w-5" />
          Done!
        </Button>
      </div>
    </div>
  );
}
