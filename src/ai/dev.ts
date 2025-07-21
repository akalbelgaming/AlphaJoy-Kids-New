import { config } from 'dotenv';
config({ path: '.env.local' });

import '@/ai/flows/adaptive-difficulty.ts';
import '@/ai/flows/generate-image-flow.ts';
