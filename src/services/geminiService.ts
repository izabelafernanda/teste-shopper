import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Replace with your real API key
const API_KEY = process.env.GEMINI_API_KEY || '';

const googleAI = new GoogleGenerativeAI(API_KEY);

const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

export const generateImageContent = async (imageBase64: string, fileType: string): Promise<string> => {
  try {
    const promptConfig = [
      {
        inlineData: {
          mimeType: fileType,
          data: imageBase64,
        },
      },
    ];

    const result = await geminiModel.generateContent({
      contents: [{ role: 'user', parts: promptConfig }],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API response error:', error);
    throw new Error('Failed to process image with Gemini API');
  }
};
