import * as SQLite from 'expo-sqlite';

/**
 * DATABASE SERVICE (PRODUCTION-READY)
 * Implements robust error handling and safe JSON parsing.
 */

let db;
try {
  db = SQLite.openDatabaseSync('cooking_assistant.db');
} catch (error) {
  console.error('CRITICAL: Failed to open SQLite database:', error);
}

const safeJsonParse = (str, fallback = []) => {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch (e) {
    console.error('Data Corruption: Failed to parse JSON string:', str);
    return fallback;
  }
};

export const initDatabase = () => {
  try {
    if (!db) throw new Error('DB_NOT_INITIALIZED');
    db.execSync(`
      CREATE TABLE IF NOT EXISTS recipes (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        source_url TEXT,
        ingredients TEXT,
        steps TEXT,
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
  } catch (error) {
    console.error('Database Init Error:', error);
  }
};

export const saveRecipe = (recipe) => {
  try {
    return db.runSync(
      'INSERT OR REPLACE INTO recipes (id, title, source_url, ingredients, steps, servings) VALUES (?, ?, ?, ?, ?, ?)',
      [
        recipe.id,
        recipe.title,
        recipe.source_url,
        JSON.stringify(recipe.ingredients || []),
        JSON.stringify(recipe.steps || []),
        recipe.servings || 0
      ]
    );
  } catch (error) {
    console.error('Database Save Error:', error);
    return null;
  }
};

export const getAllRecipes = () => {
  try {
    return db.getAllSync('SELECT * FROM recipes ORDER BY title ASC') || [];
  } catch (error) {
    console.error('Database Query Error:', error);
    return [];
  }
};

export const getRecipeById = (id) => {
  try {
    const result = db.getFirstSync('SELECT * FROM recipes WHERE id = ?', [id]);
    if (result) {
      return {
        ...result,
        ingredients: safeJsonParse(result.ingredients),
        steps: safeJsonParse(result.steps)
      };
    }
    return null;
  } catch (error) {
    console.error('Database Fetch Error:', error);
    return null;
  }
};

export const deleteRecipe = (id) => {
  try {
    return db.runSync('DELETE FROM recipes WHERE id = ?', [id]);
  } catch (error) {
    console.error('Database Delete Error:', error);
  }
};

export const updatePantryItem = (item) => {
  try {
    return db.runSync(
      'INSERT OR REPLACE INTO pantry (id, name, quantity, unit, status) VALUES (?, ?, ?, ?, ?)',
      [item.id, item.name, item.quantity, item.unit, item.status]
    );
  } catch (error) {
    console.error('Pantry Update Error:', error);
  }
};

export const getPantry = () => {
  try {
    return db.getAllSync('SELECT * FROM pantry ORDER BY name ASC') || [];
  } catch (error) {
    console.error('Pantry Fetch Error:', error);
    return [];
  }
};
