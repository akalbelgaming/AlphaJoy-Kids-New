
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
import { hindiVowels, type HindiCharacter } from "@/lib/hindi-characters";
import { TracingCanvas } from "@/components/tracing-canvas";
import { StoryDisplay } from "@/components/story-display";
import { AdBanner, InterstitialAd } from "@/components/ad-placeholder";
import { ColoringCanvas } from "@/components/coloring-canvas";
import { CountingDisplay } from "@/components/counting-display";
import { ShapeColoringCanvas } from "@/components/shape-coloring-canvas";
import { CustomizationPanel } from '@/components/customization-panel';
import { numberToWords, cn } from '@/lib/utils';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing" | "hindi-vowels";
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

  const [story, setStory] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  // States for counting game
  const [showReward, setShowReward] = useState(false);

  const { toast } = useToast();
  
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);
      
      const loadVoices = () => {
        const voices = synth.getVoices();
        if (voices.length > 0) {
          const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) ||
                         voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Microsoft'))) ||
                         voices.find(v => v.lang.startsWith('en'));
          const hiVoice = voices.find(v => v.lang.startsWith('hi'));
          setVoice(mode === 'hindi-vowels' ? (hiVoice || enVoice) : enVoice);
        }
      };

      if (synth.getVoices().length > 0) {
        loadVoices();
      } else {
        synth.onvoiceschanged = loadVoices;
      }
    } else {
        console.warn("Speech Synthesis not supported in this browser.");
    }
  }, [mode]);


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
      case "hindi-vowels":
        return hindiVowels;
      default:
        return [];
    }
  }, [mode]);
  
  const currentCharacter: string | AlphabetCharacter | ShapeCharacter | HindiCharacter | undefined = useMemo(
    () => characterSet[currentIndex],
    [characterSet, currentIndex]
  );
  
  const itemToTrace = useMemo(() => {
      if (!currentCharacter) return '';
      if (typeof currentCharacter === 'string') return currentCharacter;
      if ('letter' in currentCharacter) return mode === 'reading' ? currentCharacter.word : currentCharacter.letter;
      if ('vowel' in currentCharacter) return currentCharacter.vowel;
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
  
  const playSound = useCallback((text: string) => {
    if (!soundEnabled || !speechSynthesis || !text) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }, [soundEnabled, speechSynthesis, voice]);

  useEffect(() => {
    setStartTime(Date.now());
    if (mode === 'counting') {
        setShowReward(false);
    }
    if (speechSynthesis) {
        speechSynthesis.cancel();
    }
    
    // This logic handles what to say or do when the character changes
    const storyCharacter = itemForStory;
    if (mode === 'story' && storyCharacter?.story) {
      setStory(storyCharacter.story);
      playSound(storyCharacter.story);
    } else if (mode === 'story') {
      setStory("No story found for this item.");
    } else {
      let textToSpeak = '';
      if (mode === 'numbers') {
        textToSpeak = numberToWords(parseInt(itemToTrace, 10)) || itemToTrace;
      } else if (mode === 'alphabet' && typeof currentCharacter === 'object' && 'letter' in currentCharacter) {
        textToSpeak = `${currentCharacter.letter}, for ${currentCharacter.word}`;
      } else if (mode === 'reading') {
        textToSpeak = itemToTrace;
      } else if (mode === 'hindi-vowels' && typeof currentCharacter === 'object' && 'vowel' in currentCharacter) {
        textToSpeak = `${currentCharacter.vowel} से ${currentCharacter.word}`;
      }

      if (textToSpeak) {
        playSound(textToSpeak);
      }
    }

  }, [currentIndex, mode, itemForStory, itemToTrace, playSound, currentCharacter, speechSynthesis]);
  
  const handleReplaySound = () => {
    const storyCharacter = itemForStory;
    if (mode === 'story' && storyCharacter?.story) {
        playSound(storyCharacter.story);
    } else {
       let textToSpeak = '';
       if (mode === 'numbers') {
        textToSpeak = numberToWords(parseInt(itemToTrace, 10)) || itemToTrace;
      } else if (mode === 'alphabet' && typeof currentCharacter === 'object' && 'letter' in currentCharacter) {
        textToSpeak = `${currentCharacter.letter}, for ${currentCharacter.word}`;
      } else if (mode === 'reading') {
        textToSpeak = itemToTrace;
      } else if (mode === 'hindi-vowels' && typeof currentCharacter === 'object' && 'vowel' in currentCharacter) {
        textToSpeak = `${currentCharacter.vowel} से ${currentCharacter.word}`;
      }

      if (textToSpeak) {
        playSound(textToSpeak);
      }
    }
  };
  
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
  
  const handleCountTap = () => {
    setShowReward(true);
    playSound(numberToWords(itemForCounting) || itemForCounting.toString());
  };


  const renderMainContent = () => {
    switch (mode) {
      case "alphabet":
      case "numbers":
      case "reading":
      case "hindi-vowels":
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
            story={story}
            audioUrl={null} // AI Audio is removed
            isLoading={false} // No loading needed
            onComplete={handleCompletion}
            onReplayAudio={handleReplaySound}
            isAudioAvailable={soundEnabled && !!speechSynthesis}
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

  const isSoundAvailableForMode = ['numbers', 'alphabet', 'reading', 'story', 'hindi-vowels'].includes(mode);

  return (
    <div className="flex-1 w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6 mb-24">
      <InterstitialAd isOpen={showInterstitial} onClose={closeInterstitial} />
      <audio ref={audioRef} src={audioUrl ?? undefined} className="hidden" />
      
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
              disabled={!soundEnabled}
              className="rounded-full w-14 h-14"
              aria-label="Replay Sound"
            >
              {soundEnabled ? (
                <Volume2 className={cn("h-7 w-7")} />
              ) : (
                <VolumeX className={cn("h-7 w-7")} />
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
