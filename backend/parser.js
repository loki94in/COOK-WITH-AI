/**
 * Smart Text Parser for Recipe Descriptions
 */

function parseRecipeFromDescription(title, description, url) {
  const recipe = {
    id: Math.random().toString(36).substring(7),
    title: title || "Extracted Recipe",
    source_url: url,
    prep_time: 0,
    servings: 0,
    confidence_score: 0.5,
    ingredients: [],
    steps: []
  };

  if (!description) return recipe;

  // Normalize description: remove extra whitespace, handle line breaks
  const lines = description.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let inIngredients = false;
  let inSteps = false;

  const ingredientHeaders = [/ingredients/i, /you will need/i, /what you need/i, /shopping list/i];
  const stepHeaders = [/steps/i, /instructions/i, /method/i, /directions/i, /how to make/i, /preparation/i];
  const stopKeywords = [/subscribe/i, /follow me/i, /instagram/i, /facebook/i, /twitter/i, /website/i, /shop/i, /amazon/i, /link/i, /check out/i];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Check if we entered a section
    const isIngredientHeader = ingredientHeaders.some(re => re.test(lowerLine)) && line.length < 30;
    const isStepHeader = stepHeaders.some(re => re.test(lowerLine)) && line.length < 30;

    if (isIngredientHeader) {
      inIngredients = true;
      inSteps = false;
      continue;
    }

    if (isStepHeader) {
      inSteps = true;
      inIngredients = false;
      continue;
    }

    // Stop parsing if we hit social media headers or links after we've found something
    if ((inIngredients || inSteps) && stopKeywords.some(re => re.test(lowerLine)) && line.length < 50) {
        // If we already have some data, this might be the end of the recipe
        if (recipe.ingredients.length > 2 || recipe.steps.length > 2) {
            inIngredients = false;
            inSteps = false;
            continue;
        }
    }

    if (inIngredients) {
      // Clean leading dashes, bullets, etc.
      const cleanLine = line.replace(/^[\-\*\•\s]+/, '').trim();
      const ingredient = parseIngredientLine(cleanLine);
      if (ingredient) recipe.ingredients.push(ingredient);
    } else if (inSteps) {
      // Clean leading numbers, bullets, etc.
      const cleanStep = line.replace(/^[\d\.\)\-\*\•\s]+/, '').trim();
      if (cleanStep.length > 5) {
        // Double check it's not a link or social media
        if (cleanStep.includes('http') || cleanStep.includes('@')) continue;

        recipe.steps.push({
          instruction: cleanStep,
          timer: extractTimer(cleanStep)
        });
      }
    }
  }

  // Fallback: If no headers found, try to find lines that look like ingredients/steps
  if (recipe.ingredients.length === 0 && recipe.steps.length === 0) {
      // Maybe look for lines starting with numbers or bullets
  }

  recipe.confidence_score = (recipe.ingredients.length > 0 && recipe.steps.length > 0) ? 0.9 : 0.4;

  return recipe;
}

function parseIngredientLine(line) {
  // Regex to match: [amount] [unit] [name]
  // Handles: "1/2 cup", "500g", "2", "1.5"
  const amountRegex = /^([\d\/\.\s\-\u00bc-\u00be\u2150-\u215e]+)\s*([a-zA-Z\.]+)?\s+(.+)$/;
  const match = line.match(amountRegex);

  if (match) {
    return {
      amount: match[1].trim(),
      unit: match[2] ? match[2].trim() : "",
      name: match[3].trim()
    };
  }

  // Fallback for lines like "Salt to taste"
  if (line.length > 2) {
    return { amount: "", unit: "", name: line };
  }
  return null;
}

function extractTimer(text) {
  // Improved timer extraction
  // Handles "10 minutes", "5 more minutes", "30 secs", "1 hour"
  const hourMatch = text.match(/(\d+)\s*(hour|hr)/i);
  if (hourMatch) return parseInt(hourMatch[1]) * 3600;

  const minMatch = text.match(/(\d+)\s*(min|minute)/i);
  if (minMatch) return parseInt(minMatch[1]) * 60;
  
  const secMatch = text.match(/(\d+)\s*(sec|second)/i);
  if (secMatch) return parseInt(secMatch[1]);
  
  return 0;
}

module.exports = { parseRecipeFromDescription };
