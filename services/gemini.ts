
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, JobListing, CVAnalysis, InterviewFeedback, SearchResult, GroundingSource } from "../types";

// Initialize the API client using the environment variable directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async matchJobs(profile: UserProfile): Promise<SearchResult> {
    const prompt = `Perform an exhaustive, real-time search for current job and internship postings in France/EU for this student profile. 
    Explore every possible platform including:
    - LinkedIn (search for recruiter posts, hiring updates, and "hidden" roles)
    - Welcome to the Jungle France
    - Apec, Indeed France, and Glassdoor
    - Niche industry boards and startup portals (Station F, etc.)

    User Profile:
    - Field: ${profile.field}
    - Skills: ${profile.skills.join(", ")}
    - Visa Type: ${profile.visaType}
    - Language Level: ${profile.languageLevel}
    - Preferences: ${profile.preferences}

    For each result, prioritize those that are "visa friendly" or suitable for ${profile.visaType} holders.
    Identify:
    1. Job Title & Company (Include Platform/Source)
    2. Location (City/Remote status)
    3. Key requirements matched against user skills
    4. Direct application advice (Cultural nuances or visa strategy)

    Format the response as a clear, structured Markdown list with bold headers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No current postings found. Please refine your search keywords.";
    
    // Extract grounding sources from the metadata
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || "Job Posting / Recruiter Link",
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, sources };
  },

  async analyzeCV(cvText: string, jobDescription?: string): Promise<CVAnalysis> {
    const prompt = `Analyze this CV for a student seeking work in France. ${jobDescription ? `Context: Applying for ${jobDescription}` : ''}
    CV Content: ${cvText}
    1. Score formatting based on French "CV professionnel" standards (0-100).
    2. Provide 3-5 specific content improvements.
    3. Give 3 cultural phrasing tips for the French/EU context.
    4. Provide a reformatted Markdown version.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            formattingScore: { type: Type.NUMBER },
            contentSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            culturalTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            reformattedCV: { type: Type.STRING }
          },
          required: ["formattingScore", "contentSuggestions", "culturalTips", "reformattedCV"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      throw new Error("Failed to analyze CV content.");
    }
  },

  async generateCoverLetter(cvText: string, analysis: CVAnalysis, jobDescription: string): Promise<string> {
    const prompt = `Acting as a French professional career coach, generate a tailored "Lettre de Motivation" (Cover Letter).
    CV Data: ${cvText}
    Analysis: ${JSON.stringify(analysis)}
    Target Job: ${jobDescription}
    
    Requirements:
    - Follow the French tripartite structure: Vous (The Company), Moi (The Candidate), Nous (The Partnership).
    - Maintain high professional etiquette.
    - Mention readiness to work under ${analysis.formattingScore}% match conditions.
    - Write in English but with French cultural structure.
    - Return ONLY the letter text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });

    return response.text || "Unable to generate cover letter.";
  },

  async generateInterviewQuestion(profile: UserProfile, history: { speaker: string, text: string }[]): Promise<string> {
    const prompt = `AI Interview Coach session for the ${profile.field} sector in France.
    User Profile: ${JSON.stringify(profile)}
    History: ${JSON.stringify(history)}
    Ask the next behavioral or technical question. Ensure one question specifically addresses their ${profile.visaType} status in a professional context.
    Return ONLY the question.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });

    return response.text || "Please describe your professional experience in France.";
  },

  async getInterviewFeedback(history: { speaker: string, text: string }[]): Promise<InterviewFeedback['feedback']> {
    const prompt = `Review this interview transcript for a French company role: ${JSON.stringify(history)}.
    Analyze for professional tone, cultural fit, and clarity.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            culturalNuance: { type: Type.STRING }
          },
          required: ["strengths", "weaknesses", "culturalNuance"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}");
    } catch (e) {
      return undefined;
    }
  }
};
