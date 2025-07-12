
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
Your goal is to recommend a new difficulty level from ['easy', 'medium', 'hard'] based on the user's performance.

Current User Performance:
- Success Rate: {{successRate}} (A value from 0.0 to 1.0)
- Average Completion Time: {{averageCompletionTime}} seconds
- Current Difficulty: {{difficulty}}

Follow these rules to make a recommendation:
1.  **Increase Difficulty:** If the success rate is high (greater than 0.9) AND the completion time is fast, recommend the next level up.
    - 'easy' is fast if time < 10 seconds.
    - 'medium' is fast if time < 15 seconds.
    - 'hard' is fast if time < 20 seconds.
    - If already at 'hard', keep it 'hard'.
2.  **Decrease Difficulty:** If the success rate is low (less than 0.6), recommend the next level down.
    - If already at 'easy', keep it 'easy'.
3.  **Maintain Difficulty:** In all other cases, keep the difficulty the same.

Your 'reason' must be brief, positive, and encouraging for a child.
- If increasing: "You're doing great! Let's try something a little trickier."
- If decreasing: "Let's practice a bit more to get the hang of it!"
- If maintaining: "You're doing a wonderful job! Let's keep practicing."
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
    if (!output) {
      throw new Error('The AI failed to provide a difficulty recommendation.');
    }
    return output;
  }
);

// This is the exported wrapper function.
export async function adaptiveDifficulty(
  input: AdaptiveDifficultyInput
): Promise<AdaptiveDifficultyOutput> {
  return adaptiveDifficultyFlow(input);
}
