'use server';
/**
 * @fileOverview A Genkit flow for generating a short story with audio.
 *
 * - generateStory - A function that handles the story and audio generation.
 * - GenerateStoryInput - The input type for the generateStory function.
 * - GenerateStoryOutput - The return type for the generateStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const GenerateStoryInputSchema = z.object({
  topic: z.string().describe('The topic for the story, e.g., an object or character.'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

const GenerateStoryOutputSchema = z.object({
  story: z.string().describe('The generated short story.'),
  audioUrl: z
    .string()
    .describe("The generated audio of the story as a data URI in WAV format."),
});
export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateStoryFlow = ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async (input) => {
    // 1. Generate the story text
    const { text } = await ai.generate({
      model: googleAI.model('gemini-1.5-flash'),
      prompt: `You are a master storyteller for young children (ages 3-5). 
    Write a very short, simple, and happy story about a "${input.topic}".
    The story should be only 2-3 sentences long.
    Use simple words and a positive tone. Do not add any formatting.`,
    });
    
    if (!text) {
      throw new Error('Failed to generate story text.');
    }
    
    const storyText = text;
    
    // 2. Generate the audio for the story
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: storyText,
    });

    if (!media) {
      throw new Error('Failed to generate audio from text.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return { 
        story: storyText,
        audioUrl: 'data:audio/wav;base64,' + wavBase64
    };
  }
);

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  return generateStoryFlow(input);
}
