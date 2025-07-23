
"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Loader2,
  Gift,
} from "lucide-react";
import { numbers, alphabet, shapes, readingWords, type ShapeCharacter, type AlphabetCharacter, englishPoems, hindiKabitas, type Poem } from "@/lib/characters";
import { hindiCharacters, hindiTransliteratedCharacters, type HindiCharacter, type HindiTransliteratedCharacter } from "@/lib/hindi-characters";
import { TracingCanvas } from "@/components/tracing-canvas";
import { StoryDisplay } from "@/components/story-display";
import { ColoringCanvas } from "@/components/coloring-canvas";
import { CountingDisplay } from "@/components/counting-display";
import { ShapeColoringCanvas } from "@/components/shape-coloring-canvas";
import { CustomizationPanel } from '@/components/customization-panel';
import { numberToWords, cn } from '@/lib/utils';
import { PahadaDisplay } from '@/components/pahada-display';
import { PoemDisplay } from '@/components/poem-display';


import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from "./ad-placeholder";
import { ColoringClient } from "./coloring-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ActivityInstructions } from "./activity-instructions";

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing" | "hindi" | "pahada" | "hindivowels" | "coloring" | "poem" | "kabita";
type Difficulty = "easy" | "medium" | "hard";
type FontFamily = "'PT Sans'" | "Verdana" | "'Comic Sans MS'";

// Generate tables from 2 to 20
const pahadaTables: string[][] = [];
for (let i = 2; i <= 20; i++) {
  const table: string[] = [];
  for (let j = 1; j <= 10; j++) {
    table.push(`${i} x ${j} = ${i * j}`);
  }
  pahadaTables.push(table);
}

// Function to convert table string to voice string
const pahadaToSpeech = (tableLine: string): string => {
    const parts = tableLine.match(/(\d+) x (\d+) = (\d+)/);
    if (!parts) return tableLine;

    const [, num1, num2, result] = parts;
    const num2Word = numberToWords(parseInt(num2, 10))?.replace(' ', '') || num2;
    
    // Hindi-style pronunciation for numbers 1-10
    const pronunciation = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const num2Pronunciation = parseInt(num2, 10) >= 1 && parseInt(num2, 10) <= 10 ? pronunciation[parseInt(num2, 10) - 1] : num2Word;

    if (num2 === '1') {
      return `${num1} anja ${result}`;
    } else if (num2 === '2') {
      return `${num1} tuja ${result}`;
    } else if (num2 === '3') {
      return `${num1} thrija ${result}`;
    }
    // Generic pronunciation for 4-10
    return `${num1} ${num2Pronunciation} ja ${result}`;
};


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

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechQueueRef = useRef<string[]>([]);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // States for counting game
  const [showReward, setShowReward] = useState(false);
  
  // State for the rewarded ad gate
  const [showAdGate, setShowAdGate] = useState(false);
  const [completionCountForAd, setCompletionCountForAd] = useState(0);
  const AD_GATE_THRESHOLD = 5; // Show ad after every 5 completions

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
        return []; // No character set for free draw
      case "coloring":
        return []; // No character set for coloring
      case "hindi":
        return hindiCharacters;
      case "hindivowels":
        return hindiTransliteratedCharacters;
      case "pahada":
        return pahadaTables;
      case "poem":
        return englishPoems;
      case "kabita":
        return hindiKabitas;
      default:
        return [];
    }
  }, [mode]);
  
  const getCharacterData = useCallback((index: number) => {
    if (index < 0 || index >= characterSet.length) return null;
    return characterSet[index];
  }, [characterSet]);

  const currentCharacter = useMemo(
    () => getCharacterData(currentIndex),
    [getCharacterData, currentIndex]
  );
  
  const itemToTrace = useMemo(() => {
    if (!currentCharacter) return '';
    
    // Determine the character string to be traced
    let characterStr = '';
    if (typeof currentCharacter === 'string') {
      characterStr = currentCharacter;
    } else if ('letter' in currentCharacter) { // AlphabetCharacter
      characterStr = mode === 'reading' ? currentCharacter.word : currentCharacter.letter;
    } else if ('character' in currentCharacter) { // HindiCharacter
      characterStr = currentCharacter.character;
    } else if ('display' in currentCharacter) { // HindiTransliteratedCharacter
      characterStr = currentCharacter.display;
    } else if (Array.isArray(currentCharacter)) { // Pahada tables
      return ''; // Not traced
    }

    if (!characterStr) return '';

    // Final formatting for tracing canvas
    if (typeof currentCharacter === 'string' && currentCharacter.length > 2 && !currentCharacter.includes('=')) {
      return characterStr.toUpperCase();
    }
    
    return characterStr;
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
  
  const itemForPahada = useMemo(() => {
    if (mode !== 'pahada' || !Array.isArray(currentCharacter)) return null;
    return currentCharacter as string[];
  }, [mode, currentCharacter]);

  const itemForPoem = useMemo(() => {
    if (mode !== 'poem' && mode !== 'kabita' || !currentCharacter || !('lines' in currentCharacter)) return null;
    return currentCharacter as Poem;
  }, [mode, currentCharacter]);

  const getTextToSpeak = useCallback((char: any): string | string[] => {
    if (!char) return '';

    if (mode === 'hindi' && typeof char === 'object' && 'character' in char && 'word' in char) {
        const hindiChar = char as HindiCharacter;
        return `${hindiChar.character} se ${hindiChar.word}`;
    }
    
    if (mode === 'hindivowels' && typeof char === 'object' && 'pronunciation' in char && 'hindi' in char) {
        const translitChar = char as HindiTransliteratedCharacter;
        return `${translitChar.pronunciation} se ${translitChar.hindi}`;
    }

    if (mode === 'story' && typeof char === 'object' && 'story' in char) {
      return char.story;
    } else if (mode === 'numbers' && typeof char === 'string') {
      return numberToWords(parseInt(char, 10)) || char;
    } else if (mode === 'alphabet' && typeof char === 'object' && 'letter' in char) {
      if (char.letter === 'Z') {
        return `Zee, for ${char.word}`;
      }
      return `${char.letter}, for ${char.word}`;
    } else if (mode === 'reading' && typeof char === 'object' && 'word' in char) {
      return char.word;
    } else if (mode === 'counting' && typeof char === 'string') {
        return numberToWords(parseInt(char, 10)) || char;
    } else if (mode === 'pahada' && Array.isArray(char)) {
        return char.map(pahadaToSpeech);
    } else if ((mode === 'poem' || mode === 'kabita') && typeof char === 'object' && 'lines' in char) {
      const poem = char as Poem;
      return poem.lines;
    }
    return '';
  }, [mode]);

  const playSound = useCallback((textOrQueue: string | string[]) => {
    if (!soundEnabled || !textOrQueue || typeof window === 'undefined' || !window.speechSynthesis) return;

    const cleanup = () => {
        setIsSpeaking(false);
        if (utteranceRef.current) {
            utteranceRef.current.onend = null;
            utteranceRef.current.onerror = null;
            utteranceRef.current.onstart = null;
            utteranceRef.current = null;
        }
        if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current);
            speechTimeoutRef.current = null;
        }
    };

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    cleanup();
    speechQueueRef.current = [];

    const queue = Array.isArray(textOrQueue) ? textOrQueue : [textOrQueue];
    speechQueueRef.current = [...queue];

    const speakNext = () => {
        if (speechQueueRef.current.length === 0) {
            cleanup();
            return;
        }

        const text = speechQueueRef.current.shift();
        if (!text) {
            cleanup();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;
        
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.1; // Slightly higher pitch

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            if (speechQueueRef.current.length > 0) {
                // Pause before the next line in pahada/poem/kabita mode
                if (mode === 'pahada' || mode === 'poem' || mode === 'kabita') {
                    speechTimeoutRef.current = setTimeout(speakNext, 500);
                } else {
                    speakNext();
                }
            } else {
                cleanup();
            }
        };
        utterance.onerror = (e) => {
            if (e.error !== 'interrupted') {
                console.error("SpeechSynthesis Error:", e.error);
            }
            cleanup();
        };

        const voices = window.speechSynthesis.getVoices();
        if (mode === 'hindi' || mode === 'hindivowels' || mode === 'pahada' || mode === 'kabita') {
            utterance.lang = 'hi-IN';
            const hindiVoice = voices.find(voice => voice.lang === 'hi-IN' && (voice.name.includes('Kalpana') || voice.name.includes('Google')));
            if (hindiVoice) utterance.voice = hindiVoice;
        } else {
            utterance.lang = 'en-US';
            let femaleVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English')));
            if (femaleVoice) utterance.voice = femaleVoice;
        }
        window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            speakNext();
            window.speechSynthesis.onvoiceschanged = null;
        };
    } else {
        speakNext();
    }
  }, [soundEnabled, mode]);


  const handleReplaySound = () => {
    const textToSpeak = getTextToSpeak(currentCharacter);
    if (textToSpeak) {
      playSound(textToSpeak);
    }
  };
  
  const navigateAndPlaySound = useCallback((newIndex: number) => {
    const charData = getCharacterData(newIndex);
    if (!charData) return;

    setCurrentIndex(newIndex);
    // Wait a moment before playing sound to allow UI to update
    setTimeout(() => {
        const textToSpeak = getTextToSpeak(charData);
        if (textToSpeak) {
            playSound(textToSpeak);
        }
    }, 100);
  }, [getCharacterData, playSound, getTextToSpeak]);

  useEffect(() => {
    // This effect ensures sound plays on initial load of the component
    // We wait for voices to be loaded.
    const speakOnLoad = () => {
        const textToSpeak = getTextToSpeak(currentCharacter);
        if (textToSpeak) {
            playSound(textToSpeak);
        }
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            speakOnLoad();
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                speakOnLoad();
                window.speechSynthesis.onvoiceschanged = null;
            }
        }
    }

    // Cleanup function to cancel speech if the component unmounts
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []); // Only run once on component mount for initial sound


  useEffect(() => {
    // This effect only handles re-playing sound when the index changes, not on initial load
    if(currentIndex !== 0) {
      handleReplaySound();
    }
  }, [currentIndex]);
  
  useEffect(() => {
    // Set soundEnabled state only on the client
    setSoundEnabled(true);
  }, []);


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
    setCompletions((prev) => prev + 1);
    
    const newCompletionCount = completionCountForAd + 1;
    setCompletionCountForAd(newCompletionCount);

    if (mode !== 'drawing' && newCompletionCount >= AD_GATE_THRESHOLD) {
      setShowAdGate(true);
    } else {
      handleNext();
    }

  }, [handleNext, startTime, completionCountForAd, mode]);

  const handleAdWatched = () => {
    setCompletionCountForAd(0); // Reset counter
    setShowAdGate(false);
    toast({
        title: "Thank you!",
        description: "You've unlocked more fun activities."
    });
    handleNext(); // Proceed to next item
  };

  
  const handleClear = useCallback(() => {
    setClears((prev) => prev + 1);
  }, []);
  
  const handleCountTap = () => {
    setShowReward(true);
    const textToSpeak = getTextToSpeak(currentCharacter);
    if (textToSpeak) {
      playSound(textToSpeak);
    }
  };

  const renderSidePanel = () => {
    if (mode === 'coloring') {
      return (
        <ColoringClient 
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      );
    }
    return (
      <div className="flex flex-col gap-6">
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
        <ActivityInstructions mode={mode} />
      </div>
    );
  };

  const renderMainContent = () => {
    switch (mode) {
      case "alphabet":
      case "numbers":
      case "reading":
      case "hindi":
      case "hindivowels":
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
      case "pahada":
        const table = itemForPahada;
        if (!table) return <Loader2 className="h-16 w-16 animate-spin" />;
        return (
          <PahadaDisplay
            key={`${mode}-${currentIndex}`}
            table={table}
            onComplete={handleCompletion}
            onReplayAudio={handleReplaySound}
            isAudioAvailable={soundEnabled}
            isSpeaking={isSpeaking}
          />
        );
      case "poem":
      case "kabita":
        const poem = itemForPoem;
        if (!poem) return <Loader2 className="h-16 w-16 animate-spin" />;
        return (
          <PoemDisplay
            key={`${mode}-${currentIndex}`}
            poem={poem}
            onComplete={handleCompletion}
            onReplayAudio={handleReplaySound}
            isAudioAvailable={soundEnabled}
            isSpeaking={isSpeaking}
          />
        );
      case "shapes":
        const shape = itemForShapes;
        if (!shape) return <Loader2 className="h-16 w-16 animate-spin" />;
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
        if (!itemForStory) return <Loader2 className="h-16 w-16 animate-spin" />;
        return (
          <StoryDisplay
            key={`${mode}-${currentIndex}`}
            word={itemForStory?.word || ''}
            story={itemForStory?.story || 'No story available.'}
            isLoading={isSpeaking}
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
                imageUrl={null}
                isLoading={false}
                key={`${mode}-${currentIndex}`}
                onComplete={handleCompletion}
                onClear={handleClear}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
            />
        );
      case "coloring":
         // The main coloring UI is rendered via the side panel's client component
         return null;
      default:
        return <p>Select a mode to start playing!</p>;
    }
  };

  const isSoundAvailableForMode = ['numbers', 'alphabet', 'reading', 'story', 'hindi', 'counting', 'pahada', 'hindivowels', 'poem', 'kabita'].includes(mode);

  if (mode === 'coloring') {
    return (
      <div className="flex-1 w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6 mb-24">
        {renderSidePanel()}
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-6 mb-24">
        
        <aside className="w-full lg:w-80 lg:flex-shrink-0 flex flex-col gap-6">
          {renderSidePanel()}
          <AdBanner />
        </aside>

        <main className="flex-1 flex flex-col items-center justify-start relative">
          <div className="w-full flex justify-center items-center mb-4 gap-4">
            <Button variant="outline" size="lg" onClick={handlePrev} disabled={characterSet.length === 0}>
              <ArrowLeft className="mr-2" /> Prev
            </Button>
            
            {isSoundAvailableForMode && !['pahada', 'poem', 'kabita'].includes(mode) && (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleReplaySound} 
                disabled={!soundEnabled || isSpeaking}
                className="rounded-full w-14 h-14"
                aria-label="Replay Sound"
              >
                {isSpeaking ? (
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
      <AlertDialog open={showAdGate} onOpenChange={setShowAdGate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Great Job!</AlertDialogTitle>
            <AlertDialogDescription>
              You've done a great job on the last few activities! Watch a short ad to unlock the next set of fun exercises.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAdGate(false)}>Maybe Later</AlertDialogCancel>
            <AlertDialogAction onClick={handleAdWatched}>
              <Gift className="mr-2" /> Watch Ad & Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
