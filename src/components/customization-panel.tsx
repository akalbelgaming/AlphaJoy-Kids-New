
"use client";

import {
  Paintbrush,
  Palette,
  ToyBrick,
  Sparkles,
  TrendingUp,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
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
import { getAdaptiveDifficulty } from "@/app/actions";
import React from "react";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";

type Difficulty = "easy" | "medium" | "hard";
type FontFamily = "'PT Sans'" | "Verdana" | "'Comic Sans MS'";

interface CustomizationPanelProps {
  fontFamily: FontFamily;
  onFontFamilyChange: (font: FontFamily) => void;
  strokeColor: string;
  onStrokeColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  completions: number;
  clears: number;
  completionTimes: number[];
  soundEnabled: boolean;
  onSoundEnabledChange: (enabled: boolean) => void;
}

export function CustomizationPanel({
  fontFamily,
  onFontFamilyChange,
  strokeColor,
  onStrokeColorChange,
  strokeWidth,
  onStrokeWidthChange,
  difficulty,
  onDifficultyChange,
  completions,
  clears,
  completionTimes,
  soundEnabled,
  onSoundEnabledChange,
}: CustomizationPanelProps) {

  const { toast } = useToast();

  const handleUpdateDifficulty = async () => {
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
      onDifficultyChange(newDifficulty);
      toast({ variant: "default", title: `Difficulty set to ${newDifficulty.charAt(0).toUpperCase() + newDifficulty.slice(1)}!`, description: response.data.reason });
    } else {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: response.error });
    }
  };

  return (
    <>
      <Card className="shadow-lg border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary font-headline">
            <Paintbrush /> Customize
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
             <Label
                className="flex items-center gap-2 font-semibold"
              >
                {soundEnabled ? <Volume2 /> : <VolumeX />} Sound
              </Label>
              <Switch
                checked={soundEnabled}
                onCheckedChange={onSoundEnabledChange}
                aria-label="Toggle sound"
                suppressHydrationWarning
              />
          </div>
          <Separator />
          <div>
            <Label
              htmlFor="font-family"
              className="flex items-center gap-2 mb-2 font-semibold"
            >
              <ToyBrick /> Font Style
            </Label>
            <Select
              onValueChange={(v) => onFontFamilyChange(v as FontFamily)}
              defaultValue={fontFamily}
              suppressHydrationWarning
            >
              <SelectTrigger id="font-family" suppressHydrationWarning>
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
            <Label className="flex items-center gap-2 mb-2 font-semibold">
              <Palette /> Pencil Color
            </Label>
            <div className="flex gap-2">
              {["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#000000"].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => onStrokeColorChange(color)}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      strokeColor === color
                        ? "border-primary ring-2 ring-offset-2 ring-primary scale-110"
                        : "border-transparent"
                    )}
                    suppressHydrationWarning
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
              className="flex items-center gap-2 mb-2 font-semibold"
            >
              Pencil Size
            </Label>
            <Slider
              id="stroke-width"
              min={2}
              max={24}
              step={2}
              value={[strokeWidth]}
              onValueChange={(v) => onStrokeWidthChange(v[0])}
              suppressHydrationWarning
            />
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary font-headline">
            <TrendingUp /> Difficulty
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
           <div className="text-sm space-y-2 text-muted-foreground">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  Success Rate:
                </span>{" "}
                <span className="font-bold text-foreground" suppressHydrationWarning>
                  {completions + clears > 0
                    ? `${Math.round(
                        (completions / (completions + clears)) * 100
                      )}%`
                    : "N/A"}
                </span>
              </div>
               <Separator />
              <div className="flex justify-between items-center">
                 <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  Current Level:
                </span>{" "}
                <span className="capitalize font-bold text-foreground" suppressHydrationWarning>{difficulty}</span>
              </div>
            </div>
          <Button
            onClick={handleUpdateDifficulty}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            suppressHydrationWarning
          >
            <Sparkles className="mr-2 h-4 w-4" /> Adapt Difficulty
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
