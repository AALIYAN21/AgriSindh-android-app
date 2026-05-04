import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

type Payment = {
  id: number;
  date: string;
  time: string;
  amount: number;
};

type Props = {
  visible: boolean;
  selected: Payment | null;
  amountInput: string;
  setAmountInput: (val: string) => void;
  image: string | null;
  pickImage: () => void;
  takePhoto: () => void;
  removeImage: () => void;
  confirmPayment: () => void;
  closeModal: () => void;
  permissionDenied?: boolean;
  openSettings?: () => void;
};

export default function PaymentModal({
  visible,
  selected,
  amountInput,
  setAmountInput,
  image,
  pickImage,
  takePhoto,
  removeImage,
  confirmPayment,
  closeModal,
  permissionDenied,
  openSettings,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill} />

        <View style={styles.modal}>

          {/* HEADER */}
          <Text style={styles.title}>Deposit Payment</Text>

          {/* SELECTED INFO */}
          {selected && (
            <View style={styles.box}>
              <View style={styles.row}>
                <MaterialIcons name="calendar-today" size={18} color="#2e7d32" />
                <Text style={styles.text}>{selected.date}</Text>
              </View>

              <View style={styles.row}>
                <MaterialIcons name="schedule" size={18} color="#2e7d32" />
                <Text style={styles.text}>{selected.time}</Text>
              </View>

              <Text style={styles.fixed}>Fixed Fee: Rs. 500</Text>
            </View>
          )}

          {/* INPUT */}
          <TextInput
            value={amountInput}
            onChangeText={setAmountInput}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={styles.input}
          />

          {/* ACTION BUTTONS */}
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btn} onPress={pickImage}>
              <MaterialIcons name="photo-library" size={18} color="#fff" />
              <Text style={styles.btnText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={18} color="#fff" />
              <Text style={styles.btnText}>Camera</Text>
            </TouchableOpacity>
          </View>

          {/* IMAGE PREVIEW */}
          {image && (
            <View style={styles.imageBox}>
              <Image source={{ uri: image }} style={styles.image} />

              <TouchableOpacity style={styles.close} onPress={removeImage}>
                <MaterialIcons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          {/* PERMISSION BOX */}
          {permissionDenied && (
            <View style={styles.permissionBox}>
              <Text style={styles.permissionText}>
                Permission denied. Please enable from settings.
              </Text>

              <TouchableOpacity style={styles.settingsBtn} onPress={openSettings}>
                <Text style={styles.settingsText}>Open Settings</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* CONFIRM */}
          <TouchableOpacity style={styles.confirm} onPress={confirmPayment}>
            <MaterialIcons name="lock" size={18} color="#fff" />
            <Text style={styles.confirmText}>Confirm Payment</Text>
          </TouchableOpacity>

          {/* CANCEL */}
          <Pressable style={styles.cancel} onPress={closeModal}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({

  /* ================= OVERLAY ================= */

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  /* ================= MODAL BOX ================= */

  modal: {
    width: "92%",
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },

  /* ================= TITLE ================= */

  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 12,
    textAlign: "center",
  },

  /* ================= INFO BOX ================= */

  box: {
    backgroundColor: "#E8F5E9",
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },

  text: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },

  fixed: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "900",
    color: "#2e7d32",
  },

  /* ================= INPUT ================= */

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FAFAFA",
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },

  /* ================= BUTTON ROW ================= */

  btnRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  btn: {
    flex: 1,
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,

    shadowColor: "#2e7d32",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },

  btnText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },

  /* ================= IMAGE ================= */

  imageBox: {
    marginTop: 12,
    position: "relative",
  },

  image: {
    width: "100%",
    height: 170,
    borderRadius: 16,
  },

  close: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 5,
  },

  /* ================= CONFIRM BUTTON ================= */

  confirm: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 16,
    marginTop: 16,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,

    shadowColor: "#2e7d32",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },

  confirmText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },

  /* ================= CANCEL BUTTON ================= */

  cancel: {
    marginTop: 12,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#EF4444",
    borderRadius: 12,
    alignItems: "center",
  },

  cancelText: {
    color: "#EF4444",
    fontWeight: "800",
    fontSize: 13,
  },

  /* ================= PERMISSION BOX ================= */

  permissionBox: {
    marginTop: 12,
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 14,
  },

  permissionText: {
    color: "#B91C1C",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 8,
  },

  settingsBtn: {
    backgroundColor: "#111827",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  settingsText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});