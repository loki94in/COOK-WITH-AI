require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const { YoutubeTranscript } = require('youtube-transcript');
const { parseRecipeFromDescription } = require('./parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

/**
 * Extracts Video ID from various YouTube URL formats
 */
function extractVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

/**
 * Fetch YouTube metadata using official Data API v3
 */
async function fetchYouTubeMetadata(url) {
  const videoId = extractVideoId(url);
  if (!videoId) {
    console.error(`[API] Invalid YouTube URL: ${url}`);
    return null;
  }

  try {
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoId
    });

    if (response.data.items && response.data.items.length > 0) {
      const snippet = response.data.items[0].snippet;
      console.log(`[API] Successfully fetched metadata for: ${snippet.title}`);
      return {
        title: snippet.title,
        description: snippet.description
      };
    }
    console.warn(`[API] No video found for ID: ${videoId}`);
    return null;

  } catch (error) {
    console.error(`[API] YouTube API error: ${error.message}`);
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
    // 1. Fetch Metadata using Official API
    console.log('[API] Fetching YouTube metadata via API...');
    let metadata = await fetchYouTubeMetadata(url);
    
    if (!metadata) {
      // Fallback: Metadata fetch failed, initialize empty
      metadata = { title: "YouTube Recipe", description: "" };
    }

    // 2. Fetch Transcript as fallback/enhancement if description is thin
    if (!metadata.description || metadata.description.length < 100) {
      console.log('[API] Description too short, fetching transcript for better parsing...');
      try {
        const transcriptArray = await YoutubeTranscript.fetchTranscript(url);
        const fullText = transcriptArray.map(t => t.text).join('\n');
        metadata.description = (metadata.description || "") + "\n\n--- TRANSCRIPT ---\n" + fullText;
      } catch (e) {
        console.warn('[API] Transcript fetch failed:', e.message);
      }
    }

    // 3. Parse Recipe using Smart Text Parser
    console.log('[API] Parsing recipe from gathered data...');
    const recipeData = parseRecipeFromDescription(metadata.title, metadata.description, url);

    res.json({
      success: true,
      data: recipeData
    });
    console.log(`[API] Recipe extracted (Score: ${recipeData.confidence_score})`);

  } catch (error) {
    console.error('[API] Error during extraction:', error.message);
    res.status(500).json({ error: "Failed to extract recipe. Please ensure the URL is valid." });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: "🍳 Cooking Assistant Backend (Official API) is ONLINE", 
    status: "ready" 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Smart Cooking Assistant API (Official) is online!`);
  console.log(`🏠 Port: ${PORT}`);
});

