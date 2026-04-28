require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Extraction endpoint
app.post('/v1/extract', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: "Missing YouTube URL" });
  }

  console.log(`[API] Received extraction request for: ${url}`);
  
  try {
    // 1. Fetch transcript
    console.log('[API] Fetching YouTube transcript...');
    const transcriptArray = await YoutubeTranscript.fetchTranscript(url);
    const fullText = transcriptArray.map(t => t.text).join(' ');
    console.log(`[API] Transcript fetched successfully. Length: ${fullText.length} chars`);

    // 2. Prompt Gemini
    console.log('[API] Asking Gemini to extract recipe data...');
    const prompt = `
You are an expert culinary assistant. Extract the recipe from the following video transcript.
Return ONLY a strictly valid JSON object matching this schema. Do not wrap it in markdown code blocks.
{
  "id": "generate a random string id",
  "title": "Recipe Title",
  "source_url": "${url}",
  "prep_time": number in minutes,
  "servings": number,
  "confidence_score": decimal between 0 and 1,
  "ingredients": [
    { "name": "string", "amount": "string", "unit": "string" }
  ],
  "steps": [
    { "instruction": "string", "timer": number in seconds if mentioned, else 0 }
  ]
}

Transcript:
${fullText}
`;

    const response = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(prompt);
    const result = await response.response;
    let jsonString = result.text();
    // Clean up markdown wrapping if Gemini added it
    jsonString = jsonString.replace(/^```json/gi, '').replace(/^```/gi, '').replace(/```$/g, '').trim();

    const recipeData = JSON.parse(jsonString);

    res.json({
      success: true,
      data: recipeData
    });
    console.log('[API] Recipe extracted and sent to client.');

  } catch (error) {
    console.error('[API] Error during extraction:', error.message);
    res.status(500).json({ error: "Failed to extract recipe. The video might not have a transcript or the AI failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Smart Cooking Assistant API is running on http://localhost:${PORT}`);
});
