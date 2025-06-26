'use server';
/**
 * @fileOverview A Genkit flow for generating coloring pages.
 *
 * - generateColoringPage - A function that generates a coloring page image.
 * - GenerateColoringPageInput - The input type for the generateColoringPage function.
 * - GenerateColoringPageOutput - The return type for the generateColoringPage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateColoringPageInputSchema = z.object({
  prompt: z.string().describe('The subject for the coloring page.'),
});
export type GenerateColoringPageInput = z.infer<typeof GenerateColoringPageInputSchema>;

const GenerateColoringPageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe('The generated coloring page as a data URI.'),
});
export type GenerateColoringPageOutput = z.infer<typeof GenerateColoringPageOutputSchema>;

export async function generateColoringPage(input: GenerateColoringPageInput): Promise<GenerateColoringPageOutput> {
  return generateColoringPageFlow(input);
}

const generateColoringPageFlow = ai.defineFlow(
  {
    name: 'generateColoringPageFlow',
    inputSchema: GenerateColoringPageInputSchema,
    outputSchema: GenerateColoringPageOutputSchema,
  },
  async (input) => {
    const {media, finishReason} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A simple, single object for a coloring book page: ${input.prompt}. Thick black lines on a plain white background. For a small child.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url || finishReason !== 'STOP') {
      const reason = finishReason ? `Finish reason: ${finishReason}` : 'No media URL returned.';
      console.error('Coloring page generation failed.', { finishReason });
      throw new Error(`Coloring page generation failed. ${reason}`);
    }

    return { imageUrl: media.url };
  }
);
