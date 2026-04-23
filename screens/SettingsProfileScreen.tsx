import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const IdentityProfile = ({ navigation }: any) => {
  const [form, setForm] = useState({
    fullName: "Allah Dino",
    email: "allahdino2026@gmail.com",
    phone: "+92332345678",
    market: "Hyderabad Cantt",
    district: "Hyderabad",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.smallHeading}>ACCOUNT MANAGEMENT</Text>
        <Text style={styles.heading}>Identity & Profile</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput
            style={styles.input}
            value={form.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
            placeholder="Enter full name"
          />

          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>PHONE NUMBER</Text>
          <TextInput
            style={styles.input}
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder="Enter phone"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>MARKET NAME</Text>
          <TextInput
            style={styles.input}
            value={form.market}
            onChangeText={(text) => handleChange("market", text)}
            placeholder="Enter market name"
          />

          <Text style={styles.label}>DISTRICT NAME</Text>
          <TextInput
            style={styles.input}
            value={form.district}
            onChangeText={(text) => handleChange("district", text)}
            placeholder="Enter district"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation?.goBack()}
          >
            <Text style={styles.buttonText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IdentityProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  smallHeading: {
    fontSize: 11,
    color: "#6B7D64",
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: "#3D6B35",
    marginTop: 8,
    marginBottom: 30,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#666",
    marginBottom: 6,
    marginTop: 18,
  },
  input: {
    backgroundColor: "#DCDCDC",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
  },
  button: {
    marginTop: 35,
    borderWidth: 1.5,
    borderColor: "#7B9B72",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#4A6B42",
    fontWeight: "700",
    fontSize: 15,
  },
});