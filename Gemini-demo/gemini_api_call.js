// For Node.js environments
import 'dotenv/config'
import { GoogleGenAI } from '@google/genai';

//API SECRET
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

//Create a Gemini Client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// main func declaration
export async function gemini_api_call(user_query) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: user_query,
    });
   
    const responseJson = JSON.stringify(response, null, 2);
    return responseJson
}

// main();