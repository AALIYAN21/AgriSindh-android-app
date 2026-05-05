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

// ✅ IMPORT DB + SYNC
import { initDB } from "@/utils/Database";
import { startAutoSync } from "@/utils/syncService";

export default function Splash() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // 🔥 INIT DB + SYNC SYSTEM (non-blocking)
    const setup = async () => {
      try {
        await initDB();
        startAutoSync();
        console.log("DB + Sync initialized");
      } catch (e) {
        console.log("Init error:", e);
      }
    };

    setup();

    // 🎬 ANIMATION START
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

    // ⏳ REDIRECT AFTER 3 SEC
    const redirectTimer = setTimeout(() => {
      router.replace("/onboarding");
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

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
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
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

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by</Text>
          <Text style={styles.footerText}>Verge Systems (Pvt) Ltd</Text>
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
