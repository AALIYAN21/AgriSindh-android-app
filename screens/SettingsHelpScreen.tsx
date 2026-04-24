import StatusModal from "@/components/StatusModal";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const HelpSupport = ({ navigation }: any) => {
  const router = useRouter();
  const [complaint, setComplaint] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!complaint.trim()) {
      Alert.alert("Error", "Please write your complaint first.");
      return;
    }

    setIsModalVisible(true)
    setComplaint("");
  };

  const handleDismissModal = () => {
    setIsModalVisible(false)
  }

  return (
    <View style={styles.container}>
      {isModalVisible &&
        <StatusModal status="upload" onClose={handleDismissModal} />
      }
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Heading */}
        <Text style={styles.heading}>Help & Support</Text>

        {/* Description */}
        <Text style={styles.description}>
          Need assistance with the ledger or encountered an issue in the field?
          Submit your concerns below and our technical team will review it shortly.
        </Text>

        {/* Complaint Label */}
        <Text style={styles.label}>WRITE YOUR COMPLAINT HERE</Text>

        {/* Editable Complaint Box */}
        <TextInput
          style={styles.textBox}
          multiline
          numberOfLines={7}
          placeholder="Describe the issue in detail, including any specific coordinates or batch numbers..."
          placeholderTextColor="#A0A0A0"
          value={complaint}
          onChangeText={setComplaint}
          textAlignVertical="top"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Complaint</Text>
          <MaterialIcons name="send" size={18} color="white" />
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={18} color="#4A6B42" />
          <Text style={styles.backText}> Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 18
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3D6B35",
    marginTop: 10,
    marginBottom: 10,
  },

  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A6B42",
    marginBottom: 8,
  },

  textBox: {
    backgroundColor: "#E8E8E8",
    borderRadius: 6,
    padding: 14,
    fontSize: 14,
    minHeight: 150,
    color: "#333",
  },

  submitButton: {
    marginTop: 25,
    backgroundColor: "#1F5D1A",
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  submitText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  backButton: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  backText: {
    color: "#4A6B42",
    fontWeight: "700",
    fontSize: 13,
  },
});