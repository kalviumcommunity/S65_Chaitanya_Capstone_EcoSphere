import { google } from '@ai-sdk/google';

export const DEFAULT_CHAT_MODEL: string = 'gemini-2.5-flash';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    description: 'Fast and efficient model for general chat',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    description: 'Advanced model with enhanced reasoning capabilities',
  },
];

// Model configurations for different use cases
export const chatModel = google('gemini-2.5-flash');
export const reasoningModel = google('gemini-2.5-pro');
export const titleModel = google('gemini-2.5-flash');
export const artifactModel = google('gemini-2.5-flash');
