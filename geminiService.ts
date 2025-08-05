
import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const movieSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The full title of the movie." },
    year: { type: Type.INTEGER, description: "The year the movie was released." },
    genre: { type: Type.STRING, description: "The primary genre of the movie (e.g., 'Sci-Fi', 'Comedy', 'Thriller')." },
    description: { type: Type.STRING, description: "A brief, one or two sentence summary of the movie's plot." },
    language: { type: Type.STRING, description: "The primary language of the movie (e.g., 'English', 'Japanese', 'French')." },
    nation: { type: Type.STRING, description: "The country of origin for the movie (e.g., 'USA', 'Japan', 'France')." },
  },
  required: ["title", "year", "genre", "description", "language", "nation"],
};

export const getMovieRecommendations = async (prompt: string): Promise<Movie[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following request, provide a list of 3-5 movie recommendations: "${prompt}"`,
      config: {
        systemInstruction: "You are a movie recommendation expert with a vast knowledge of international cinema. Your goal is to provide a list of relevant movies based on the user's request, including information about the movie's language and nation of origin. Always return the data in the specified JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: movieSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        return [];
    }

    const parsedMovies = JSON.parse(jsonText) as Movie[];
    return parsedMovies;

  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get recommendations from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching recommendations.");
  }
};