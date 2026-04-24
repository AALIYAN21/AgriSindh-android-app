import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PrivacySecurity = ({ navigation }: any) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Privacy & Security</Text>

        {/* Data Protection */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <MaterialIcons
              name="security"
              size={18}
              color="#3D6B35"
            />
            <Text style={styles.cardTitle}> Data Protection</Text>
          </View>

          <Text style={styles.cardText}>
            Our commitment to securing your agricultural data is uncompromising.
            We employ enterprise-grade AES-256 encryption for all data at rest
            and TLS 1.3 for data in transit. Your farm’s metrics, yield reports,
            and soil analyses are stored in isolated, encrypted cloud
            environments.
          </Text>
        </View>

        {/* Security Audit */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <MaterialIcons
              name="verified-user"
              size={18}
              color="#3D6B35"
            />
            <Text style={styles.cardTitle}> Security Audit</Text>
          </View>

          <Text style={styles.cardText}>
            Your account was last accessed from a new device in Das Mines, 4.
            If this wasn’t you, reset your credentials immediately.
          </Text>

          <TouchableOpacity>
            <Text style={styles.link}>Revoke Access Log →</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Policy */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <MaterialIcons
              name="description"
              size={18}
              color="#3D6B35"
            />
            <Text style={styles.cardTitle}> Privacy Policy</Text>
          </View>

          <Text style={styles.cardText}>
            We believe in transparency. SWAT AMIS collects source data and
            operational inputs only to provide your personalized market and crop
            intelligence.
          </Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="arrow-back"
            size={18}
            color="#4A6B42"
          />
          <Text style={styles.buttonText}> Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PrivacySecurity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F2",
    padding: 18,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3D6B35",
    marginBottom: 20,
  },

  card: {
    marginBottom: 22,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#3D6B35",
  },

  cardText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#666",
  },

  link: {
    marginTop: 8,
    color: "#4A6B42",
    fontWeight: "700",
    fontSize: 13,
  },

  button: {
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: "#7B9B72",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },

  buttonText: {
    color: "#4A6B42",
    fontWeight: "700",
    fontSize: 15,
  },
});