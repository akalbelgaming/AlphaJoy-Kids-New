
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColoringCanvas } from '@/components/coloring-canvas';
import { useToast } from '@/hooks/use-toast';
// import { getColoringPage } from '@/app/actions'; // Temporarily disabled for static export
import { Wand2, Gift, Palette, Loader2 } from 'lucide-react';
import { AdMob, RewardAdOptions, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
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
import { cn } from '@/lib/utils';
import { Slider } from './ui/slider';
import { Label } from './ui/label';

const REWARDED_AD_ID = 'ca-app-pub-9307441315088203/8422169437';

interface ColoringClientProps {
  strokeColor: string;
  strokeWidth: number;
}

export function ColoringClient({ strokeColor: initialStrokeColor, strokeWidth: initialStrokeWidth }: ColoringClientProps) {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRewardDialog, setShowRewardDialog] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  
  const [strokeColor, setStrokeColor] = useState(initialStrokeColor);
  const [strokeWidth, setStrokeWidth] = useState(initialStrokeWidth);

  const { toast } = useToast();

  const isNative = Capacitor.isNativePlatform();
  
  const generateAndSetImage = useCallback(async () => {
      setIsLoading(true);
      setImageUrl(null); // Clear previous image while loading
      toast({
        title: 'Our AI is drawing for you!',
        description: 'Please wait a moment...',
      });
  
      // const response = await getColoringPage(prompt); // Temporarily disabled
      // This is the mock response causing the build error. We'll type it correctly.
      const response: { success: boolean; data?: { imageUrl: string }; error?: string } = { 
        success: false, 
        error: 'AI feature is temporarily disabled for this build.' 
      };
      
      setIsLoading(false);
      if (response.success && response.data?.imageUrl) {
        setImageUrl(response.data.imageUrl);
        toast({
          variant: 'default',
          title: 'Your coloring page is ready!',
          description: `Happy coloring this ${prompt}!`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no! Something went wrong.',
          description: response.error || 'The AI could not create an image. Please try another word.',
        });
      }
  }, [prompt, toast]);

  const handleGenerateClick = () => {
    if (!prompt) {
      toast({
        variant: 'destructive',
        title: 'Please enter a word',
        description: 'Tell the AI what you want to color!',
      });
      return;
    }
    // Temporarily disable the ad gate and generation for static build
    // toast({
    //     variant: 'destructive',
    //     title: 'Feature Disabled',
    //     description: 'The AI coloring page feature is temporarily disabled to create the app build.',
    // });
    setShowRewardDialog(true);
  };
  
  const onReward = useCallback(() => {
    console.log('Reward received');
    toast({
        title: 'Thank you for watching!',
        description: `Creating a page for "${prompt}"...`
    });
    generateAndSetImage();
  }, [generateAndSetImage, prompt, toast]);
  
  useEffect(() => {
      if (!isNative) return;

      const rewardListener = AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward) => {
          console.log('Reward ad event: REWARDED', reward);
          onReward();
      });

      const failedListener = AdMob.addListener(RewardAdPluginEvents.FailedToShow, (error) => {
          console.error('Reward ad event: FAILED_TO_SHOW', error);
          toast({ variant: 'destructive', title: 'Ad failed', description: 'Could not show the ad. Please try again later.' });
      });

      return () => {
          rewardListener.remove();
          failedListener.remove();
      };
  }, [isNative, onReward, toast]);

  const handleAdWatched = useCallback(async () => {
    if (!isNative) {
      console.warn("AdMob is not available on web. Simulating success.");
      onReward();
      return;
    }

    try {
        setIsAdLoading(true);
        const options: RewardAdOptions = { adId: REWARDED_AD_ID };
        await AdMob.prepareRewardVideoAd(options);
        await AdMob.showRewardVideoAd();
    } catch (e) {
        console.error("Error showing rewarded ad:", e);
        toast({ variant: 'destructive', title: 'Ad Error', description: "The ad couldn't be shown. Please try again." });
    } finally {
        setIsAdLoading(false);
    }
  }, [isNative, onReward, toast]);

  const handleClear = () => {
    // This is handled by the canvas, but we could add more logic here if needed
  };

  const handleComplete = () => {
    // When a coloring page is done, we can just clear it to show the prompt again
    setImageUrl(null); 
    setPrompt('');
    toast({
        title: "Great job!",
        description: "Ready to create another one?"
    })
  };

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row items-start justify-center gap-6">
       <aside className="w-full lg:w-80 lg:flex-shrink-0 flex flex-col gap-6 bg-card p-6 rounded-xl shadow-lg border">
         <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2"><Wand2 /> Create a Page</h2>
            <p className="text-sm text-muted-foreground">Type a word like "Cat" or "Car" and our AI will draw it for you to color!</p>
         </div>
         <div className="space-y-4">
            <Input 
                type="text"
                placeholder="e.g., Apple, Sun, Star..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="text-lg h-12"
                disabled={isLoading}
            />
            <Button onClick={handleGenerateClick} className="w-full" size="lg" disabled={isLoading || isAdLoading}>
                {isAdLoading ? <Loader2 className="animate-spin" /> : <Gift className="mr-2" />}
                Get New Page (Ad)
            </Button>
         </div>

         <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2"><Palette/>Coloring Tools</h3>
            <div>
            <Label className="flex items-center gap-2 mb-2 font-semibold">
               Pencil Color
            </Label>
            <div className="flex gap-2">
              {["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#000000"].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => setStrokeColor(color)}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      strokeColor === color
                        ? "border-primary ring-2 ring-offset-2 ring-primary scale-110"
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
              onValueChange={(v) => setStrokeWidth(v[0])}
            />
          </div>
         </div>
      </aside>
      
      <main className="flex-1 w-full max-w-2xl">
        <ColoringCanvas 
            imageUrl={imageUrl}
            isLoading={isLoading}
            onComplete={handleComplete}
            onClear={handleClear}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
        />
      </main>

      <AlertDialog open={showRewardDialog} onOpenChange={setShowRewardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Get a New Coloring Page!</AlertDialogTitle>
            <AlertDialogDescription>
              Watch a short ad to let our AI create a brand new coloring page of a "{prompt}" for you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Maybe Later</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowRewardDialog(false);
              handleAdWatched();
            }}>
              Watch Ad & Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
