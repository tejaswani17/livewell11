
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthNudge = async (context: string, lang: 'en' | 'hi' = 'en') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a friendly health companion for seniors. Based on the following user context, provide a short (2-sentence) encouraging health nudge or tip in ${lang === 'hi' ? 'Hindi' : 'English'}: ${context}`,
      config: {
        systemInstruction: "Always be positive, encouraging, and clear. Avoid complex medical jargon.",
      }
    });
    return response.text || (lang === 'hi' ? "आज सक्रिय रहें और हाइड्रेटेड रहें!" : "Keep moving and stay hydrated today!");
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'hi' ? "अपने दिल को स्वस्थ रखने के लिए थोड़ी देर टहलें।" : "Remember to take short walks to keep your heart healthy.";
  }
};

export const translateText = async (text: string, targetLang: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text into ${targetLang}: ${text}`,
      config: {
        systemInstruction: "Translate naturally for an elderly person to understand easily.",
      }
    });
    return response.text || text;
  } catch (error) {
    return text;
  }
};
