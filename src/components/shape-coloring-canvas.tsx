
"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eraser, Check } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface ShapeColoringCanvasProps {
  shapeName: string;
  shapePath: string;
  shapeViewBox: string;
  onComplete: () => void;
  onClear: () => void;
  strokeColor: string;
  strokeWidth: number;
}

const COMPLETION_THRESHOLD = 0.3; // Requires 30% of the shape to be "colored"

export function ShapeColoringCanvas({
  shapeName,
  shapePath,
  shapeViewBox,
  onComplete,
  onClear,
  strokeColor,
  strokeWidth,
}: ShapeColoringCanvasProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [fillRatio, setFillRatio] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const shapeRef = useRef<SVGPathElement>(null);

  const isComplete = fillRatio >= COMPLETION_THRESHOLD;

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

  const calculateFillRatio = useCallback(() => {
    if (!shapeRef.current || paths.length === 0) return 0;

    const shapePath = shapeRef.current;
    let totalLength = 0;
    paths.forEach(pathData => {
      const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tempPath.setAttribute("d", pathData);
      totalLength += tempPath.getTotalLength();
    });

    const shapeBBox = shapePath.getBBox();
    const shapeDiagonal = Math.sqrt(shapeBBox.width ** 2 + shapeBBox.height ** 2);
    
    // Heuristic: compare drawn length to a diagonal of the shape's bounding box
    const ratio = Math.min(1, totalLength / (shapeDiagonal * 2)); // *2 is an adjustment factor
    setFillRatio(ratio);
  }, [paths]);


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
    calculateFillRatio();
  };

  const handleClear = () => {
    setPaths([]);
    setFillRatio(0);
    onClear();
  };

  const handleComplete = () => {
    if (isComplete) {
      onComplete();
      setPaths([]);
      setFillRatio(0);
    }
  };

  useEffect(() => {
    setPaths([]);
    setFillRatio(0);
  }, [shapePath]);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        <h2 className="text-4xl font-bold text-primary">{shapeName}</h2>
      <div className="relative w-full aspect-square max-w-lg bg-card rounded-xl shadow-lg border-2 touch-none overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full h-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          viewBox={shapeViewBox}
        >
          {/* Guide Shape */}
           <path
              ref={shapeRef}
              d={shapePath}
              strokeWidth="5"
              stroke="hsl(var(--muted-foreground))"
              fill="transparent"
              strokeLinejoin="round"
              className="opacity-25 pointer-events-none"
            />
          
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
        <div className="absolute bottom-2 right-2 bg-background/50 backdrop-blur-sm rounded-md px-2 py-0.5">
            <div className="text-xs text-muted-foreground">
                Fill: {Math.round(fillRatio * 100)}%
            </div>
        </div>
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
