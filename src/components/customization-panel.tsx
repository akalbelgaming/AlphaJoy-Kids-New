
"use client";

import {
  Paintbrush,
  Palette,
  ToyBrick,
  Sparkles,
  TrendingUp,
  Users
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
              onValueChange={(v) => onFontFamilyChange(v as FontFamily)}
              defaultValue={fontFamily}
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
            <Label className="flex items-center gap-2 mb-2">
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
                      "w-8 h-8 rounded-full border-2",
                      strokeColor === color
                        ? "border-primary ring-2 ring-offset-2 ring-primary"
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
              onValueChange={(v) => onStrokeWidthChange(v[0])}
              suppressHydrationWarning
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary font-headline">
            <TrendingUp /> Difficulty
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
           <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>
                  <Users className="inline mr-2 h-4 w-4" />
                  Success Rate:
                </span>{" "}
                <span suppressHydrationWarning>
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
                  Current Level:
                </span>{" "}
                <span className="capitalize font-semibold">{difficulty}</span>
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
