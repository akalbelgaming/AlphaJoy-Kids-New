"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Paintbrush,
  Palette,
  ArrowRight,
  ArrowLeft,
  ToyBrick,
  Award,
  BookOpen,
  Hash,
  Sparkles,
  Users,
  TrendingUp,
  BookCopy,
  Shapes,
  Calculator,
  ScanEye,
  PenSquare,
} from "lucide-react";
import { numbers, alphabet, shapes, readingWords } from "@/lib/characters";
import { TracingCanvas } from "@/components/tracing-canvas";
import { StoryDisplay } from "@/components/story-display";
import { AdBanner, InterstitialAd } from "@/components/ad-placeholder";
import { PointAnimation } from "@/components/point-animation";
import { getAdaptiveDifficulty, getStory, getImageForWord } from "@/app/actions";
import { ColoringCanvas } from "@/components/coloring-canvas";
import { CountingDisplay } from "@/components/counting-display";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Mode = "numbers" | "alphabet" | "story" | "shapes" | "counting" | "reading" | "drawing";
type Difficulty = "easy" | "medium" | "hard";
type FontFamily = "'PT Sans'" | "Verdana" | "'Comic Sans MS'";

const POINTS_PER_COMPLETION = 10;
const INTERSTITIAL_AD_FREQUENCY = 5;

export default function GameClient() {
  const [mode, setMode] = useState<Mode>("alphabet");
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

  const { toast } = useToast();

  const characterSet = useMemo(() => {
    switch (mode) {
      case "numbers":
      case "counting":
        return numbers;
      case "alphabet":
        return alphabet;
      case "story":
        return alphabet;
      case "shapes":
        return shapes;
      case "reading":
        return readingWords;
      default:
        return [];
    }
  }, [mode]);
  
  const currentCharacter = useMemo(
    () => characterSet[currentIndex],
    [characterSet, currentIndex]
  );
  
  const itemToTrace = useMemo(() => {
      if (!currentCharacter) return '';
      if (typeof currentCharacter === 'string') return currentCharacter;
      if ('letter' in currentCharacter) return currentCharacter.letter;
      if ('shape' in currentCharacter) return currentCharacter.shape;
      if ('word' in currentCharacter) return currentCharacter.word;
      return '';
  }, [currentCharacter]);

  const itemForStory = useMemo(() => {
    if (!currentCharacter) return '';
    if (typeof currentCharacter === 'object' && 'word' in currentCharacter) return currentCharacter.word;
    return '';
  }, [currentCharacter]);

  const itemForCounting = useMemo(() => {
    if (mode !== 'counting' || !currentCharacter) return 0;
    return parseInt(currentCharacter as string, 10);
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
                // Generate one image and duplicate it for simplicity and speed
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

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setCurrentIndex(0);
    setCompletions(0);
    setClears(0);
    setCompletionTimes([]);
  }, []);

  const handleUpdateDifficulty = useCallback(async () => {
    if (completions === 0) {
      toast({ title: "Not enough data!", description: "Complete a few tracings first to adapt difficulty." });
      return;
    }

    const successRate = completions / (completions + clears);
    const averageCompletionTime = completionTimes.reduce((a, b) => a + b, 0) / (completionTimes.length || 1);

    toast({ title: "Adapting difficulty...", description: "Our AI is finding the perfect challenge for you." });

    const response = await getAdaptiveDifficulty({ successRate, averageCompletionTime, difficulty });

    if (response.success && response.data) {
      const newDifficulty = response.data.recommendedDifficulty as Difficulty;
      setDifficulty(newDifficulty);
      toast({ variant: "default", title: `Difficulty set to ${newDifficulty.charAt(0).toUpperCase() + newDifficulty.slice(1)}!`, description: response.data.reason });
    } else {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: response.error });
    }
  }, [completions, clears, completionTimes, difficulty, toast]);

  const closeInterstitial = useCallback(() => {
    setShowInterstitial(false);
    handleNext();
  }, [handleNext]);

  const renderMainContent = () => {
    switch (mode) {
      case "alphabet":
      case "numbers":
      case "shapes":
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
        return null;
    }
  };


  return (
    <div className="min-h-screen w-full bg-background text-foreground p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
      <InterstitialAd isOpen={showInterstitial} onClose={closeInterstitial} />

      <aside className="w-full lg:w-80 lg:flex-shrink-0 flex flex-col gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary font-headline">
              <Award /> Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-center bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-primary font-semibold">TOTAL POINTS</p>
              <p className="text-5xl font-bold text-primary">{points}</p>
            </div>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>
                  <Users className="inline mr-2 h-4 w-4" />
                  Success Rate:
                </span>{" "}
                <span>
                  {completions + clears > 0
                    ? `${Math.round(
                        (completions / (completions + clears)) * 100
                      )}%`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>
                  <TrendingUp className="inline mr-2 h-4 w-4" />
                  Current Difficulty:
                </span>{" "}
                <span className="capitalize font-semibold">{difficulty}</span>
              </div>
            </div>
            <Button
              onClick={handleUpdateDifficulty}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Adapt Difficulty
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary font-headline">
              <Paintbrush /> Customize
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label
                htmlFor="font-family"
                className="flex items-center gap-2 mb-2"
              >
                <ToyBrick /> Font Style
              </Label>
              <Select
                onValueChange={(v) => setFontFamily(v as FontFamily)}
                defaultValue={fontFamily}
              >
                <SelectTrigger id="font-family">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="'PT Sans'">PT Sans</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                  <SelectItem value="'Comic Sans MS'">Comic Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Palette /> Pencil Color
              </Label>
              <div className="flex gap-2">
                {["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#000000"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => setStrokeColor(color)}
                      style={{ backgroundColor: color }}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        strokeColor === color
                          ? "border-primary ring-2 ring-offset-2 ring-primary"
                          : "border-transparent"
                      )}
                    >
                      <span className="sr-only">{color}</span>
                    </button>
                  )
                )}
              </div>
            </div>
            <div>
              <Label
                htmlFor="stroke-width"
                className="flex items-center gap-2 mb-2"
              >
                Pencil Size
              </Label>
              <Slider
                id="stroke-width"
                min={2}
                max={24}
                step={2}
                value={[strokeWidth]}
                onValuege={(v) => setStrokeWidth(v[0])}
              />
            </div>
          </CardContent>
        </Card>
        <AdBanner />
      </aside>

      <main className="flex-1 flex flex-col items-center justify-start relative">
        <PointAnimation
          points={POINTS_PER_COMPLETION}
          trigger={animationTrigger}
        />
        <div className="w-full flex justify-center items-center mb-4 gap-2 flex-wrap">
          <Button variant="ghost" size="icon" onClick={handlePrev} disabled={characterSet.length === 0}>
            <ArrowLeft />
          </Button>
          <div className="flex items-center gap-2 flex-wrap justify-center">
             <Button onClick={() => handleModeChange("alphabet")} variant={mode === "alphabet" ? "default" : "outline"}><BookOpen className="mr-2" /> Letters</Button>
             <Button onClick={() => handleModeChange("numbers")} variant={mode === "numbers" ? "default" : "outline"}><Hash className="mr-2" /> Numbers</Button>
             <Button onClick={() => handleModeChange("shapes")} variant={mode === "shapes" ? "default" : "outline"}><Shapes className="mr-2" /> Shapes</Button>
             <Button onClick={() => handleModeChange("counting")} variant={mode === "counting" ? "default" : "outline"}><Calculator className="mr-2" /> Counting</Button>
             <Button onClick={() => handleModeChange("reading")} variant={mode === "reading" ? "default" : "outline"}><ScanEye className="mr-2" /> Reading</Button>
             <Button onClick={() => handleModeChange("drawing")} variant={mode === "drawing" ? "default" : "outline"}><PenSquare className="mr-2" /> Drawing</Button>
             <Button onClick={() => handleModeChange("story")} variant={mode === "story" ? "default" : "outline"}><BookCopy className="mr-2" /> Story Time</Button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNext} disabled={characterSet.length === 0}>
            <ArrowRight />
          </Button>
        </div>

        <div className="w-full flex-1 flex flex-col items-center justify-center">
            {renderMainContent()}
        </div>
        
        <div className="w-full max-w-lg mt-4 self-center">
          <AdBanner />
        </div>
      </main>
    </div>
  );
}
