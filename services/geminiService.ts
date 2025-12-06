import { GoogleGenAI } from "@google/genai";

// Safely access process.env to prevent crashes in browsers where process is not defined
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    console.warn('API Key access failed or environment not configured.');
    return '';
  }
};

const apiKey = getApiKey();
// Only initialize AI if key exists to avoid immediate errors, though usage will be checked later
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const enhanceText = async (text: string, context: string): Promise<string> => {
  if (!apiKey || !ai) {
    console.error("API Key is missing");
    return text;
  }
  
  if (!text || text.length < 3) return text;

  try {
    const prompt = `
      Act as a professional resume writer. 
      Context: ${context}
      Task: Rewrite, improve, and expand the following text to be more professional, action-oriented, and impactful.
      Keep it concise but detailed. Do not add conversational filler. Just return the improved text.
      
      Original text: "${text}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Error generating content:", error);
    return text; // Fallback to original
  }
};

export const generateSummary = async (jobTitle: string, skills: string, experienceInput: string): Promise<string> => {
  if (!apiKey || !ai) return "API Key missing.";

  try {
    const prompt = `
      Act as a professional career coach.
      Write a compelling professional summary (about 3-4 sentences) for a resume.
      Job Title: ${jobTitle}
      Key Skills: ${skills}
      Experience Highlights: ${experienceInput}
      
      The tone should be professional, confident, and suitable for a CV. Do not use Markdown formatting like bolding.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error generating summary. Please try again.";
  }
};