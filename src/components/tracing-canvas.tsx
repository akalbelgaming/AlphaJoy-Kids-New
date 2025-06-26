"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eraser, Check, Loader2 } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface TracingCanvasProps {
  character: string;
  word?: string;
  imageUrl?: string | null;
  isImageLoading?: boolean;
  onComplete: () => void;
  onClear: () => void;
  strokeColor: string;
  strokeWidth: number;
  difficulty: 'easy' | 'medium' | 'hard';
  fontFamily: string;
}

export function TracingCanvas({
  character,
  word,
  imageUrl,
  isImageLoading,
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
    easy: 'opacity-40',
    medium: 'opacity-25',
    hard: 'opacity-15',
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
          {/* Background Image */}
          {isImageLoading && (
            <foreignObject x="0" y="0" width="500" height="500">
                <div className="w-full h-full flex items-center justify-center bg-muted/30">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                </div>
            </foreignObject>
          )}
          {imageUrl && !isImageLoading && (
            <image href={imageUrl} x="50" y="50" height="400" width="400" className="opacity-20 pointer-events-none" />
          )}

          {/* Guide character */}
          <text
            x="50%"
            y="50%"
            dy="0.35em"
            textAnchor="middle"
            className={cn("select-none text-[350px] font-bold fill-muted-foreground pointer-events-none", difficultyStyles[difficulty])}
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

        {word && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-lg border shadow">
             <p className="text-2xl font-bold text-primary">{`${character} for ${word}`}</p>
          </div>
        )}
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
