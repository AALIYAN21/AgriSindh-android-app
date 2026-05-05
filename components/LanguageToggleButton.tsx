import { Colors } from "@/constants/theme";
import { useLanguageStore } from "@/i18n/store/languageStore";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const languages = [
  { label: "English", value: "en" },
  { label: "Urdu", value: "ur" },
  { label: "Sindhi", value: "sin" },
];

const LanguageToggleButton = () => {
  const { language, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);

  const currentLabel =
    languages.find((l) => l.value === language)?.label || "Language";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={styles.text}>{currentLabel}</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.value}
              style={styles.option}
              onPress={() => {
                setLanguage(lang.value as any);
                setOpen(false);
              }}
            >
              <Text style={styles.optionText}>{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default LanguageToggleButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    position: "relative", // important for absolute child
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  dropdown: {
    position: "absolute",
    top: "100%", // directly below button
    left: "-35%",
    marginTop: "-30%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5, // Android shadow
    zIndex: 1000, // iOS layering
    minWidth: 120,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
});
