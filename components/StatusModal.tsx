import { Colors } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


type Props = {
  status: "sync" | "upload" | "otp";
  onClose: () => void;
};

const statusConfig = {
  sync: {
    title: "Sync Complete",
    message: "Your data has been successfully synced.",
    icon: <MaterialIcons name="refresh" size={80} color={Colors.light.primary} />,
  },
  upload: {
    title: "Upload Complete",
    message: "Your data has been successfully uploaded.",
    icon: <MaterialIcons name="check-circle" size={80} color={Colors.light.primary} />,
  },
  otp: {
    title: "OTP Verified",
    message: "Your OTP has been successfully verified.",
    icon: <MaterialIcons name="check-circle" size={80} color={Colors.light.primary} />,
  },
};

export default function StatusModal({ status = "upload", onClose }: Props) {
  const data = statusConfig[status] || statusConfig.upload;

  return (
    <Modal transparent animationType="fade" visible>
      <View style={styles.overlay}>
        <View style={styles.card}>

          <Text style={styles.icon}>{data.icon}</Text>

          <Text style={styles.title}>{data.title}</Text>

          <Text style={styles.message}>{data.message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    elevation: 10,
  },

  icon: {
    fontSize: 50,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111",
  },

  message: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    width: "100%",
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});