import apiClient from "@/api/apiClient";
import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";
import {
  deleteSyncedItems,
  getUnsyncedItems,
} from "./Database";

// ===============================
// INTERNET CHECK
// ===============================
export const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();

  return Boolean(
    state.isConnected &&
    state.isInternetReachable !== false
  );
};

// ===============================
// SYNC LOCK
// ===============================
let isSyncing = false;

// ===============================
// MAIN SYNC FUNCTION (FILE READY)
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

    // ===============================
    // CHECK INTERNET
    // ===============================
    const online = await isOnline();
    if (!online) {
      return { success: false, message: "No internet connection" };
    }

    // ===============================
    // GET UNSYNCED ITEMS
    // ===============================
    const unsyncedItems = await getUnsyncedItems();

    if (!unsyncedItems.length) {
      return { success: true, message: "Nothing to sync" };
    }

    const syncedIds: number[] = [];

    // ===============================
    // SYNC LOOP
    // ===============================
    for (const item of unsyncedItems) {
      try {
        const formData = new FormData();

        // ===============================
        // SAFE FIELD MAPPING
        // ===============================
        formData.append("commodity_id", String(item.item_id ?? ""));
        formData.append("grade", String(item.grade ?? ""));
        formData.append("price", String(item.price ?? 0));
        formData.append("unit", "kg");
        formData.append("total", String(item.volume ?? 0));

        // ===============================
        // IMAGE HANDLING (IMPORTANT FIX)
        // ===============================
        let images: string[] = [];

        try {
          images = item.images ? JSON.parse(item.images) : [];

          // FIX DOUBLE STRINGIFIED JSON
          if (typeof images === "string") {
            images = JSON.parse(images);
          }
        } catch (e) {
          images = [];
        }

        if (Array.isArray(images)) {
          images.forEach((imageUri: string, index: number) => {
            if (!imageUri) return;

            let filename =
              imageUri.split("/").pop() || `photo_${index}.jpg`;

            filename = filename.replace(".HEIC", ".jpg");
            filename = filename.replace(".heic", ".jpg");
            filename = filename.replace(".HEIF", ".jpg");
            filename = filename.replace(".heif", ".jpg");

            const match = /\.(\w+)$/.exec(filename);

            let extension = match?.[1]?.toLowerCase() || "jpg";

            if (extension === "heic" || extension === "heif") {
              extension = "jpeg";
            }

            const type = `image/${extension}`;

            formData.append("image", {
              uri:
                Platform.OS === "ios"
                  ? imageUri.replace("file://", "")
                  : imageUri,
              name: filename,
              type,
            } as any);
          });
        }
        // ===============================
        // API CALL
        // ===============================
        const response = await apiClient.post(
          "/api/price-list/store",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 15000,
          }
        );

        // ===============================
        // SUCCESS CHECK
        // ===============================
        if (
          response?.status === 200 ||
          response?.status === 201 ||
          response?.data?.success === true
        ) {
          syncedIds.push(item.id);
        } else {
          console.log("Server rejected item:", response?.data);
        }
      } catch (err: any) {
        console.log(
          "ITEM SYNC FAILED:",
          err?.response?.data || err
        );
      }
    }

    // ===============================
    // DELETE SYNCED ITEMS LOCALLY
    // ===============================
    if (syncedIds.length > 0) {
      await deleteSyncedItems(syncedIds);

      console.log("DELETED LOCALLY:", syncedIds);

      return {
        success: true,
        message: `${syncedIds.length} items synced successfully`,
      };
    }

    return {
      success: false,
      message: "No items were synced",
    };
  } catch (error: any) {
    console.log("SYNC ERROR:", error?.response?.data || error);

    if (
      error?.code === "ECONNABORTED" ||
      error?.message?.includes("timeout")
    ) {
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
// AUTO SYNC (NO EMPTY CALLS)
// ===============================
export const startAutoSync = (): (() => void) => {
  let lastSyncTime = 0;
  const COOLDOWN = 10000;

  const unsubscribe = NetInfo.addEventListener(async (state) => {
    const now = Date.now();

    const online = Boolean(
      state.isConnected &&
      state.isInternetReachable !== false
    );

    if (!online) return;

    // ===============================
    // IMPORTANT: PRE-CHECK DB
    // ===============================
    const items = await getUnsyncedItems();

    if (!items.length) {
      console.log("AutoSync skipped — no pending data");
      return;
    }

    if (now - lastSyncTime < COOLDOWN) return;

    lastSyncTime = now;

    console.log("AutoSync triggered...");
    await syncData();
  });

  return unsubscribe;
};