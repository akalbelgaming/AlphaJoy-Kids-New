"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser, Check, Loader2 } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface ColoringCanvasProps {
  imageUrl: string | null;
  isLoading: boolean;
  onComplete: () => void;
  onClear: () => void;
  strokeColor: string;
  strokeWidth: number;
}

export function ColoringCanvas({
  imageUrl,
  isLoading,
  onComplete,
  onClear,
  strokeColor,
  strokeWidth,
}: ColoringCanvasProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

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
  }, [imageUrl]);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <div className="relative w-full aspect-square max-w-lg bg-card rounded-xl shadow-lg border touch-none overflow-hidden flex items-center justify-center">
        {isLoading ? (
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        ) : imageUrl ? (
          <svg
            ref={svgRef}
            className="w-full h-full"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            viewBox="0 0 500 500"
          >
            {/* Background coloring page */}
            <image href={imageUrl} x="0" y="0" height="500" width="500" />
            
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
        ) : (
          <p className="text-muted-foreground">Coloring page not available.</p>
        )}
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="lg" onClick={handleClear} className="w-32" disabled={isLoading || !imageUrl}>
          <Eraser className="mr-2 h-5 w-5" />
          Clear
        </Button>
        <Button size="lg" onClick={handleComplete} className="w-32 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading || !imageUrl || paths.length === 0}>
          <Check className="mr-2 h-5 w-5" />
          Done!
        </Button>
      </div>
    </div>
  );
}
