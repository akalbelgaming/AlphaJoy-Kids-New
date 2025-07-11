
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ToyBrick,
  Award,
} from "lucide-react";
import { numbers, alphabet, shapes, readingWords, type ShapeCharacter, AlphabetCharacter } from "@/lib/characters";
import { TracingCanvas } from "@/components/tracing-canvas";
import { StoryDisplay } from "@/components/story-display";
import { AdBanner, InterstitialAd } from "@/components/ad-placeholder";
import { PointAnimation } from "@/components/point-animation";
import { getAdaptiveDifficulty, getStory, getImageForWord } from "@/app/actions";
import { ColoringCanvas } from "@/components/coloring-canvas";
import { CountingDisplay } from "@/components/counting-display";
import { ShapeColoringCanvas } from "@/components/shape-coloring-canvas";
import { CustomizationPanel } from '@/components/customization-panel';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing";
type Difficulty = "easy" | "medium" | "hard";
type FontFamily = "'PT Sans'" | "Verdana" | "'Comic Sans MS'";

const POINTS_PER_COMPLETION = 10;
const INTERSTITIAL_AD_FREQUENCY = 5; // Show ad after every 5 completions

interface GameClientProps {
    mode: Mode;
}

export default function GameClient({ mode }: GameClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const [strokeColor, setStrokeColor] = useState("#4285F4");
  const [strokeWidth, setStrokeWidth] = useState(12);
  const [fontFamily, setFontFamily] = useState<FontFamily>("'PT Sans'");

  const [completions, setCompletions] = useState(0);
  const [clears, setClears] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completionTimes, setCompletionTimes] = useState<number[]>([]);

  const [showInterstitial, setShowInterstitial] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const [story, setStory] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  
  const [countingImageUrls, setCountingImageUrls] = useState<string[]>([]);
  const [isCountingLoading, setIsCountingLoading] = useState(false);
  
  const [drawingImageUrl, setDrawingImageUrl] = useState<string | null>(null);
  const [isDrawingImageLoading, setIsDrawingImageLoading] = useState(false);

  const { toast } = useToast();

  const characterSet = useMemo(() => {
    switch (mode) {
      case "numbers":
      case "counting":
        return numbers;
      case "alphabet":
      case "story":
      case "reading": // Reading uses alphabet words now
        return alphabet; 
      case "shapes":
        return shapes;
      case "drawing":
        // For drawing, the set can be based on something simple like letters to get a word prompt
        return alphabet; 
      default:
        return [];
    }
  }, [mode]);
  
  const currentCharacter: string | AlphabetCharacter | ShapeCharacter | undefined = useMemo(
    () => characterSet[currentIndex],
    [characterSet, currentIndex]
  );
  
  const itemToTrace = useMemo(() => {
      if (!currentCharacter) return '';
      if (typeof currentCharacter === 'string') return currentCharacter; // numbers
      if ('letter' in currentCharacter) return mode === 'reading' ? currentCharacter.word : currentCharacter.letter; // alphabet, reading
      return ''; // Other modes don't trace a single character
  }, [mode, currentCharacter]);

  const itemForStory = useMemo(() => {
    if (!currentCharacter || typeof currentCharacter !== 'object' || !('word' in currentCharacter)) return '';
    return currentCharacter.word;
  }, [currentCharacter]);
  
  const itemForCounting = useMemo(() => {
    if (mode !== 'counting' || !currentCharacter || typeof currentCharacter !== 'string') return 0;
    return parseInt(currentCharacter, 10);
  }, [mode, currentCharacter]);

  const itemForShapes = useMemo(() => {
    if (mode !== 'shapes' || !currentCharacter || typeof currentCharacter !== 'object' || !('path' in currentCharacter)) return null;
    return currentCharacter as ShapeCharacter;
  }, [mode, currentCharacter]);
  
  const wordForDrawing = useMemo(() => {
    if (mode !== 'drawing' || !currentCharacter || typeof currentCharacter !== 'object' || !('word' in currentCharacter)) return null;
    return currentCharacter.word;
  }, [mode, currentCharacter]);


  useEffect(() => {
    const fetchUIData = async () => {
        setStartTime(Date.now());
        if (mode === 'story') {
            setIsStoryLoading(true);
            setStory(null);
            setAudioUrl(null);
            if (!itemForStory) {
                setIsStoryLoading(false);
                return;
            }
            try {
                const storyResponse = await getStory(itemForStory);
                if (storyResponse.success && storyResponse.data) {
                  setStory(storyResponse.data.story);
                  setAudioUrl(storyResponse.data.audioUrl);
                } else {
                   toast({ variant: "destructive", title: "Could not create a story", description: storyResponse.error || "The AI storyteller is taking a break." });
                }
            } catch (e) {
                 toast({ variant: "destructive", title: "Error fetching story", description: "An unexpected error occurred." });
            } finally {
                setIsStoryLoading(false);
            }
        } else if (mode === 'counting') {
            setIsCountingLoading(true);
            setCountingImageUrls([]);
            const count = itemForCounting;
            if (count > 0) {
              try {
                const imageResponse = await getImageForWord('apple');
                if (imageResponse.success && imageResponse.data) {
                  setCountingImageUrls(Array(count).fill(imageResponse.data.imageUrl));
                } else {
                  toast({ variant: "destructive", title: "Could not get images", description: imageResponse.error });
                }
              } catch (e) {
                  toast({ variant: "destructive", title: "Error fetching images", description: "An unexpected error occurred." });
              } finally {
                setIsCountingLoading(false);
              }
            } else {
              setIsCountingLoading(false);
            }
        }
    };
    fetchUIData();
  }, [currentIndex, mode, itemForStory, itemForCounting, toast]);


  const handleNext = useCallback(() => {
    if (characterSet.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % characterSet.length);
    }
  }, [characterSet.length]);

  const handlePrev = useCallback(() => {
    if (characterSet.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + characterSet.length) % characterSet.length);
    }
  }, [characterSet.length]);

  const handleCompletion = useCallback(() => {
    const endTime = Date.now();
    if (startTime) {
      setCompletionTimes((prev) => [...prev, (endTime - startTime) / 1000]);
    }
    setPoints((prev) => prev + POINTS_PER_COMPLETION);
    setAnimationTrigger((prev) => prev + 1);

    const newCompletions = completions + 1;
    setCompletions(newCompletions);

    if (newCompletions > 0 && newCompletions % INTERSTITIAL_AD_FREQUENCY === 0) {
      setShowInterstitial(true);
    } else {
      handleNext();
    }
  }, [completions, handleNext, startTime]);
  
  const handleClear = useCallback(() => {
    setClears((prev) => prev + 1);
  }, []);
  
  const closeInterstitial = useCallback(() => {
    setShowInterstitial(false);
    handleNext();
  }, [handleNext]);

  const renderMainContent = () => {
    switch (mode) {
      case "alphabet":
      case "numbers":
      case "reading":
        return (
          <TracingCanvas
            key={`${mode}-${currentIndex}`}
            character={itemToTrace}
            onComplete={handleCompletion}
            onClear={handleClear}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            difficulty={difficulty}
            fontFamily={fontFamily}
          />
        );
      case "shapes":
        const shape = itemForShapes;
        if (!shape) return null;
        return (
            <ShapeColoringCanvas
                key={`${mode}-${currentIndex}`}
                shapeName={shape.name}
                shapePath={shape.path}
                shapeViewBox={shape.viewBox}
                onComplete={handleCompletion}
                onClear={handleClear}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
            />
        );
      case "story":
        return (
          <StoryDisplay
            key={`${mode}-${currentIndex}`}
            word={itemForStory}
            story={story}
            audioUrl={audioUrl}
            isLoading={isStoryLoading}
            onComplete={handleCompletion}
          />
        );
       case "counting":
        return (
          <CountingDisplay
            key={`${mode}-${currentIndex}`}
            count={itemForCounting}
            imageUrls={countingImageUrls}
            isLoading={isCountingLoading}
            onComplete={handleCompletion}
          />
        );
      case "drawing":
        return (
            <ColoringCanvas
                key={`${mode}-${currentIndex}`}
                imageUrl={null}
                isLoading={false}
                onComplete={handleCompletion}
                onClear={handleClear}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
            />
        );
      default:
        return <p>Select a mode to start playing!</p>;
    }
  };


  return (
    <div className="flex-1 w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6 mb-24">
      <InterstitialAd isOpen={showInterstitial} onClose={closeInterstitial} />
      <PointAnimation
        points={POINTS_PER_COMPLETION}
        trigger={animationTrigger}
      />
      
      <aside className="w-full lg:w-80 lg:flex-shrink-0 flex flex-col gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary font-headline">
              <Award /> Your Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-center bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-primary font-semibold">TOTAL POINTS</p>
              <p className="text-5xl font-bold text-primary">{points}</p>
            </div>
          </CardContent>
        </Card>
        
        <CustomizationPanel 
            fontFamily={fontFamily}
            onFontFamilyChange={setFontFamily}
            strokeColor={strokeColor}
            onStrokeColorChange={setStrokeColor}
            strokeWidth={strokeWidth}
            onStrokeWidthChange={setStrokeWidth}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            completions={completions}
            clears={clears}
            completionTimes={completionTimes}
        />
        <AdBanner />
      </aside>

      <main className="flex-1 flex flex-col items-center justify-start relative">
        <div className="w-full flex justify-center items-center mb-4 gap-4">
          <Button variant="outline" size="lg" onClick={handlePrev} disabled={characterSet.length === 0}>
            <ArrowLeft className="mr-2" /> Prev
          </Button>
          
          <div className="flex-1 text-center">
            {/* Can show current item here if needed, e.g., the letter or number */}
          </div>

          <Button variant="outline" size="lg" onClick={handleNext} disabled={characterSet.length === 0}>
            Next <ArrowRight className="ml-2" />
          </Button>
        </div>

        <div className="w-full flex-1 flex flex-col items-center justify-center">
            {renderMainContent()}
        </div>
      </main>
    </div>
  );
}
