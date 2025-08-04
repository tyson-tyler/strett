import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Use a secure environment variable here in production
const genAI = new GoogleGenerativeAI("AIzaSyDHQZx4vBXhnYtW_2qSZtWr2faTEFL7mqs");

export async function generateDescription(promptText) {
  const prompt = `Write a short video description (30-45 words) in JSON format for a YouTube video titled: "${promptText}"`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // ✅ Use supported free model
  });

  const result = await model.generateContent({
    contents: [{ parts: [{ text: prompt }] }],
  });

  const response = await result.response;
  const text = await response.text(); // ✅ Use `.text()` to get output
  return text;
}
