import axios from 'axios';
import { LLMMessage, LLMConfig } from '@/types';

export const callOpenAI = async (
  messages: LLMMessage[],
  config: LLMConfig
): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: config.model,
      messages,
      max_tokens: 500,
    },
    {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return (
    response.data.choices?.[0]?.message?.content ||
    "Sorry, I couldn't process your request."
  );
};
