'use server';

import { generateColoringPage } from '@/ai/flows/generate-coloring-page-flow';

/**
 * Fetches a generated coloring page for a given word using an AI flow.
 * @param word The word to generate a coloring page for.
 * @returns An object with success status and either the image data or an error message.
 */
export async function getColoringPage(word: string) {
  try {
    const result = await generateColoringPage({ prompt: word });
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error in getColoringPage for "${word}":`, error);
    return { success: false, error: 'Failed to generate coloring page.' };
  }
}
