
'use server';

import { generateStory } from '@/ai/flows/generate-story-flow';

/**
 * Fetches a generated story and audio for a given word using an AI flow.
 * @param word The word to generate a story for.
 * @returns An object with success status and either the story data or an error message.
 */
export async function getStory(word: string) {
  if (!word) {
    return { success: false, error: 'A word must be provided.' };
  }
  // The check for API key will now be in the server action, 
  // this function will only be called if the key exists.
  try {
    const result = await generateStory({ topic: word });
    if (!result || !result.story || !result.audioUrl) {
      return { success: false, error: 'The AI failed to return a story.' };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error in getStory for "${word}":`, error);
    
    let message = 'An unknown error occurred while creating the story.';
    if (error instanceof Error) {
      // Check for specific quota error message from the API
      if (error.message.includes('429') || error.message.toLowerCase().includes('quota')) {
        message = 'The storyteller is resting for today! Please try again tomorrow.';
      } else {
        message = "The storyteller seems to be busy. Please try again in a moment.";
      }
    }
    
    return { success: false, error: message };
  }
}
