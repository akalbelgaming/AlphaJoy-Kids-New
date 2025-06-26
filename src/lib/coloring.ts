'use server';

import { generateColoringPage } from '@/ai/flows/generate-coloring-page-flow';

/**
 * Fetches a generated coloring page for a given word using an AI flow.
 * @param word The word to generate a coloring page for.
 * @returns An object with success status and either the image data or an error message.
 */
export async function getColoringPage(word: string) {
  if (!word) {
    return { success: false, error: 'A word must be provided.' };
  }
  try {
    const result = await generateColoringPage({ prompt: word });
    if (!result || !result.imageUrl) {
      return { success: false, error: 'The AI failed to return an image.' };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error in getColoringPage for "${word}":`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: message };
  }
}
