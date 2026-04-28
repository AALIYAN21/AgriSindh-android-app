import { Colors } from "@/constants/theme";
import { useLanguageStore } from "@/i18n/store/languageStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const LanguageToggleButton = () => {
    const { language, toggleLanguage } = useLanguageStore();

    return (
        <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
            <Text style={styles.text}>
                {language === "en" ? "Urdu" : "English"}
            </Text>
        </TouchableOpacity>
    );
};

export default LanguageToggleButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: Colors.light.primary,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
});