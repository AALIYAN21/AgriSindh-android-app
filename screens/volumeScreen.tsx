import StatusModal from "@/components/StatusModal";
import { useTranslation } from "@/hooks/useLanguage";
import { getItemsWithoutVolume, updateItemVolume } from "@/utils/Database";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface VolumeRow {
  id: number;
  item: string;
  grade: string;
  volume: string;
}

const VolumeScreen = () => {
  const { t, isRTL } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [volumeData, setVolumeData] = useState<VolumeRow[]>([]);
  const [loading, setLoading] = useState(true);

  // 📦 Load from DB
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const data = await getItemsWithoutVolume();

        const formatted: VolumeRow[] = (data || []).map((item: any) => ({
          id: item.id,
          item: item.item || "",
          grade: item.grade || "",
          volume: item.volume ? String(item.volume) : "",
        }));

        setVolumeData(formatted);
      } catch (error) {
        console.log("Failed to load volume items:", error);
        setVolumeData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateVolume = (id: number, value: any) => {
    const updated = volumeData.map((row) =>
      row.id === id ? { ...row, volume: value } : row,
    );
    setVolumeData(updated);
  };

  const handleSave = async () => {
    try {
      for (const row of volumeData) {
        await updateItemVolume(row.id, row.volume);
      }

      setModalVisible(true);
    } catch (error) {
      console.log("SAVE VOLUME ERROR:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    router.replace("/");
  };

  const showEmpty = !loading && volumeData.length === 0;

  return (
    <View style={styles.safeArea}>
      {isModalVisible && (
        <StatusModal onClose={handleCloseModal} status="upload" />
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View
          style={[
            styles.tagContainer,
            { alignSelf: isRTL ? "flex-end" : "flex-start" },
          ]}
        >
          <Text style={styles.tagText}>VOLUME ENTRY</Text>
        </View>

        <Text
          style={[styles.mainTitle, { textAlign: isRTL ? "right" : "left" }]}
        >
          {t("volume.title") || "Enter Commodity Volume"}
        </Text>

        <Text
          style={[styles.subtitle, { textAlign: isRTL ? "right" : "left" }]}
        >
          {t("volume.subtitle") ||
            "Provide volume (in kilograms) for each item"}
        </Text>

        {/* EMPTY STATE */}
        {showEmpty ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No volume to enter</Text>
          </View>
        ) : (
          <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 2.5 }]}>
                {t("volume.tableHeadItem")}
              </Text>
              <Text style={[styles.headerCell, { flex: 1.5 }]}>
                {t("volume.tableHeadGrade")}
              </Text>
              <Text style={[styles.headerCell, { flex: 2 }]}>
                {t("volume.tableHeadVolume")}
              </Text>
            </View>

            {volumeData.map((row) => (
              <View key={row.id} style={styles.tableRow}>
                <View style={{ flex: 2.5 }}>
                  <Text style={styles.itemText}>{row.item}</Text>
                </View>

                <View style={{ flex: 1.5 }}>
                  <Text style={styles.gradeText}>{row.grade}</Text>
                </View>

                <View style={[styles.volumeCell, { flex: 2 }]}>
                  <TextInput
                    style={styles.inputCell}
                    keyboardType="numeric"
                    value={row.volume}
                    onChangeText={(val) => updateVolume(row.id, val)}
                    placeholder="0"
                    placeholderTextColor="#CCC"
                  />
                  <Text style={styles.unitText}>kg</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* SAVE BUTTON */}
        {!showEmpty && (
          <TouchableOpacity
            style={[
              styles.saveBtn,
              {
                flexDirection: isRTL ? "row-reverse" : "row",
                gap: isRTL ? 10 : 0,
              },
            ]}
            onPress={handleSave}
          >
            <FontAwesome5
              name="save"
              size={18}
              color="#FFF"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.saveBtnText}>
              {t("volume.saveBtn") || "Save & Continue"}
            </Text>
          </TouchableOpacity>
        )}

        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="arrow-back"
            size={20}
            color="#1F5D2B"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.cancelText}>{t("volume.backBtn") || "Back"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VolumeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAF9" },
  container: { padding: 20 },

  tagContainer: {
    backgroundColor: "#C5E1A5",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  tagText: { fontSize: 11, fontWeight: "800", color: "#33691E" },

  mainTitle: { fontSize: 26, fontWeight: "bold", color: "#1B3C14" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 25 },

  tableCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    padding: 12,
  },

  headerCell: {
    fontSize: 12,
    fontWeight: "800",
    color: "#888",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    alignItems: "center",
  },

  itemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  gradeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },

  volumeCell: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputCell: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    textAlign: "center",
    paddingVertical: 6,
  },

  unitText: {
    marginLeft: 6,
    color: "#777",
    fontWeight: "600",
  },

  saveBtn: {
    backgroundColor: "#1F5D2B",
    flexDirection: "row",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  saveBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelBtn: {
    marginTop: "5%",
    alignItems: "center",
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "center",
  },

  cancelText: {
    color: "#1F5D2B",
    fontWeight: "500",
    fontSize: 16,
  },
  emptyBox: {
    padding: 30,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
});
