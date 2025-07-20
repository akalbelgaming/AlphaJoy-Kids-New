'use server';
/**
 * @fileOverview A Genkit flow for generating short, funny stories and audio for children.
 *
 * - generateStory - A function that handles the story and audio generation process.
 * - GenerateStoryInput - The input type for the generateStory function.
 * - GenerateStoryOutput - The return type for the generateStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

// Input: Just a topic for the story
const GenerateStoryInputSchema = z.object({
  topic: z.string().describe('The topic for the story, e.g., "Apple".'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

// Output: The story text and the audio as a data URI
const GenerateStoryOutputSchema = z.object({
  story: z.string().describe('A short, funny, rhyming story for a child.'),
  audioUrl: z
    .string()
    .describe(
      "The audio of the story as a data URI (e.g., 'data:audio/wav;base64,...')."
    ),
});
export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

// Exported wrapper function for the client to call
export async function generateStory(
  input: GenerateStoryInput
): Promise<GenerateStoryOutput> {
  return generateStoryFlow(input);
}

// 1. Define a prompt to generate the story text
const storyPrompt = ai.definePrompt({
  name: 'storyGeneratorPrompt',
  input: {schema: GenerateStoryInputSchema},
  output: {schema: z.object({ story: z.string() })},
  prompt: `Create a very short, funny, and rhyming poem for a small child (3-5 years old) about a "{{topic}}".
  The poem should be simple, silly, and only 2-4 lines long.
  Make it delightful and easy to remember.
  
  Example for "Cat":
  A fluffy cat, so round and fat,
  Chased a hat and went "splat!"
  
  Example for "Sun":
  Mr. Sun with a face so bright,
  Winks at the moon and says "goodnight!"
  `,
  config: {
    temperature: 0.9, // Higher temperature for more creative/funny stories
  }
});

// Helper function to convert raw audio buffer to WAV format
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

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));

    writer.write(pcmData);
    writer.end();
  });
}

// 2. Define the main flow that combines story generation and TTS
const generateStoryFlow = ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the story text
    const { output: storyOutput } = await storyPrompt(input);
    if (!storyOutput?.story) {
      throw new Error('Failed to generate story text.');
    }
    const storyText = storyOutput.story;

    // Step 2: Convert the story text to high-quality audio
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      prompt: storyText,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Alloy' }, // A friendly, high-quality voice
          },
        },
      },
    });

    if (!media?.url) {
      throw new Error('Failed to generate audio from the story.');
    }
    
    // The audio is returned as a raw PCM buffer in a data URI. We need to convert it to WAV.
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    // Step 3: Return the story and the WAV audio data URI
    return {
      story: storyText,
      audioUrl: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
