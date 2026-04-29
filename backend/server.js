require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');
const { parseRecipeFromDescription } = require('./parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to fetch YouTube metadata without an API key
async function fetchYouTubeMetadata(url) {
  const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
  
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': USER_AGENT }
    });
    const html = response.data;
    
    // Extract ytInitialPlayerResponse
    const startToken = 'var ytInitialPlayerResponse = ';
    const startIndex = html.indexOf(startToken);
    if (startIndex !== -1) {
      const jsonStart = startIndex + startToken.length;
      let depth = 0;
      for (let i = jsonStart; i < html.length; i++) {
        if (html[i] === '{') depth++;
        else if (html[i] === '}') {
          depth--;
          if (depth === 0) {
            const playerResponse = JSON.parse(html.slice(jsonStart, i + 1));
            return {
              title: playerResponse.videoDetails.title,
              description: playerResponse.videoDetails.shortDescription
            };
          }
        }
      }
    }
    
    // Fallback: simple regex for description
    const descMatch = html.match(/"shortDescription":"(.+?)"/);
    const titleMatch = html.match(/"title":"(.+?)"/);
    if (descMatch) {
        return {
            title: titleMatch ? JSON.parse(`"${titleMatch[1]}"`) : "YouTube Recipe",
            description: JSON.parse(`"${descMatch[1]}"`)
        };
    }

    return null;
  } catch (error) {
    console.error(`[API] Metadata fetch error: ${error.message}`);
    return null;
  }
}


// Extraction endpoint
app.post('/v1/extract', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: "Missing YouTube URL" });
  }

  console.log(`[API] Received extraction request for: ${url}`);
  
  try {
    // 1. Fetch Metadata (Title & Description)
    console.log('[API] Fetching YouTube metadata...');
    let metadata = await fetchYouTubeMetadata(url);
    
    if (!metadata) metadata = { title: "", description: "" };

    if (!metadata.description) {
      // Fallback: try to get transcript and use that as description if metadata fails
      console.log('[API] Metadata fetch failed or empty description. Trying transcript fallback...');
      try {
        const transcriptArray = await YoutubeTranscript.fetchTranscript(url);
        const fullText = transcriptArray.map(t => t.text).join('\n');
        metadata.description = fullText;
        metadata.title = metadata.title || "Transcript-based Recipe";
      } catch (e) {
        console.error('[API] Transcript fallback failed:', e.message);
      }
    }

    // 2. Parse Recipe using Smart Text Parser
    console.log('[API] Parsing recipe from description...');
    const recipeData = parseRecipeFromDescription(metadata.title, metadata.description, url);

    res.json({
      success: true,
      data: recipeData
    });
    console.log(`[API] Recipe extracted using smart parser (Score: ${recipeData.confidence_score})`);

  } catch (error) {
    console.error('[API] Error during extraction:', error.message);
    res.status(500).json({ error: "Failed to extract recipe. Make sure the video description contains the recipe." });
  }
});

// Root route for health check
app.get('/', (req, res) => {
  res.json({ 
    message: "🍳 Cooking Assistant Backend (Smart Parser) is ONLINE", 
    ip: "192.168.31.156",
    status: "ready" 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Smart Cooking Assistant API is online!`);
  console.log(`🏠 Internal: http://localhost:${PORT}`);
  console.log(`📱 External: http://192.168.31.156:${PORT}`);
});
