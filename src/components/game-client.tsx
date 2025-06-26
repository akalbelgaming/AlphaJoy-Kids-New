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
} from "lucide-react";
import { numbers, alphabet } from "@/lib/characters";
import { TracingCanvas } from "@/components/tracing-canvas";
import { AdBanner, InterstitialAd } from "@/components/ad-placeholder";
import { PointAnimation } from "@/components/point-animation";
import { getAdaptiveDifficulty } from "@/app/actions";

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

type Mode = "numbers" | "alphabet";
type Difficulty = "easy" | "medium" | "hard";
type FontFamily = "'PT Sans'" | "Verdana" | "'Comic Sans MS'";

const POINTS_PER_COMPLETION = 10;
const INTERSTITIAL_AD_FREQUENCY = 3;

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

  const { toast } = useToast();

  const characterSet = useMemo(
    () => (mode === "numbers" ? numbers : alphabet),
    [mode]
  );
  const currentCharacter = useMemo(
    () => characterSet[currentIndex],
    [characterSet, currentIndex]
  );

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentCharacter, mode]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % characterSet.length);
  }, [characterSet.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + characterSet.length) % characterSet.length
    );
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

    if (newCompletions % INTERSTITIAL_AD_FREQUENCY === 0) {
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
  }, []);

  const handleUpdateDifficulty = useCallback(async () => {
    if (completions === 0) {
      toast({
        title: "Not enough data!",
        description: "Complete a few tracings first to adapt difficulty.",
      });
      return;
    }

    const successRate = completions / (completions + clears);
    const averageCompletionTime =
      completionTimes.reduce((a, b) => a + b, 0) / (completionTimes.length || 1);

    toast({
      title: "Adapting difficulty...",
      description: "Our AI is finding the perfect challenge for you.",
    });

    const response = await getAdaptiveDifficulty({
      successRate,
      averageCompletionTime,
      difficulty,
    });

    if (response.success && response.data) {
      const newDifficulty = response.data.recommendedDifficulty as Difficulty;
      setDifficulty(newDifficulty);
      toast({
        variant: "default",
        title: `Difficulty set to ${
          newDifficulty.charAt(0).toUpperCase() + newDifficulty.slice(1)
        }!`,
        description: response.data.reason,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.error,
      });
    }
  }, [completions, clears, completionTimes, difficulty, toast]);

  const closeInterstitial = useCallback(() => {
    setShowInterstitial(false);
    handleNext();
  }, [handleNext]);

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
                onValueChange={(v) => setStrokeWidth(v[0])}
              />
            </div>
          </CardContent>
        </Card>
        <AdBanner />
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center relative">
        <PointAnimation
          points={POINTS_PER_COMPLETION}
          trigger={animationTrigger}
        />
        <div className="w-full flex justify-center items-center mb-4 gap-4">
          <Button variant="ghost" size="icon" onClick={handlePrev}>
            <ArrowLeft />
          </Button>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handleModeChange("alphabet")}
              variant={mode === "alphabet" ? "default" : "outline"}
              className="w-32"
            >
              <BookOpen className="mr-2" /> Letters
            </Button>
            <Button
              onClick={() => handleModeChange("numbers")}
              variant={mode === "numbers" ? "default" : "outline"}
              className="w-32"
            >
              <Hash className="mr-2" /> Numbers
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ArrowRight />
          </Button>
        </div>

        <TracingCanvas
          character={currentCharacter}
          onComplete={handleCompletion}
          onClear={handleClear}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          difficulty={difficulty}
          fontFamily={fontFamily}
        />
        <div className="w-full max-w-lg mt-4">
          <AdBanner />
        </div>
      </main>
    </div>
  );
}
