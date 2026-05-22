import { useTranslation } from "@/hooks/useLanguage";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import StatusModal from "./StatusModal";


import { getSyncStats } from "@/utils/Database";
import { syncData } from "@/utils/syncService";
import { useFocusEffect } from "expo-router";

const DataSyncStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ synced: 0, pending: 0 });
  const [loading, setLoading] = useState(false);

  const { t, isRTL } = useTranslation();

  // 🔄 Load stats from DB
  const loadStats = async () => {
    try {
      const data = await getSyncStats();

      setStats({
        synced: Number(data?.synced || 0),
        pending: Number(data?.pending || 0),
      });
    } catch (error) {
      console.log("LOAD STATS ERROR:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();

      const interval = setInterval(() => {
        loadStats();
      }, 3000);

      return () => clearInterval(interval);
    }, [])
  );
  // 📊 Dynamic pie data
  const total = stats.synced + stats.pending;

  const hasData = total > 0;

  const pieData = total
    ? [
      {
        value: (stats.synced / total) * 100,
        color: "#154212",
      },
      {
        value: (stats.pending / total) * 100,
        color: "#dcdfe3",
      },
    ]
    : [];
  // 🔄 Manual sync
  const handleSync = async () => {
    setLoading(true);
    setShowModal(true);

    const result = await syncData();

    setShowModal(false);
    setLoading(false);

    await loadStats(); // refresh chart after sync
  };

  return (
    <View style={{ flex: 1 }}>
      {showModal && (
        <StatusModal status="upload" onClose={() => setShowModal(false)} />
      )}

      <View style={styles.container}>
        <Text style={[styles.heading, isRTL && { textAlign: "right" }]}>
          {t("dataSync.titleHeader")}
        </Text>
        <Text style={[styles.subHeading, isRTL && { textAlign: "right" }]}>
          {t("dataSync.subTitle")}
        </Text>

        <View style={styles.card}>
          {!hasData ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="sync-disabled" size={50} color="#aaa" />
              <Text style={styles.emptyText}>No data to sync</Text>
              <Text style={styles.emptySubText}>
                Add commodities first to start syncing
              </Text>
            </View>
          ) : (
            <>
              <PieChart
                data={pieData}
                donut
                showText
                textColor="#154212"
                textSize={28}
                radius={90}
                innerRadius={65}
                centerLabelComponent={() => (
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.percent}>
                      {Math.round((stats.synced / total) * 100) || 0}%
                    </Text>
                    <Text style={styles.synced}>Synced</Text>
                  </View>
                )}
              />

              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: "#154212" }]} />
                  <Text>Synced Data</Text>
                </View>

                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: "#dcdfe3" }]} />
                  <Text>{stats.pending} Pending</Text>
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              isRTL && { flexDirection: "row-reverse", gap: 5 },
            ]}
            onPress={handleSync}
            disabled={loading || !hasData}
          >
            <MaterialIcons name="sync" size={22} color="white" />
            <Text style={styles.buttonText}>
              {loading ? "Syncing..." : t("dataSync.syncButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DataSyncStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#154212",
  },
  subHeading: {
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
  },
  percent: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#154212",
  },
  synced: {
    fontSize: 14,
    color: "#666",
  },
  legendContainer: {
    flexDirection: "row",
    marginTop: 25,
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#154212",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666",
    marginTop: 10,
  },

  emptySubText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    textAlign: "center",
  },
});
