import StatusModal from "@/components/StatusModal";
import { useTranslation } from "@/hooks/useLanguage";
import { useLanguageStore } from "@/i18n/store/languageStore";
import commodities from "@/itemList/itemList.json";
import { insertItemsBulk } from "@/utils/Database";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // 1. Import ImagePicker
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface RowData {
  id: number;
  item: string;
  grade: string;
  price: string;
}

type CategoryType = "Vegetables" | "Fruits";

const CommodityListing = () => {
  const [category, setCategory] = useState<CategoryType>("Vegetables");
  const [isModalVisible, setModalVisible] = useState(false);

  const { language } = useLanguageStore();

  const t = useTranslation();

  // useEffect(() => {
  //   clearAllItems().then((res) => {
  //     console.log("res", res);
  //   });
  //   getItemsWithoutVolume().then((items) => {
  //     console.log("ITEMS WITHOUT VOLUME:", items);
  //   });
  // }, []);

  const clean = (str: string) =>
    str.replace(/,+/g, "").replace(/\s+/g, " ").trim();

  const dropdownData = useMemo(() => {
    const fruits = commodities.fruits.map((item) => ({
      label: clean(language === "ur" ? item.name_ur : item.name_en),
      value: clean(item.name_en), // keep EN stable but cleaned
    }));

    const vegetables = commodities.vegetables
      ? commodities.vegetables.map((item) => ({
          label: clean(language === "ur" ? item.name_ur : item.name_en),
          value: clean(item.name_en),
        }))
      : [];

    return {
      Fruits: fruits,
      Vegetables: vegetables,
    };
  }, [language]);

  const GRADE_OPTIONS = useMemo(() => {
    return [
      {
        label: language === "ur" ? "درجہ اول" : "Grade A",
        value: "A",
      },
      {
        label: language === "ur" ? "درجہ دوم" : "Grade B",
        value: "B",
      },
    ];
  }, [language]);

  // 3. State for images per category
  const [images, setImages] = useState<Record<CategoryType, string[]>>({
    Vegetables: [],
    Fruits: [],
  });

  const todaysDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const [listData, setListData] = useState<Record<CategoryType, RowData[]>>({
    Vegetables: [{ id: 1, item: "", grade: "", price: "" }],
    Fruits: [{ id: 1, item: "", grade: "", price: "" }],
  });

  // 4. Image Picker Functions
  const handleImageUpload = () => {
    Alert.alert("Upload Photo", "Choose an option", [
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const takePhoto = async () => {
    const { status, canAskAgain } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      if (!canAskAgain) {
        Alert.alert(
          "Permission Denied",
          "Please enable camera permissions from your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ],
        );
      } else {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera permissions to make this work!",
        );
      }
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const newUris = result.assets.map((asset) => asset.uri);
      setImages({
        ...images,
        [category]: [...images[category], ...newUris],
      });
    }
  };

  const pickImage = async () => {
    const { status, canAskAgain } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      if (!canAskAgain) {
        Alert.alert(
          "Permission Denied",
          "Please enable media library permissions from your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ],
        );
      } else {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to make this work!",
        );
      }
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allow multiple for record keeping
      quality: 0.7,
    });

    if (!result.canceled) {
      const newUris = result.assets.map((asset) => asset.uri);
      setImages({
        ...images,
        [category]: [...images[category], ...newUris],
      });
    }
  };

  const removeImage = (index: number) => {
    const filteredImages = images[category].filter((_, i) => i !== index);
    setImages({ ...images, [category]: filteredImages });
  };

  const updateRow = (
    id: number,
    field: keyof RowData,
    value: string | null,
  ) => {
    const updatedList = listData[category].map((row) =>
      row.id === id ? { ...row, [field]: value || "" } : row,
    );
    setListData({ ...listData, [category]: updatedList });
  };

  const addRow = () => {
    const newRow: RowData = {
      id: Date.now(),
      item: "",
      grade: "",
      price: "",
    };
    setListData({
      ...listData,
      [category]: [...listData[category], newRow],
    });
  };

  const removeRow = (id: number) => {
    if (listData[category].length === 1) return;
    const filteredList = listData[category].filter((row) => row.id !== id);
    setListData({ ...listData, [category]: filteredList });
  };

  const saveToLocalDB = async () => {
    try {
      const category_id = category === "Vegetables" ? "1" : "2";

      const formattedItems = listData[category].map((row) => ({
        // item_id: `${Date.now()}_${row.id}`,
        item_id: `${row.id}`,
        item: row.item,
        grade: row.grade,
        price: parseFloat(row.price) || 0,
        volume: null,
        user_id: "USER_1", // replace later with real auth user
        category_id,
      }));

      await insertItemsBulk(formattedItems, "USER_1");

      return true;
    } catch (error) {
      console.log("DB SAVE ERROR:", error);
      return false;
    }
  };

  const handleSave = async () => {
    const success = await saveToLocalDB();

    if (success) {
      setModalVisible(true);
    } else {
      Alert.alert("Error", "Failed to save data locally");
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    router.push("/commodityForm/volume");
  };

  return (
    <View style={styles.safeArea}>
      {isModalVisible && (
        <StatusModal onClose={handleCloseModal} status="upload" />
      )}

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>COMMODITY LISTING</Text>
        </View>

        <Text style={styles.mainTitle}>{t("listCommodities.titleHeader")}</Text>
        <Text style={styles.subtitle}>{t("listCommodities.subTitle")}</Text>

        <Text style={styles.sectionLabel}>
          {t("listCommodities.categorySelection")}
        </Text>

        <View style={styles.segmentContainer}>
          {(["Vegetables", "Fruits"] as CategoryType[]).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.segmentButton,
                category === cat && styles.activeSegment,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.segmentText,
                  category === cat && styles.activeSegmentText,
                ]}
              >
                {cat === "Vegetables"
                  ? t("listCommodities.selectorsVegetables")
                  : t("listCommodities.selectorFruits")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DATE */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t("listCommodities.EntryDate")}</Text>
          <View style={styles.dateInput}>
            <Text style={styles.dateText}>{todaysDate}</Text>
            <MaterialIcons name="lock" size={18} color="#999" />
          </View>
        </View>

        {/* TABLE */}
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2.5 }]}>
              {t("listCommodities.tableItemHeader")}
            </Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>
              {t("listCommodities.tableGradeHeader")}
            </Text>
            <Text style={[styles.headerCell, { flex: 1.7 }]}>
              {t("listCommodities.tablePriceHeader")}
            </Text>
          </View>

          {listData[category].map((row) => (
            <View key={row.id} style={styles.tableRow}>
              <View style={[styles.pickerWrapper, { zIndex: 100 }]}>
                <RNPickerSelect
                  onValueChange={(val) => updateRow(row.id, "item", val)}
                  items={dropdownData[category]}
                  value={row.item}
                  placeholder={{
                    label:
                      language === "ur" ? "آئٹم منتخب کریں" : "Select Item",
                    value: null,
                  }}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={18}
                      color="#888"
                    />
                  )}
                />
              </View>

              <View style={[styles.pickerWrapper, { flex: 2, zIndex: 90 }]}>
                <RNPickerSelect
                  onValueChange={(val) => updateRow(row.id, "grade", val)}
                  items={GRADE_OPTIONS}
                  value={row.grade}
                  placeholder={{ label: "Grade", value: null }}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={18}
                      color="#888"
                    />
                  )}
                />
              </View>

              <View style={[styles.priceCell, { flex: 1.8 }]}>
                <TextInput
                  style={styles.inputCellPrice}
                  value={row.price}
                  keyboardType="numeric"
                  onChangeText={(val) => updateRow(row.id, "price", val)}
                  placeholder="0"
                  placeholderTextColor="#CCC"
                />
                <TouchableOpacity
                  onPress={() => removeRow(row.id)}
                  style={styles.removeBtn}
                >
                  <MaterialIcons
                    name="remove-circle-outline"
                    size={22}
                    color="#FF5252"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addRowBtn} onPress={addRow}>
            <MaterialIcons name="add-circle" size={20} color="#1F5D2B" />
            <Text style={styles.addRowText}>{t("listCommodities.addRow")}</Text>
          </TouchableOpacity>
        </View>

        {/* 5. IMAGE UPLOAD SECTION */}
        <Text style={styles.sectionLabel}>
          {category === "Vegetables"
            ? t("listCommodities.uploadVegetablePhoto")
            : t("listCommodities.uploadFruitsPhoto")}
        </Text>
        <View style={styles.imageSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageScroll}
          >
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handleImageUpload}
            >
              <MaterialIcons name="add-a-photo" size={28} color="#1F5D2B" />
              <Text style={styles.uploadBoxText}>Upload</Text>
            </TouchableOpacity>

            {images[category].map((uri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.deleteImageBtn}
                  onPress={() => removeImage(index)}
                >
                  <MaterialIcons name="cancel" size={25} color="#FF5252" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <FontAwesome5
            name="save"
            size={18}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.saveBtnText}>{t("listCommodities.saveBtn")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.volumeBtn}
          onPress={() => router.push("/commodityForm/volume")}
        >
          <FontAwesome5
            name="arrow-right"
            size={18}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.saveBtnText}>
            {t("listCommodities.volumeBtn")}
          </Text>
        </TouchableOpacity>

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
          <Text style={styles.cancelText}>{t("listCommodities.backBtn")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CommodityListing;

const styles = StyleSheet.create({
  // ... existing styles ...
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
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#555",
    marginBottom: 12,
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#EEE",
    borderRadius: 8,
    padding: 4,
    marginBottom: 25,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeSegment: { backgroundColor: "#1F5D2B" },
  segmentText: { fontWeight: "600", color: "#666" },
  activeSegmentText: { color: "#FFF" },
  card: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#555",
    marginBottom: 10,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dateText: { color: "#777", fontWeight: "600" },
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
  headerCell: { fontSize: 12, fontWeight: "800", color: "#888" },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    alignItems: "center",
  },
  pickerWrapper: {
    flex: 2.5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  inputCell: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginHorizontal: 4,
    textAlign: "center",
  },
  inputCellPrice: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    textAlign: "center",
  },
  priceCell: { flexDirection: "row", alignItems: "center" },
  removeBtn: { marginLeft: 5, padding: 2 },
  addRowBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  addRowText: { color: "#1F5D2B", fontWeight: "700", marginLeft: 5 },

  // NEW IMAGE STYLES
  imageSection: { marginBottom: 20 },
  imageScroll: { flexDirection: "row" },
  uploadBox: {
    width: 80,
    height: 80,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#1F5D2B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  uploadBoxText: {
    fontSize: 10,
    color: "#1F5D2B",
    fontWeight: "700",
    marginTop: 4,
  },
  imageWrapper: { marginRight: 10, position: "relative" },
  previewImage: { width: 80, height: 80, borderRadius: 10 },
  deleteImageBtn: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },

  saveBtn: {
    backgroundColor: "#1F5D2B",
    flexDirection: "row",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  volumeBtn: {
    backgroundColor: "#1F5D2B",
    flexDirection: "row",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  saveBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  cancelBtn: {
    alignItems: "center",
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelText: { color: "#1F5D2B", fontWeight: "500", fontSize: 16 },
});

// ... existing pickerSelectStyles ...
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 6,
    color: "#000",
    backgroundColor: "#fff",
    paddingRight: 20,
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: "#fff",
    color: "#000",
    paddingRight: 20,
  },
  iconContainer: { top: Platform.OS === "ios" ? 10 : 12, right: 0 },
  placeholder: { color: "#000", fontSize: 15 },
});
