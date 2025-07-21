'use server';

import {
  adaptiveDifficulty,
  type AdaptiveDifficultyInput,
} from '@/ai/flows/adaptive-difficulty';
import { getColoringPage as fetchColoringPage } from '@/lib/coloring';

export async function getAdaptiveDifficulty(input: AdaptiveDifficultyInput) {
  try {
    const result = await adaptiveDifficulty(input);
    return {success: true, data: result};
  } catch (error) {
    console.error('Error in getAdaptiveDifficulty:', error);
    return {success: false, error: 'Failed to get new difficulty from AI.'};
  }
}

export async function getColoringPage(prompt: string) {
  return fetchColoringPage(prompt);
}
