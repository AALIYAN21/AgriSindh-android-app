import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getOnboarding, saveOnboarding } from "@/utils/asyncOnboarding";
import { getToken } from "@/utils/asyncToken";

// DB + SYNC
import { getUnsyncedItems, initDB } from "@/utils/Database";
import { startAutoSync } from "@/utils/syncService";

export default function Splash() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const setupApp = async () => {
      try {
        // ===============================
        // INIT DB
        // ===============================
        await initDB();

        // ===============================
        // CHECK PENDING DATA BEFORE SYNC
        // ===============================
        const pendingItems = await getUnsyncedItems();

        console.log(
          "PENDING ITEMS ON START:",
          pendingItems.length,
        );

        if (pendingItems.length > 0) {
          startAutoSync();
          console.log("AUTO SYNC ENABLED");
        } else {
          console.log("NO PENDING DATA → AUTO SYNC SKIPPED");
        }

        // ===============================
        // SPLASH DELAY
        // ===============================
        await new Promise((resolve) =>
          setTimeout(resolve, 2500),
        );

        // ===============================
        // ONBOARDING CHECK
        // ===============================
        const onboardingDone =
          await getOnboarding();

        if (!onboardingDone) {
          await saveOnboarding();
          router.replace("/onboarding");
          return;
        }

        // ===============================
        // TOKEN CHECK
        // ===============================
        const token = await getToken();

        if (token) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.log("Splash Error:", error);
        router.replace("/(auth)/login");
      }
    };

    setupApp();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.backdrop} />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require("../assets/images/swat-logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>SWAT</Text>

        <Text style={styles.fullForm}>
          Sindh Water & Agriculture Transformation
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Powered by
          </Text>

          <Text style={styles.footerText}>
            Verge Systems (Pvt) Ltd
          </Text>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },

  logoContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },

  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 2,
  },

  fullForm: {
    marginTop: 8,
    color: "#c8e6c9",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },

  footerText: {
    color: "#c8e6c9",
    fontSize: 12,
    fontWeight: "600",
  },
});
