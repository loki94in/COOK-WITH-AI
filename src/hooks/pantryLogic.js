/**
 * PANTRY MATCHING LOGIC
 * Compares recipe ingredients to pantry stock using Levenshtein distance
 */

// Simple Levenshtein distance implementation
function getLevenshteinDistance(a, b) {
  const matrix = [];
  let i, j;

  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculates string similarity percentage
 */
function getStringSimilarity(str1, str2) {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  if (s1 === s2) return 100;
  
  const distance = getLevenshteinDistance(s1, s2);
  const longestLength = Math.max(s1.length, s2.length);
  
  if (longestLength === 0) return 100;
  
  return ((longestLength - distance) / longestLength) * 100;
}

/**
 * Matches recipe ingredients against the user's pantry
 * @param {Array} recipeIngredients - Array of ingredients from the extracted recipe
 * @param {Array} pantryStock - Array of items from the SQLite pantry table
 * @returns {Object} { matches, missing, matchPercentage }
 */
export const matchIngredientsWithPantry = (recipeIngredients = [], pantryStock = []) => {
  const matches = [];
  const missing = [];
  const SIMILARITY_THRESHOLD = 75; // Minimum 75% similarity to count as a match
  
  recipeIngredients.forEach(ingredient => {
    let bestMatch = null;
    let highestSimilarity = 0;
    
    pantryStock.forEach(pantryItem => {
      // Basic check to only consider items that are in stock
      if (pantryItem.status !== 'In Stock') return;
      
      const similarity = getStringSimilarity(ingredient.name, pantryItem.name);
      
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        if (similarity >= SIMILARITY_THRESHOLD) {
          bestMatch = pantryItem;
        }
      }
    });
    
    if (bestMatch) {
      matches.push({
        ...ingredient,
        matchedWith: bestMatch.name,
        similarity: Math.round(highestSimilarity)
      });
    } else {
      missing.push(ingredient);
    }
  });
  
  const matchPercentage = recipeIngredients.length > 0 
    ? Math.round((matches.length / recipeIngredients.length) * 100) 
    : 100;
    
  return {
    matches,
    missing,
    matchPercentage
  };
};
