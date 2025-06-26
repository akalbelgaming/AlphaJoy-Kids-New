'use server';

import { adaptiveDifficulty, type AdaptiveDifficultyInput } from '@/ai/flows/adaptive-difficulty';
import { generateImage } from '@/ai/flows/generate-image-flow';

export async function getAdaptiveDifficulty(input: AdaptiveDifficultyInput) {
  try {
    const result = await adaptiveDifficulty(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getAdaptiveDifficulty:', error);
    return { success: false, error: 'Failed to get new difficulty from AI.' };
  }
}

export async function getImageForWord(word: string) {
  try {
    const result = await generateImage({ prompt: word });
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error in getImageForWord for "${word}":`, error);
    return { success: false, error: 'Failed to generate image.' };
  }
}
