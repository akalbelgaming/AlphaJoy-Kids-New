// src/ai/flows/adaptive-difficulty.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for adaptive difficulty adjustment in a tracing game.
 *
 * The flow takes user performance data as input and returns a recommended difficulty level.
 * The difficulty levels are 'easy', 'medium', and 'hard'.
 *
 * @module adaptiveDifficulty
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the adaptive difficulty flow.
const AdaptiveDifficultyInputSchema = z.object({
  successRate: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'The user success rate on previous tracing exercises, from 0 to 1.'
    ),
  averageCompletionTime: z
    .number()
    .min(0)
    .describe('The average time taken by the user to complete tracing exercises, in seconds.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The current difficulty level'),
});

export type AdaptiveDifficultyInput = z.infer<typeof AdaptiveDifficultyInputSchema>;

// Define the output schema for the adaptive difficulty flow.
const AdaptiveDifficultyOutputSchema = z.object({
  recommendedDifficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The recommended difficulty level for the next tracing exercise.'),
  reason: z.string().describe('Reasoning for the recommended difficulty.'),
});

export type AdaptiveDifficultyOutput = z.infer<typeof AdaptiveDifficultyOutputSchema>;

// Define the prompt for the adaptive difficulty flow.
const adaptiveDifficultyPrompt = ai.definePrompt({
  name: 'adaptiveDifficultyPrompt',
  input: {schema: AdaptiveDifficultyInputSchema},
  output: {schema: AdaptiveDifficultyOutputSchema},
  prompt: `You are an AI that adaptively adjusts the difficulty of a tracing game for a child.

  Based on the user's success rate ({{successRate}}), completion time ({{averageCompletionTime}} seconds), and the current difficulty level ({{difficulty}}), recommend a new difficulty level from ['easy', 'medium', 'hard'].

  - If success rate is high (>0.9) and completion time is fast (<10 seconds for easy, <15 for medium, <20 for hard), recommend increasing the difficulty.
  - If success rate is low (<0.6), recommend decreasing the difficulty.
  - Otherwise, recommend keeping the difficulty the same.

  Your reason should be brief, positive, and encouraging. For example: "You're doing great! Let's try something a little trickier." or "Let's practice a bit more to get the hang of it!".
`,
});

// Define the adaptive difficulty flow.
const adaptiveDifficultyFlow = ai.defineFlow(
  {
    name: 'adaptiveDifficultyFlow',
    inputSchema: AdaptiveDifficultyInputSchema,
    outputSchema: AdaptiveDifficultyOutputSchema,
  },
  async input => {
    const {output} = await adaptiveDifficultyPrompt(input);
    return output!;
  }
);

// This is the exported wrapper function.
export async function adaptiveDifficulty(
  input: AdaptiveDifficultyInput
): Promise<AdaptiveDifficultyOutput> {
  return adaptiveDifficultyFlow(input);
}
