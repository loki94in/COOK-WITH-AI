import { getPantry, updatePantryItem } from './database';
import { matchIngredientsWithPantry } from '../hooks/pantryLogic';

/**
 * PANTRY SYNC SERVICE
 * Deducts used ingredients from the SQLite database.
 */

/**
 * Helper to parse quantities including fractions
 */
const parseQuantity = (str) => {
  if (!str) return 0;
  if (str.includes('/')) {
    const [num, den] = str.split('/').map(parseFloat);
    return num / den;
  }
  return parseFloat(str);
};

export const syncPantryAfterCooking = (recipeIngredients = []) => {
  try {
    const pantryStock = getPantry();
    const { matches } = matchIngredientsWithPantry(recipeIngredients, pantryStock);

    console.log(`[PantrySync] Starting sync for ${matches.length} matched ingredients.`);

    matches.forEach(match => {
      const pantryItem = pantryStock.find(item => item.name === match.matchedWith);
      
      if (pantryItem) {
        const recipeAmount = parseQuantity(match.amount);
        const currentPantryAmount = parseQuantity(pantryItem.quantity);

        if (!isNaN(recipeAmount) && !isNaN(currentPantryAmount) && recipeAmount > 0) {

          const newQuantity = Math.max(0, currentPantryAmount - recipeAmount);
          const newStatus = newQuantity <= 0 ? 'Out of Stock' : 'In Stock';

          console.log(`[PantrySync] Deducting ${recipeAmount} from ${pantryItem.name}. New Qty: ${newQuantity}`);

          updatePantryItem({
            ...pantryItem,
            quantity: newQuantity,
            status: newStatus
          });
        } else {
          console.log(`[PantrySync] Skipping deduction for ${pantryItem.name} due to non-numeric quantity.`);
        }
      }
    });

    return true;
  } catch (error) {
    console.error('[PantrySync] Error during sync:', error);
    return false;
  }
};
