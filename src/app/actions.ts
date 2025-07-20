'use server';

import {
  adaptiveDifficulty,
  type AdaptiveDifficultyInput,
} from '@/ai/flows/adaptive-difficulty';
import {generateStory} from '@/ai/flows/generate-story-flow';
import {generateColoringPage} from '@/ai/flows/generate-coloring-page-flow';

export async function getAdaptiveDifficulty(input: AdaptiveDifficultyInput) {
  try {
    const result = await adaptiveDifficulty(input);
    return {success: true, data: result};
  } catch (error) {
    console.error('Error in getAdaptiveDifficulty:', error);
    return {success: false, error: 'Failed to get new difficulty from AI.'};
  }
}

export async function getStory(word: string) {
  if (!word) {
    return {success: false, error: 'A word must be provided.'};
  }
  try {
    const result = await generateStory({topic: word});
    if (!result || !result.story || !result.audioUrl) {
      return {success: false, error: 'The AI failed to return a story.'};
    }
    return {success: true, data: result};
  } catch (error) {
    console.error(`Error in getStory for "${word}":`, error);
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return {success: false, error: message};
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
