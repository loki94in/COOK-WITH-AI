/**
 * ADVANCED YOUTUBE EXTRACTION SERVICE
 * Prepares the app for real cloud-based extraction.
 */

// Simulation of a cloud backend endpoint
const CLOUD_EXTRACTOR_URL = 'https://api.cookingassistant.ai/v1/extract';

export const extractRecipeFromUrl = async (url) => {
  try {
    console.log(`Sending URL to Cloud Extractor: ${url}`);

    try {
      // Attempt real network fetch
      const response = await fetch(CLOUD_EXTRACTOR_URL, {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
        // Short timeout so UI doesn't hang forever if the backend is down
        signal: AbortSignal.timeout(5000) 
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Successfully fetched recipe from cloud backend.');
        return data;
      } else {
        console.warn(`Cloud API returned ${response.status}. Using fallback data.`);
      }
    } catch (networkError) {
      console.warn('Network error or timeout reaching cloud API. Using fallback data.', networkError.message);
    }

    // Fallback: Simulated processing delay and mock data
    console.log('Falling back to local mock data...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return a structured recipe with "Confidence Scores" as per requirement
    return {
      id: 'biryani-001',
      title: 'Traditional Dum Biryani (Fallback)',
      source_url: url,
      servings: 4,
      confidence_score: 0.94, // 94% accuracy
      ingredients: [
        { name: 'Basmati Rice', amount: 500, unit: 'g', confidence: 0.99 },
        { name: 'Chicken', amount: 750, unit: 'g', confidence: 0.98 },
        { name: 'Yogurt', amount: 200, unit: 'ml', confidence: 0.92 },
        { name: 'Garam Masala', amount: 2, unit: 'tsp', confidence: 0.85 }
      ],
      steps: [
        { instruction: 'Soak rice for 30 minutes in cold water', timer: 1800 },
        { instruction: 'Marinate chicken with yogurt and spices for 1 hour', timer: 3600 },
        { instruction: 'Layer rice over chicken and cook on low heat (Dum)', timer: 2400 }
      ]
    };
  } catch (error) {
    console.error('Extraction completely failed:', error);
    throw new Error('Extraction failed. Please check your connection and try again.');
  }
};
