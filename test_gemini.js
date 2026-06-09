import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("API Key missing");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
console.log("AI client initialized");

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: "Hello, tell me a 1 word greeting.",
    });
    console.log("Response text:", response.text);
  } catch (err) {
    console.error("API Call error:", err);
  }
}
run();
