import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useLanguage";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FeatureScreen = () => {
  const router = useRouter();

  const { t, isRTL } = useTranslation();

  const handlePress = () => {
    router.push("/commodityForm");
  };

  return (
    <View style={styles.container}>
      {/* FEATURE CARD */}
      <View style={styles.cardWrapper}>
        <ImageBackground
          source={require("../assets/images/Card.jpg")}
          style={styles.card}
          imageStyle={styles.image}
        >
          {/* DARK OVERLAY */}
          <View style={styles.overlay} />

          {/* CONTENT */}
          <View style={[styles.content, isRTL && { alignItems: "flex-end" }]}>
            <Text style={styles.title}>
              {t("categories.categoriesCard.titleHeader")}
            </Text>

            <Text style={styles.description}>
              {t("categories.categoriesCard.subTitle")}
            </Text>

            <TouchableOpacity
              style={[
                styles.button,
                isRTL && { flexDirection: "row-reverse", gap: 5 },
              ]}
              onPress={() => handlePress()}
            >
              <Text style={styles.buttonText}>
                {t("categories.categoriesCard.button")}
              </Text>
              {/* <Text style={styles.icon}>＋</Text> */}
              <MaterialIcons
                name="add-circle-outline"
                color={"white"}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default FeatureScreen;

/* STYLES */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F7FB",
    flex: 1,
  },

  /* CARD */
  cardWrapper: {
    height: 500,
    margin: 16,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 8,
  },

  card: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
  },

  image: {
    borderRadius: 24,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  content: {
    zIndex: 2,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 20,
    lineHeight: 22,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 20,
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    marginRight: 10,
  },

  icon: {
    color: "#fff",
    fontSize: 18,
  },
});
