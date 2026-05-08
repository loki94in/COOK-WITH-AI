/**
 * Smart Text Parser for Recipe Descriptions (Improved)
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

  // Pre-process description: fix common issues
  const cleanDesc = description
    .replace(/&nbsp;/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ');

  const lines = cleanDesc.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let inIngredients = false;
  let inSteps = false;

  const ingredientHeaders = [/ingredients/i, /you will need/i, /what you need/i, /shopping list/i, /pantry/i];
  const stepHeaders = [/steps/i, /instructions/i, /method/i, /directions/i, /how to make/i, /preparation/i, /cooking/i];
  const stopKeywords = [/subscribe/i, /follow me/i, /instagram/i, /facebook/i, /twitter/i, /website/i, /shop/i, /amazon/i, /link/i, /check out/i, /merch/i, /patreon/i];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Check for servings/prep time
    if (!recipe.servings) {
        const servingsMatch = lowerLine.match(/servings?:\s*(\d+)/i) || lowerLine.match(/makes\s*(\d+)/i);
        if (servingsMatch) recipe.servings = parseInt(servingsMatch[1]);
    }
    if (!recipe.prep_time) {
        const prepMatch = lowerLine.match(/prep(?:aration)?\s*time:\s*(\d+)\s*(min|hr|hour)/i);
        if (prepMatch) {
            recipe.prep_time = prepMatch[2].includes('min') ? parseInt(prepMatch[1]) : parseInt(prepMatch[1]) * 60;
        }
    }

    // Check if we entered a section
    const isIngredientHeader = ingredientHeaders.some(re => re.test(lowerLine)) && line.length < 40;
    const isStepHeader = stepHeaders.some(re => re.test(lowerLine)) && line.length < 40;

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
        if (recipe.ingredients.length > 2 || recipe.steps.length > 2) {
            inIngredients = false;
            inSteps = false;
            continue;
        }
    }

    if (inIngredients) {
      const cleanLine = line.replace(/^[\-\*\•\s\d\.]+/, '').trim();
      if (cleanLine.length > 1) {
        const ingredient = parseIngredientLine(cleanLine);
        if (ingredient) recipe.ingredients.push(ingredient);
      }
    } else if (inSteps) {
      // If a line is very long, it might be multiple steps clumped together
      if (line.length > 150 && !line.includes('http')) {
          const subSteps = line.split(/[.!?]\s+/).filter(s => s.trim().length > 10);
          subSteps.forEach(ss => {
              recipe.steps.push({
                instruction: ss.trim(),
                timer: extractTimer(ss),
                timestamp: extractVideoTimestamp(ss)
              });
          });

      } else {
        const cleanStep = line.replace(/^[\d\.\)\-\*\•\s]+/, '').trim();
        if (cleanStep.length > 5 && !cleanStep.includes('http')) {
          recipe.steps.push({
            instruction: cleanStep,
            timer: extractTimer(cleanStep),
            timestamp: extractVideoTimestamp(line) // Use original line for timestamp detection
          });
        }

      }
    }
  }

  // Heuristic Fallback: If no headers found, try to find sequences that look like recipes
  if (recipe.ingredients.length < 2 && recipe.steps.length < 2) {
      console.log('[Parser] No headers found, attempting heuristic extraction...');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lowerLine = line.toLowerCase();
        
        // Skip obvious junk
        if (stopKeywords.some(re => re.test(lowerLine))) continue;

        // Does it look like an ingredient? (Starts with a number or common fraction)
        const ingredient = parseIngredientLine(line.replace(/^[\-\*\•\s]+/, '').trim());
        if (ingredient && (ingredient.amount || ingredient.unit)) {
            recipe.ingredients.push(ingredient);
        } else if (line.length > 20 && line.length < 200 && !line.includes('http')) {
            // Does it look like a step? (Starts with a verb or number)
            const cleanStep = line.replace(/^[\d\.\)\-\*\•\s]+/, '').trim();
            if (cleanStep.length > 10) {
                recipe.steps.push({
                    instruction: cleanStep,
                    timer: extractTimer(cleanStep)
                });
            }
        }
      }
  }

  recipe.confidence_score = (recipe.ingredients.length > 0 && recipe.steps.length > 0) ? 0.95 : 
                           (recipe.ingredients.length > 0 || recipe.steps.length > 0) ? 0.6 : 0.4;


  return recipe;
}

function parseIngredientLine(line) {
  // Regex to match: [amount] [unit] [name]
  // Handles: "1/2 cup", "500g", "2", "1.5", "¼ cup"
  const amountRegex = /^([\d\/\.\s\-\u00bc-\u00be\u2150-\u215e]+)\s*([a-zA-Z\.]+)?\s+(.+)$/;
  const match = line.match(amountRegex);

  if (match) {
    return {
      amount: match[1].trim(),
      unit: match[2] ? match[2].trim() : "",
      name: match[3].trim()
    };
  }

  // Fallback for "Salt to taste" or "A pinch of sugar"
  if (line.length > 2) {
    return { amount: "", unit: "", name: line };
  }
  return null;
}

function extractTimer(text) {
  // Improved timer extraction
  // Handles "10-15 minutes", "5 more minutes", "30 secs", "1 hour"
  
  // Try range first: "10 to 15 mins" or "10-15 mins"
  const rangeMatch = text.match(/(\d+)\s*(?:-|to)\s*(\d+)\s*(min|minute)/i);
  if (rangeMatch) return parseInt(rangeMatch[2]) * 60; // Use upper bound

  const hourMatch = text.match(/(\d+)\s*(hour|hr)/i);
  if (hourMatch) return parseInt(hourMatch[1]) * 3600;

  const minMatch = text.match(/(\d+)\s*(min|minute)/i);
  if (minMatch) return parseInt(minMatch[1]) * 60;
  
  const secMatch = text.match(/(\d+)\s*(sec|second)/i);
  if (secMatch) return parseInt(secMatch[1]);
  
  return 0;
}

function extractVideoTimestamp(text) {
  // Matches patterns like [2:45], (03:20), 1:30 at start/end
  const tsMatch = text.match(/(?:\[|\()?(\d{1,2}):(\d{2})(?:\]|\))?/);
  if (tsMatch) {
    const mins = parseInt(tsMatch[1]);
    const secs = parseInt(tsMatch[2]);
    return (mins * 60) + secs;
  }
  return null;
}

module.exports = { parseRecipeFromDescription };


