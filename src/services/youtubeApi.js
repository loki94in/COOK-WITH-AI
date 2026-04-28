/**
 * ADVANCED YOUTUBE EXTRACTION SERVICE
 * Connects to the local Express backend server.
 */

// Connects to our new local backend running on port 5000
const CLOUD_EXTRACTOR_URL = 'http://192.168.31.156:5000/v1/extract';

export const extractRecipeFromUrl = async (url) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for AI extraction

  try {
    console.log(`Sending URL to Local Backend Extractor: ${url}`);

    const response = await fetch(CLOUD_EXTRACTOR_URL, {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const { data } = await response.json();
      console.log('Successfully fetched recipe from local backend.');
      return data;
    } else {
      throw new Error(`Backend API returned status code ${response.status}`);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('AI extraction timed out. Gemini might be slow or the video is too long.');
    }
    console.error('Extraction completely failed:', error);
    throw new Error('Backend server is offline or unreachable. Ensure the server is running at http://192.168.31.156:5000');
  }
};
