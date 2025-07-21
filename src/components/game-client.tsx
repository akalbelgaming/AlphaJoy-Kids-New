
"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Loader2
} from "lucide-react";
import { numbers, alphabet, shapes, readingWords, type ShapeCharacter, type AlphabetCharacter } from "@/lib/characters";
import { hindiCharacters, type HindiCharacter } from "@/lib/hindi-characters";
import { TracingCanvas } from "@/components/tracing-canvas";
import { StoryDisplay } from "@/components/story-display";
import { AdBanner, InterstitialAd } from "@/components/ad-placeholder";
import { ColoringCanvas } from "@/components/coloring-canvas";
import { CountingDisplay } from "@/components/counting-display";
import { ShapeColoringCanvas } from "@/components/shape-coloring-canvas";
import { CustomizationPanel } from '@/components/customization-panel';
import { numberToWords, cn } from '@/lib/utils';
import { getAudioForText } from '@/app/actions';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing" | "hindi";
type Difficulty = "easy" | "medium" | "hard";
type FontFamily = "'PT Sans'" | "Verdana" | "'Comic Sans MS'";

const INTERSTITIAL_AD_FREQUENCY = 5; // Show ad after every 5 completions

export default function GameClient({ mode }: {mode: Mode}) {
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

  const [isAudioLoading, setIsAudioLoading] = useState(false);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // States for counting game
  const [showReward, setShowReward] = useState(false);

  const { toast } = useToast();

  const characterSet = useMemo(() => {
    switch (mode) {
      case "numbers":
      case "counting":
        return numbers;
      case "alphabet":
      case "story":
      case "reading": 
        return alphabet; 
      case "shapes":
        return shapes;
      case "drawing":
        return alphabet;
      case "hindi":
        return hindiCharacters;
      default:
        return [];
    }
  }, [mode]);
  
  const getCharacterData = useCallback((index: number) => {
    return characterSet[index];
  }, [characterSet]);

  const currentCharacter = useMemo(
    () => getCharacterData(currentIndex),
    [getCharacterData, currentIndex]
  );
  
  const itemToTrace = useMemo(() => {
      if (!currentCharacter) return '';
      if (typeof currentCharacter === 'string') return currentCharacter;
      if ('letter' in currentCharacter) return mode === 'reading' ? currentCharacter.word : currentCharacter.letter;
      if ('character' in currentCharacter) return currentCharacter.character;
      return '';
  }, [mode, currentCharacter]);

  const itemForStory = useMemo(() => {
    if (!currentCharacter || typeof currentCharacter !== 'object' || !('word' in currentCharacter)) return null;
    return currentCharacter as AlphabetCharacter;
  }, [currentCharacter]);
  
  const itemForCounting = useMemo(() => {
    if (mode !== 'counting' || !currentCharacter || typeof currentCharacter !== 'string') return 0;
    return parseInt(currentCharacter, 10);
  }, [mode, currentCharacter]);

  const itemForShapes = useMemo(() => {
    if (mode !== 'shapes' || !currentCharacter || typeof currentCharacter !== 'object' || !('path' in currentCharacter)) return null;
    return currentCharacter as ShapeCharacter;
  }, [mode, currentCharacter]);
  
  const getTextToSpeak = useCallback((char: any): string => {
    if (!char) return '';
    if (mode === 'story' && typeof char === 'object' && 'story' in char) {
      return char.story;
    } else if (mode === 'numbers' && typeof char === 'string') {
      return numberToWords(parseInt(char, 10)) || char;
    } else if (mode === 'alphabet' && typeof char === 'object' && 'letter' in char) {
      return `${char.letter}, for ${char.word}`;
    } else if (mode === 'reading' && typeof char === 'object' && 'word' in char) {
      return char.word;
    } else if (mode === 'hindi' && typeof char === 'object' && 'character' in char) {
      return `${char.character} से ${char.word}`;
    } else if (mode === 'counting' && typeof char === 'string') {
        return numberToWords(parseInt(char, 10)) || char;
    }
    return '';
  }, [mode]);

  const playSound = useCallback(async (text: string) => {
    if (!soundEnabled || !text || isAudioLoading) return;
    setIsAudioLoading(true);
    try {
      const voice = mode === 'hindi' ? 'Achernar' : 'Algenib';
      const response = await getAudioForText(text, voice);
      if (response.success && response.data?.audioUrl && audioRef.current) {
        audioRef.current.src = response.data.audioUrl;
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
      } else {
        toast({
          variant: 'destructive',
          title: 'Audio Error',
          description: response.error || 'Could not play audio.',
        });
      }
    } catch (e) {
      console.error("Failed to get audio", e);
      toast({
          variant: 'destructive',
          title: 'Audio Error',
          description: 'Failed to generate audio.',
      });
    } finally {
      setIsAudioLoading(false);
    }
  }, [soundEnabled, isAudioLoading, mode, toast]);


  const handleReplaySound = () => {
    const textToSpeak = getTextToSpeak(currentCharacter);
    if (textToSpeak) {
      playSound(textToSpeak);
    }
  };
  
  const navigateAndPlaySound = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  useEffect(() => {
    // Auto-play sound for the new character/item when index changes.
    const textToSpeak = getTextToSpeak(getCharacterData(currentIndex));
    if (textToSpeak) {
        playSound(textToSpeak);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, getCharacterData, getTextToSpeak]); // Intentionally not including playSound to avoid re-triggering on its state changes


  const handleNext = useCallback(() => {
    if (characterSet.length > 0) {
      const newIndex = (currentIndex + 1) % characterSet.length;
      navigateAndPlaySound(newIndex);
    }
  }, [characterSet.length, currentIndex, navigateAndPlaySound]);

  const handlePrev = useCallback(() => {
    if (characterSet.length > 0) {
      const newIndex = (currentIndex - 1 + characterSet.length) % characterSet.length;
      navigateAndPlaySound(newIndex);
    }
  }, [characterSet.length, currentIndex, navigateAndPlaySound]);

  useEffect(() => {
    setStartTime(Date.now());
    if (mode === 'counting') {
        setShowReward(false);
    }
  }, [currentIndex, mode]);

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
  
  const handleCountTap = () => {
    setShowReward(true);
    playSound(getTextToSpeak(currentCharacter));
  };


  const renderMainContent = () => {
    switch (mode) {
      case "alphabet":
      case "numbers":
      case "reading":
      case "hindi":
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
            word={itemForStory?.word || ''}
            story={itemForStory?.story || 'No story available.'}
            audioUrl={null}
            isLoading={isAudioLoading}
            onComplete={handleCompletion}
            onReplayAudio={handleReplaySound}
            isAudioAvailable={soundEnabled}
          />
        );
       case "counting":
        return (
          <CountingDisplay
            key={`${mode}-${currentIndex}`}
            count={itemForCounting}
            showReward={showReward}
            onCount={handleCountTap}
            onNext={handleCompletion}
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

  const isSoundAvailableForMode = ['numbers', 'alphabet', 'reading', 'story', 'hindi', 'counting'].includes(mode);

  return (
    <div className="flex-1 w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6 mb-24">
      <audio ref={audioRef} className="hidden" onEnded={() => setIsAudioLoading(false)} onError={() => setIsAudioLoading(false)} onCanPlayThrough={() => setIsAudioLoading(false)} />
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
          
          {isSoundAvailableForMode && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleReplaySound} 
              disabled={!soundEnabled || isAudioLoading}
              className="rounded-full w-14 h-14"
              aria-label="Replay Sound"
            >
              {isAudioLoading ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
              ) : soundEnabled ? (
                <Volume2 className="h-7 w-7" />
              ) : (
                <VolumeX className="h-7 w-7" />
              )}
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
