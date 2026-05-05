import NetInfo from "@react-native-community/netinfo";
import { getUnsyncedItems, markItemsAsSynced } from "./Database";

// 🔁 Replace with your real API endpoint
const API_URL = "https://your-api.com/sync";

// ===============================
// CHECK INTERNET (SAFE VERSION)
// ===============================
export const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();

  return Boolean(
    state.isConnected && state.isInternetReachable !== false, // handles null/undefined case
  );
};

// ===============================
// SYNC LOCK (prevents duplicate calls)
// ===============================
let isSyncing = false;

// ===============================
// CORE SYNC FUNCTION
// ===============================
export const syncData = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    if (isSyncing) {
      return { success: false, message: "Sync already running" };
    }

    isSyncing = true;

    const online = await isOnline();

    if (!online) {
      return { success: false, message: "No internet connection" };
    }

    const unsyncedItems = await getUnsyncedItems();

    if (!unsyncedItems.length) {
      return { success: true, message: "Nothing to sync" };
    }

    // ===============================
    // API CALL (with timeout safety)
    // ===============================
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: unsyncedItems }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { success: false, message: "Server error" };
    }

    const result = await response.json();

    /**
     * Expected:
     * {
     *   success: true,
     *   syncedIds: number[]
     * }
     */

    if (result?.success && Array.isArray(result.syncedIds)) {
      await markItemsAsSynced(result.syncedIds);

      return {
        success: true,
        message: `${result.syncedIds.length} items synced`,
      };
    }

    return {
      success: false,
      message: "Invalid server response",
    };
  } catch (error: any) {
    if (error.name === "AbortError") {
      return { success: false, message: "Sync timeout" };
    }

    return {
      success: false,
      message: error?.message || "Sync failed",
    };
  } finally {
    isSyncing = false;
  }
};

// ===============================
// AUTO SYNC (SAFE VERSION)
// ===============================
export const startAutoSync = (): (() => void) => {
  let lastSyncTime = 0;
  const COOLDOWN = 10000; // 10 seconds cooldown

  const unsubscribe = NetInfo.addEventListener(async (state) => {
    const now = Date.now();

    const online = Boolean(
      state.isConnected && state.isInternetReachable !== false,
    );

    if (online && now - lastSyncTime > COOLDOWN) {
      lastSyncTime = now;

      console.log("🌐 Internet restored → syncing...");
      await syncData();
    }
  });

  return unsubscribe;
};
