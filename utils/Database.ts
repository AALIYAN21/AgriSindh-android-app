import * as SQLite from "expo-sqlite";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

// ===============================
// DB INSTANCE (SAFE SINGLETON)
// ===============================
export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync("local_data.db");
  }

  return dbPromise;
};

// ===============================
// INIT DATABASE (SAFE + IDENTITY FIX)
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
      images TEXT,
      user_id TEXT,
      category_id TEXT,
      synced INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_items_sync
    ON items (synced);
  `);

  console.log("Database initialized");

  // 🔥 Safe migration fix
  try {
    await database.execAsync(`
      ALTER TABLE items ADD COLUMN images TEXT;
    `);
  } catch (e) {
    console.log("images column already exists or migration skipped");
  }
};

// ===============================
// INSERT ITEMS (OPTIMIZED BULK SAFE)
// ===============================
export const insertItemsBulk = async (
  items: any[],
  user_id: string
) => {
  try {
    const db = await getDB();

    const query = `
      INSERT INTO items 
      (item_id, item, grade, price, volume, images, user_id, category_id, synced)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0);
    `;

    // Use transaction for speed + safety
    await db.withTransactionAsync(async () => {
      for (const entry of items) {
        if (!entry) continue;

        await db.runAsync(query, [
          String(entry.item_id ?? ""),
          String(entry.item ?? ""),
          String(entry.grade ?? ""),
          Number(entry.price ?? 0),
          entry.volume ?? null,
          JSON.stringify(entry.images ?? []),
          user_id,
          String(entry.category_id ?? ""),
        ]);
      }
    });

    return { success: true };
  } catch (error) {
    console.log("DB insert error:", error);
    return { success: false, error: "Insert failed" };
  }
};

// ===============================
// UPDATE VOLUME
// ===============================
export const updateItemVolume = async (
  id: number,
  volume: number
) => {
  const db = await getDB();

  await db.runAsync(
    `
    UPDATE items 
    SET volume = ?, synced = 0 
    WHERE id = ?;
    `,
    [volume ?? 0, id]
  );
};

// ===============================
// GET ITEMS WITHOUT VOLUME
// ===============================
export const getItemsWithoutVolume = async (): Promise<any[]> => {
  const db = await getDB();

  return await db.getAllAsync(
    `SELECT * FROM items WHERE volume IS NULL OR volume = '' ORDER BY id DESC;`
  );
};

// ===============================
// GET UNSYNCED ITEMS
// ===============================
export const getUnsyncedItems = async (): Promise<any[]> => {
  const db = await getDB();

  const items = await db.getAllAsync(
    `SELECT * FROM items WHERE synced = 0;`
  );

  return items ?? [];
};

// ===============================
// MARK AS SYNCED (SAFE BATCH)
// ===============================
export const markItemsAsSynced = async (ids: number[]) => {
  if (!ids?.length) return;

  const db = await getDB();

  const placeholders = ids.map(() => "?").join(",");

  await db.runAsync(
    `
    UPDATE items 
    SET synced = 1 
    WHERE id IN (${placeholders});
    `,
    ids
  );
};

// ===============================
// DELETE SYNCED ITEMS (SAFE)
// ===============================
export const deleteSyncedItems = async (ids: number[]) => {
  if (!ids?.length) return;

  const db = await getDB();

  const placeholders = ids.map(() => "?").join(",");

  await db.runAsync(
    `
    DELETE FROM items
    WHERE id IN (${placeholders});
    `,
    ids
  );
};

// ===============================
// SYNC STATS
// ===============================
export const getSyncStats = async () => {
  const db = await getDB();

  try {
    const synced = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM items WHERE synced = 1"
    );

    const pending = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM items WHERE synced = 0"
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
// CLEAR ALL DATA
// ===============================
export const clearAllItems = async () => {
  try {
    const db = await getDB();
    await db.runAsync("DELETE FROM items;");
    return true;
  } catch (error) {
    console.error("Clear DB error:", error);
    return false;
  }
};

// RESET DB
export const resetDB = async () => {
  const db = await getDB();

  await db.execAsync(`
    DROP TABLE IF EXISTS items;
  `);

  console.log("DB cleared");
};

export default getDB;