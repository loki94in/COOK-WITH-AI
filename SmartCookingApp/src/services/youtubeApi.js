/**
 * YOUTUBE EXTRACTION SERVICE
 * Handles URL validation and mock extraction of recipe data.
 */

// Validation: Check if the string is a valid YouTube URL
export const validateYouTubeUrl = (url) => {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return pattern.test(url);
};

export const extractRecipeFromUrl = async (url) => {
  try {
    // 1. Form Validation
    if (!url) throw new Error('Please enter a YouTube URL');
    if (!validateYouTubeUrl(url)) throw new Error('Invalid YouTube URL format');

    console.log(`Starting extraction for: ${url}`);

    // 2. Simulate API Call (Mock Data)
    // In production, this would call your Cloud Function
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockRecipe = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Authentic Chicken Biryani',
      source_url: url,
      servings: 4,
      ingredients: [
        { name: 'Basmati Rice', amount: 2, unit: 'cups' },
        { name: 'Chicken', amount: 750, unit: 'grams' },
        { name: 'Yogurt', amount: 1, unit: 'cup' },
      ],
      steps: [
        { instruction: 'Wash the rice and soak for 30 minutes', timer: 1800 },
        { instruction: 'Marinate chicken with yogurt and spices', timer: 900 },
        { instruction: 'Cook on low flame until tender', timer: 1200 },
      ],
    };

    return mockRecipe;
  } catch (error) {
    // 3. Error Handling
    console.error('Extraction Error:', error.message);
    throw error; // Re-throw for UI to display
  }
};
