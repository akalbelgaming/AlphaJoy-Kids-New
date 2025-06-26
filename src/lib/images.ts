'use server';

import { generateImage } from '@/ai/flows/generate-image-flow';

/**
 * Fetches a generated image for a given word using an AI flow.
 * @param word The word to generate an image for.
 * @returns An object with success status and either the image data or an error message.
 */
export async function getImageForWord(word: string) {
  try {
    const result = await generateImage({ prompt: word });
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error in getImageForWord for "${word}":`, error);
    return { success: false, error: 'Failed to generate image.' };
  }
}
