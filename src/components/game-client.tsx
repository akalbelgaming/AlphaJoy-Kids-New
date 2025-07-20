
"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Volume2
} from "lucide-react";
import { numbers, alphabet, shapes, readingWords, type ShapeCharacter, AlphabetCharacter } from "@/lib/characters";
import { TracingCanvas } from "@/components/tracing-canvas";
import { StoryDisplay } from "@/components/story-display";
import { AdBanner, InterstitialAd } from "@/components/ad-placeholder";
import { getStory, getImageForWord, getAudioForText } from "@/app/actions";
import { ColoringCanvas } from "@/components/coloring-canvas";
import { CountingDisplay } from "@/components/counting-display";
import { ShapeColoringCanvas } from "@/components/shape-coloring-canvas";
import { CustomizationPanel } from '@/components/customization-panel';
import { numberToWords } from '@/lib/utils';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing";
type Difficulty = "easy" | "medium" | "hard";
type FontFamily = "'PT Sans'" | "Verdana" | "'Comic Sans MS'";

const INTERSTITIAL_AD_FREQUENCY = 5; // Show ad after every 5 completions

interface GameClientProps {
    mode: Mode;
}

export default function GameClient({ mode }: GameClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const [strokeColor, setStrokeColor] = useState("#4285F4");
  const [strokeWidth, setStrokeWidth] = useState(12);
  const [fontFamily, setFontFamily] = useState<FontFamily>("'PT Sans'");

  const [completions, setCompletions] = useState(0);
  const [clears, setClears] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completionTimes, setCompletionTimes] = useState<number[]>([]);

  const [showInterstitial, setShowInterstitial] = useState(false);

  const [story, setStory] = useState<string | null>(null);
  const [storyAudioUrl, setStoryAudioUrl] = useState<string | null>(null);
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  
  const [countingImageUrls, setCountingImageUrls] = useState<string[]>([]);
  const [isCountingLoading, setIsCountingLoading] = useState(false);
  
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCache = useRef<Map<string, string>>(new Map());
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioAbortControllerRef = useRef<AbortController | null>(null);

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

  const getTextToSpeak = useCallback(() => {
    if (mode === 'numbers') {
      const num = parseInt(itemToTrace, 10);
      return numberToWords(num) || itemToTrace;
    }
    if (mode === 'alphabet' || mode === 'reading') {
      return itemToTrace;
    }
    return '';
  }, [mode, itemToTrace]);

  const playAudio = useCallback((url: string) => {
    if (audioRef.current && soundEnabled) {
      audioRef.current.src = url;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [soundEnabled]);

  const fetchCharacterAudio = useCallback(async (textToSpeak: string, controller: AbortController) => {
    if (audioCache.current.has(textToSpeak)) {
      playAudio(audioCache.current.get(textToSpeak)!);
      return;
    }

    setIsAudioLoading(true);
    try {
      const response = await getAudioForText(textToSpeak);
      if (controller.signal.aborted) return;

      if (response.success && response.data?.audioUrl) {
        audioCache.current.set(textToSpeak, response.data.audioUrl);
        playAudio(response.data.audioUrl);
      } else {
        console.error("Failed to fetch audio:", response.error);
        if (response.error?.includes('429')) {
             toast({
                variant: "destructive",
                title: "Daily Sound Limit Reached",
                description: "You've used all free sounds for today. Previously played sounds will still work. Please try again tomorrow!",
                duration: 8000
             });
        } else {
            toast({
              variant: "destructive",
              title: "Could Not Play Sound",
              description: response.error || "The AI might be busy. Please try again.",
            });
        }
      }
    } catch (error) {
       if (controller.signal.aborted) return;
       console.error("Error fetching audio:", error);
       toast({ variant: "destructive", title: "Audio Error", description: "An unexpected error occurred." });
    } finally {
       if (!controller.signal.aborted) {
        setIsAudioLoading(false);
       }
    }
  }, [toast, playAudio]);
  
  const handleReplaySound = useCallback(() => {
    const textToSpeak = getTextToSpeak();
    if (!textToSpeak || !soundEnabled) return;
    
    const cachedUrl = audioCache.current.get(textToSpeak);
    if (cachedUrl) {
      playAudio(cachedUrl);
    } else if (!isAudioLoading) {
      // If not cached, fetch it now on manual request
      const controller = new AbortController();
      audioAbortControllerRef.current = controller;
      fetchCharacterAudio(textToSpeak, controller);
    }
  }, [getTextToSpeak, soundEnabled, isAudioLoading, fetchCharacterAudio, playAudio]);


  useEffect(() => {
    setStartTime(Date.now());
    
    // Abort any ongoing audio requests from previous character
    if (audioAbortControllerRef.current) {
        audioAbortControllerRef.current.abort();
    }
    setIsAudioLoading(false);

    // Create a new AbortController for the current character's requests
    const controller = new AbortController();
    audioAbortControllerRef.current = controller;

    const fetchUIData = async () => {
        // Handle audio for traceable items
        const textToSpeak = getTextToSpeak();
        if (soundEnabled && textToSpeak && ['numbers', 'alphabet', 'reading'].includes(mode)) {
          // Pass the controller to the fetch function
          await fetchCharacterAudio(textToSpeak, controller);
        }

        // Handle story generation
        if (mode === 'story') {
            setIsStoryLoading(true);
            setStory(null);
            setStoryAudioUrl(null);
            if (!itemForStory) {
                setIsStoryLoading(false);
                return;
            }
            try {
                const storyResponse = await getStory(itemForStory);
                if (controller.signal.aborted) return; // Check if aborted
                if (storyResponse.success && storyResponse.data) {
                  setStory(storyResponse.data.story);
                  setStoryAudioUrl(storyResponse.data.audioUrl);
                } else {
                   toast({ variant: "destructive", title: "Could not create a story", description: storyResponse.error || "The AI storyteller is taking a break." });
                }
            } catch (e) {
                 if (controller.signal.aborted) return; // Check if aborted
                 toast({ variant: "destructive", title: "Error fetching story", description: "An unexpected error occurred." });
            } finally {
                if (!controller.signal.aborted) setIsStoryLoading(false);
            }
        } 
        
        // Handle counting item generation
        else if (mode === 'counting') {
            setIsCountingLoading(true);
            setCountingImageUrls([]);
            const count = itemForCounting;
            const itemToCountWord = "apple"; 
            if (count > 0 && itemToCountWord) {
              try {
                const imageResponse = await getImageForWord(itemToCountWord);
                if (controller.signal.aborted) return; // Check if aborted
                if (imageResponse.success && imageResponse.data?.imageUrl) {
                  setCountingImageUrls(Array(count).fill(imageResponse.data.imageUrl));
                } else {
                  toast({ variant: "destructive", title: "Could not get images", description: imageResponse.error });
                  setCountingImageUrls([]);
                }
              } catch (e) {
                  if (controller.signal.aborted) return; // Check if aborted
                  toast({ variant: "destructive", title: "Error fetching images", description: "An unexpected error occurred." });
                  setCountingImageUrls([]);
              } finally {
                if (!controller.signal.aborted) setIsCountingLoading(false);
              }
            } else {
              setIsCountingLoading(false);
            }
        }
    };

    fetchUIData();

    // Cleanup function to abort on component unmount or dependency change
    return () => {
        controller.abort();
    };

  }, [currentIndex, mode, soundEnabled, toast, itemForStory, itemForCounting, getTextToSpeak, fetchCharacterAudio]);
  
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
            audioUrl={storyAudioUrl}
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

  const isSoundAvailable = ['numbers', 'alphabet', 'reading'].includes(mode);

  return (
    <div className="flex-1 w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6 mb-24">
      <audio ref={audioRef} hidden />
      <InterstitialAd isOpen={showInterstitial} onClose={closeInterstitial} />
      
      <aside className="w-full lg:w-80 lg:flex-shrink-0 flex flex-col gap-6">
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
            soundEnabled={soundEnabled}
            onSoundEnabledChange={setSoundEnabled}
        />
        <AdBanner />
      </aside>

      <main className="flex-1 flex flex-col items-center justify-start relative">
        <div className="w-full flex justify-center items-center mb-4 gap-4">
          <Button variant="outline" size="lg" onClick={handlePrev} disabled={characterSet.length === 0}>
            <ArrowLeft className="mr-2" /> Prev
          </Button>
          
          {isSoundAvailable && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleReplaySound} 
              disabled={isAudioLoading || !soundEnabled}
              className="rounded-full w-14 h-14"
              aria-label="Replay Sound"
            >
              <Volume2 className={cn("h-7 w-7", isAudioLoading && "animate-pulse")} />
            </Button>
          )}

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
