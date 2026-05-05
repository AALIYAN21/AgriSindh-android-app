import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

// ===============================
// DB INSTANCE
// ===============================
export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("local_data.db");
  }
  return db;
};

// ===============================
// INIT DATABASE
// ===============================
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

    CREATE INDEX IF NOT EXISTS idx_items_sync
    ON items (synced, volume);
  `);

  console.log("Database initialized");
};

// ===============================
// INSERT ITEMS (STEP 1)
// ===============================
export const insertItemsBulk = async (
  items: any[],
  user_id: string,
): Promise<{ success: boolean; error?: string }> => {
  const database = await getDB();

  const query = `
    INSERT INTO items 
    (item_id, item, grade, price, volume, user_id, category_id, synced)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0);
  `;

  try {
    // ✅ VALIDATION (NO ALERTS IN DB LAYER)
    for (let i = 0; i < items.length; i++) {
      const entry = items[i];

      if (
        !entry.item_id ||
        !entry.item ||
        !entry.grade ||
        entry.price === undefined ||
        entry.price === null ||
        entry.price === "" ||
        !entry.category_id
      ) {
        return {
          success: false,
          error: `Missing required fields at row ${i + 1}`,
        };
      }
    }

    // ✅ INSERT
    for (const entry of items) {
      await database.runAsync(query, [
        entry.item_id,
        entry.item,
        entry.grade,
        Number(entry.price) || 0,
        entry.volume ?? null,
        user_id,
        entry.category_id,
      ]);
    }

    return { success: true };
  } catch (error) {
    console.error("Insert error:", error);

    return {
      success: false,
      error: "Failed to insert items",
    };
  }
};

// ===============================
// UPDATE VOLUME (STEP 2)
// ===============================
export const updateItemVolume = async (
  id: number,
  volume: number,
): Promise<void> => {
  const database = await getDB();

  await database.runAsync(
    `
    UPDATE items 
    SET volume = ?, synced = 0 
    WHERE id = ?;
    `,
    [volume, id],
  );
};

// ===============================
// GET ITEMS WITHOUT VOLUME
// ===============================
export const getItemsWithoutVolume = async (): Promise<any[]> => {
  const database = await getDB();

  return await database.getAllAsync(
    `SELECT * FROM items WHERE volume IS NULL;`,
  );
};

// ===============================
// GET UNSYNCED ITEMS (READY FOR SYNC)
// ===============================
export const getUnsyncedItems = async (): Promise<any[]> => {
  const database = await getDB();

  return await database.getAllAsync(
    `SELECT * FROM items 
     WHERE synced = 0 AND volume IS NOT NULL;`,
  );
};

// ===============================
// MARK AS SYNCED
// ===============================
export const markItemsAsSynced = async (ids: number[]): Promise<void> => {
  if (!ids.length) return;

  const database = await getDB();
  const placeholders = ids.map(() => "?").join(",");

  await database.runAsync(
    `
    UPDATE items 
    SET synced = 1 
    WHERE id IN (${placeholders});
    `,
    ids,
  );
};

// ===============================
// SYNC STATS (FOR CHART)
// ===============================
export const getSyncStats = async () => {
  const db = await getDB();

  try {
    const synced = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM items WHERE synced = 1",
    );

    const pending = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM items WHERE synced = 0",
    );

    return {
      synced: synced?.count ?? 0,
      pending: pending?.count ?? 0,
    };
  } catch (error) {
    console.error("Sync stats error:", error);
    return { synced: 0, pending: 0 };
  }
};

// ===============================
// CLEAR ALL DATA (DEV ONLY)
// ===============================
export const clearAllItems = async () => {
  const database = await getDB();

  try {
    await database.runAsync("DELETE FROM items;");
    return true;
  } catch (error) {
    console.error("Clear DB error:", error);
    return false;
  }
};

export default getDB;
