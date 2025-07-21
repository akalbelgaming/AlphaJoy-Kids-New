
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

const MIN_PATH_LENGTH_FOR_COMPLETION = 100; // Heuristic value for minimum drawing effort

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
  const [pathLength, setPathLength] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const isComplete = pathLength >= MIN_PATH_LENGTH_FOR_COMPLETION;

  const difficultyStyles = {
    easy: 'opacity-40',
    medium: 'opacity-25',
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
      setPathLength(prev => prev + 1); // Increment path length as user draws
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
    setPathLength(0);
    onClear();
  };

  const handleComplete = () => {
    if (isComplete) {
      onComplete();
      setPaths([]);
      setPathLength(0);
    }
  };

  useEffect(() => {
    setPaths([]);
    setPathLength(0);
  }, [character, fontFamily]);
  
  const isTransliteration = character.includes(' = ');
  const [englishPart, hindiPart] = isTransliteration ? character.split(' = ') : ['', ''];

  let fontSize = 'text-[350px]';
  if (isTransliteration) {
    fontSize = 'text-[200px]';
  } else if (character.length > 2) {
    fontSize = 'text-[150px]';
  } else if (character.length > 1) {
    fontSize = 'text-[200px]';
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <div className="relative w-full aspect-square max-w-lg bg-card rounded-xl shadow-lg border-2 touch-none overflow-hidden">
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
            y={isTransliteration ? "45%" : "50%"} // Adjust vertical alignment
            dominantBaseline="middle"
            textAnchor="middle"
            className={cn("select-none font-bold fill-muted-foreground pointer-events-none", fontSize, difficultyStyles[difficulty])}
            style={{ fontFamily }}
          >
            {isTransliteration ? (
              <>
                <tspan dy="-0.2em">{hindiPart}</tspan>
                <tspan x="50%" dy="1.1em">{englishPart}</tspan>
              </>
            ) : (
              <tspan dy="0.35em">{character}</tspan>
            )}
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
        <Button size="lg" onClick={handleComplete} disabled={!isComplete} className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Check className="mr-2 h-5 w-5" />
          Done!
        </Button>
      </div>
    </div>
  );
}
