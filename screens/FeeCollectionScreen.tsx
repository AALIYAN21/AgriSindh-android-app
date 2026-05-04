import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import PaymentModal from "@/components/PaymentModal";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";

export default function FeeCollectionScreen() {

  /* ================= DATA ================= */

  const [data, setData] = useState([
    { id: 1, date: "12 Aug 2026", time: "10:30 AM", amount: 500, paid: false },
    { id: 2, date: "13 Aug 2026", time: "11:15 AM", amount: 500, paid: true },
    { id: 3, date: "14 Aug 2026", time: "09:45 AM", amount: 500, paid: false },
  ]);

  /* ================= FILTER ================= */

  const [filter, setFilter] = useState<"paid" | "unpaid">("unpaid");

  /* ================= MODAL STATES ================= */

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [amountInput, setAmountInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  /* ================= MODAL HANDLERS ================= */

  const openModal = (item: any) => {
    setSelected(item);
    setAmountInput("");
    setImage(null);
    setPermissionDenied(false);
    setVisible(true);
  };

  const closeModal = () => setVisible(false);

  /* ================= IMAGE ================= */

  const pickImage = async () => {
    const res = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!res.granted) {
      setPermissionDenied(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const res = await ImagePicker.requestCameraPermissionsAsync();

    if (!res.granted) {
      setPermissionDenied(true);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const removeImage = () => setImage(null);

  /* ================= PAYMENT ================= */

  const confirmPayment = () => {
    if (!selected) return;

    setData((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              paid: true,
              amount: amountInput ? parseInt(amountInput) : item.amount,
              image,
            }
          : item
      )
    );

    closeModal();
  };

  /* ================= FILTER LOGIC ================= */

  const filteredData = useMemo(() => {
    if (filter === "paid") return data.filter((i) => i.paid);
    return data.filter((i) => !i.paid); // unpaid default
  }, [data, filter]);

  /* ================= UI ================= */

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>

      <View>
        <Text style={styles.info}>{item.date}</Text>
        <Text style={styles.info}>{item.time}</Text>
        <Text style={styles.amount}>Rs. {item.amount}</Text>
      </View>

      {!item.paid ? (
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => openModal(item)}
        >
          <Text style={styles.payText}>Pay</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.paidBadge}>
          <Text style={styles.paidText}>Paid</Text>
        </View>
      )}

    </View>
  );

  return (
    <View style={styles.container}>

      {/* ================= FILTER (ONLY 2 BUTTONS) ================= */}

      <View style={styles.filterBox}>

        <TouchableOpacity
          onPress={() => setFilter("unpaid")}
          style={[styles.filterBtn, filter === "unpaid" && styles.active]}
        >
          <Text style={styles.filterText}>UNPAID</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("paid")}
          style={[styles.filterBtn, filter === "paid" && styles.active]}
        >
          <Text style={styles.filterText}>PAID</Text>
        </TouchableOpacity>

      </View>

      {/* ================= LIST ================= */}

      <FlatList
        data={filteredData}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderItem}
      />

      {/* ================= MODAL ================= */}

      <PaymentModal
        visible={visible}
        selected={selected}
        amountInput={amountInput}
        setAmountInput={setAmountInput}
        image={image}
        pickImage={pickImage}
        takePhoto={takePhoto}
        removeImage={removeImage}
        confirmPayment={confirmPayment}
        closeModal={closeModal}
        permissionDenied={permissionDenied}
        openSettings={() => Linking.openSettings()}
      />

    </View>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    padding: 16,
  },

  /* FILTER */

  filterBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 6,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 2,
  },

  filterBtn: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  active: {
    backgroundColor: "#2e7d32",
  },

  filterText: {
    fontWeight: "800",
    fontSize: 12,
    color: "#0F172A",
  },

  /* CARD */

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    elevation: 3,
  },

  info: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },

  amount: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
  },

  payBtn: {
    backgroundColor: "#2e7d32",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  payText: {
    color: "#fff",
    fontWeight: "800",
  },

  paidBadge: {
    backgroundColor: "#ECFDF5",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  paidText: {
    color: "#16A34A",
    fontWeight: "800",
  },
});