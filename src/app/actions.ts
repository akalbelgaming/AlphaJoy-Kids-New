'use server';

import {
  adaptiveDifficulty,
  type AdaptiveDifficultyInput,
} from '@/ai/flows/adaptive-difficulty';
import {generateColoringPage} from '@/ai/flows/generate-coloring-page-flow';
import { getStory as getStoryFromFlow } from '@/lib/story';

export async function getAdaptiveDifficulty(input: AdaptiveDifficultyInput) {
  try {
    const result = await adaptiveDifficulty(input);
    return {success: true, data: result};
  } catch (error) {
    console.error('Error in getAdaptiveDifficulty:', error);
    return {success: false, error: 'Failed to get new difficulty from AI.'};
  }
}

export async function getColoringPage(word: string) {
  if (!word) {
    return {success: false, error: 'A word must be provided.'};
  }
  try {
    const result = await generateColoringPage({prompt: word});
    if (!result || !result.imageUrl) {
      return {success: false, error: 'The AI failed to return an image.'};
    }
    return {success: true, data: result};
  } catch (error) {
    console.error(`Error in getColoringPage for "${word}":`, error);
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return {success: false, error: message};
  }
}

export async function getStory(word: string) {
  // Check if the API key is available in the environment
  if (!process.env.GOOGLE_API_KEY) {
    console.warn("GOOGLE_API_KEY is not set. Story generation is disabled.");
    return { success: false, error: "Story feature is not available right now. Please try again later." };
  }
  return getStoryFromFlow(word);
}
