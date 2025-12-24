import axios from 'axios';
import { LLMMessage, LLMConfig } from '@/types';

export const callGoogleAI = async (
  messages: LLMMessage[],
  config: LLMConfig
): Promise<string> => {
  const systemMessage = messages.find((msg) => msg.role === 'system');
  const conversationMessages = messages.filter((msg) => msg.role !== 'system');

  const requestBody: any = {
    contents: conversationMessages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })),
    generationConfig: { maxOutputTokens: 500 },
  };

  if (systemMessage) {
    requestBody.systemInstruction = {
      parts: [{ text: systemMessage.content }],
    };
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`,
      requestBody,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 0,
      }
    );

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process your request."
    );
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      const baseDelay = Math.pow(2, 1) * 1000;
      const jitter = Math.random() * 1000;
      const delay = baseDelay + jitter;

      await new Promise((resolve) => setTimeout(resolve, delay));

      // Retry once
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 0,
        }
      );

      return (
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process your request."
      );
    } else {
      throw error;
    }
  }
};
