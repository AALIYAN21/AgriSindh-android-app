import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

// Get DB instance
const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("local_data.db");
  }
  return db;
};

// Initialize DB
export const initDB = async (): Promise<void> => {
  const database = await getDB();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id TEXT,
      item TEXT,
      grade TEXT,
      price REAL,
      volume REAL,
      user_id TEXT,
      category_id TEXT,
      synced INTEGER DEFAULT 0
    );
  `);

  console.log("Database initialized");
};

// Insert multiple items
export const insertItemsBulk = async (
  items: any[],
  user_id: string,
): Promise<boolean> => {
  const database = await getDB();

  const query = `
    INSERT INTO items 
    (item_id, item, grade, price, volume, user_id, category_id, synced)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0);
  `;

  try {
    for (const entry of items) {
      await database.runAsync(query, [
        entry.item_id,
        entry.item ?? null,
        entry.grade,
        entry.price,
        entry.volume,
        user_id,
        entry.category_id,
      ]);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Get unsynced items
export const getUnsyncedItems = async (): Promise<any[]> => {
  const database = await getDB();

  const result = await database.getAllAsync(
    `SELECT * FROM items WHERE synced = 0;`,
  );

  return result;
};

// Mark items as synced
export const markItemsAsSynced = async (ids: number[]): Promise<void> => {
  if (!ids.length) return;

  const database = await getDB();
  const placeholders = ids.map(() => "?").join(",");

  await database.runAsync(
    `UPDATE items SET synced = 1 WHERE id IN (${placeholders});`,
    ids,
  );
};

// Delete synced items
export const deleteSyncedItems = async (): Promise<void> => {
  const database = await getDB();

  await database.runAsync(`DELETE FROM items WHERE synced = 1;`);

  console.log("Synced items deleted");
};

export default getDB;
