import { callGoogleAI } from './llm/googleai.llm';
import { callOpenAI } from './llm/openai.llm';
import { aiConfig } from '@/config';
import { LLMMessage } from '@/types';

export const generateAIResponse = async (
  messages: LLMMessage[]
): Promise<string> => {
  try {
    switch (aiConfig.provider) {
      case 'google':
        return await callGoogleAI(messages, aiConfig.google);
      case 'openai':
        return await callOpenAI(messages, aiConfig.openai);
      default:
        throw new Error(`Unsupported AI provider: ${aiConfig.provider}`);
    }
  } catch (error) {
    return "I'm sorry, I'm having trouble processing your request right now. Please try again.";
  }
};
