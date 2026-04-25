import * as SQLite from 'expo-sqlite';

// Open (or create) the local database
const db = SQLite.openDatabaseSync('cooking_assistant.db');

/**
 * INITIALIZE DATABASE
 * Creates the necessary tables if they don't exist
 */
export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      source_url TEXT,
      ingredients TEXT, -- Stored as JSON string
      steps TEXT,       -- Stored as JSON string
      servings INTEGER,
      is_favorite INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pantry (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      quantity REAL,
      unit TEXT,
      status TEXT DEFAULT 'In Stock'
    );
  `);
  console.log('Database initialized successfully');
};

/**
 * RECIPE FUNCTIONS
 */

// Save a new recipe
export const saveRecipe = (recipe) => {
  return db.runSync(
    'INSERT OR REPLACE INTO recipes (id, title, source_url, ingredients, steps, servings) VALUES (?, ?, ?, ?, ?, ?)',
    [
      recipe.id,
      recipe.title,
      recipe.source_url,
      JSON.stringify(recipe.ingredients),
      JSON.stringify(recipe.steps),
      recipe.servings
    ]
  );
};

// Fetch all recipes
export const getAllRecipes = () => {
  return db.getAllSync('SELECT * FROM recipes ORDER BY title ASC');
};

// Get a single recipe by ID
export const getRecipeById = (id) => {
  const result = db.getFirstSync('SELECT * FROM recipes WHERE id = ?', [id]);
  if (result) {
    return {
      ...result,
      ingredients: JSON.parse(result.ingredients),
      steps: JSON.parse(result.steps)
    };
  }
  return null;
};

// Delete a recipe
export const deleteRecipe = (id) => {
  return db.runSync('DELETE FROM recipes WHERE id = ?', [id]);
};

/**
 * PANTRY FUNCTIONS
 */

// Update pantry item
export const updatePantryItem = (item) => {
  return db.runSync(
    'INSERT OR REPLACE INTO pantry (id, name, quantity, unit, status) VALUES (?, ?, ?, ?, ?)',
    [item.id, item.name, item.quantity, item.unit, item.status]
  );
};

// Get all pantry items
export const getPantry = () => {
  return db.getAllSync('SELECT * FROM pantry ORDER BY name ASC');
};
