/**
 * ADVANCED YOUTUBE EXTRACTION SERVICE
 * Connects to the local Express backend server.
 */

// Connects to our new local backend running on port 5000
const CLOUD_EXTRACTOR_URL = 'http://localhost:5000/v1/extract';

export const extractRecipeFromUrl = async (url) => {
  try {
    console.log(`Sending URL to Local Backend Extractor: ${url}`);

    const response = await fetch(CLOUD_EXTRACTOR_URL, {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' },
      // Short timeout so UI doesn't hang forever if the backend is down
      signal: AbortSignal.timeout(5000) 
    });

    if (response.ok) {
      const { data } = await response.json();
      console.log('Successfully fetched recipe from local backend.');
      return data;
    } else {
      throw new Error(`Backend API returned status code ${response.status}`);
    }
  } catch (error) {
    console.error('Extraction completely failed:', error);
    throw new Error('Backend server is offline or unreachable. Please run "npm start" in the backend folder.');
  }
};
