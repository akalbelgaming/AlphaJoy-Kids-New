'use server';
/**
 * @fileOverview A Genkit flow for generating audio from text.
 *
 * - generateAudio - A function that handles text-to-speech conversion.
 * - GenerateAudioInput - The input type for the generateAudio function.
 * - GenerateAudioOutput - The return type for the generateAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const GenerateAudioInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
});
export type GenerateAudioInput = z.infer<typeof GenerateAudioInputSchema>;

const GenerateAudioOutputSchema = z.object({
  audioUrl: z
    .string()
    .describe("The generated audio as a data URI in WAV format."),
});
export type GenerateAudioOutput = z.infer<typeof GenerateAudioOutputSchema>;


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

const generateAudioFlow = ai.defineFlow(
  {
    name: 'generateAudioFlow',
    inputSchema: GenerateAudioInputSchema,
    outputSchema: GenerateAudioOutputSchema,
  },
  async (input) => {
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
      prompt: input.text,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate audio from text.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    if (!wavBase64) {
        throw new Error('Failed to convert audio to WAV format.');
    }

    return { 
        audioUrl: 'data:audio/wav;base64,' + wavBase64
    };
  }
);

export async function generateAudio(input: GenerateAudioInput): Promise<GenerateAudioOutput> {
  return generateAudioFlow(input);
}
