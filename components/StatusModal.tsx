import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useLanguage";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  status: "sync" | "upload" | "otp" | "passwordReset" | "submission";
  onClose: () => void;
};

// const statusConfig = {
//   sync: {
//     title: "Sync Complete",
//     message: "Your data has been successfully synced.",
//     icon: <MaterialIcons name="refresh" size={80} color={Colors.light.primary} />,
//   },
//   upload: {
//     title: "Upload Complete",
//     message: "Your data has been successfully uploaded.",
//     icon: <MaterialIcons name="check-circle" size={80} color={Colors.light.primary} />,
//   },
//   otp: {
//     title: "OTP Verified",
//     message: "Your OTP has been successfully verified.",
//     icon: <MaterialIcons name="check-circle" size={80} color={Colors.light.primary} />,
//   },
//   passwordReset: {
//     title: "Password Reset",
//     message: "You can now login with your new password.",
//     icon: <MaterialIcons name="check-circle" size={80} color={Colors.light.primary} />,
//   },
// };

const statusConfig = {
  sync: {
    icon: (
      <MaterialIcons name="refresh" size={80} color={Colors.light.primary} />
    ),
  },
  upload: {
    icon: (
      <MaterialIcons
        name="check-circle"
        size={80}
        color={Colors.light.primary}
      />
    ),
  },
  otp: {
    icon: (
      <MaterialIcons
        name="check-circle"
        size={80}
        color={Colors.light.primary}
      />
    ),
  },
  passwordReset: {
    icon: (
      <MaterialIcons
        name="check-circle"
        size={80}
        color={Colors.light.primary}
      />
    ),
  },
  submission: {
    icon: (
      <MaterialIcons
        name="check-circle"
        size={80}
        color={Colors.light.primary}
      />
    ),
  },
};

export default function StatusModal({ status = "upload", onClose }: Props) {
  const { t } = useTranslation();
  const data = statusConfig[status] || statusConfig.upload;

  return (
    <Modal transparent animationType="fade" visible={status !== null}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* ICON */}
          <View style={{ marginBottom: 10 }}>{data.icon}</View>

          {/* TITLE */}
          <Text style={styles.title}>{t(`status.${status}.title`)}</Text>

          {/* DESCRIPTION */}
          <Text style={styles.message}>
            {t(`status.${status}.description`)}
          </Text>

          {/* BUTTON */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{t("status.ok")}</Text>
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
