import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const STAGES = [
  {
    id: 1,
    title: "Sindh Agriculture And Water Transformation",
    description:
      "The Agriculture Management Information System (AMIS) is designed to provide transparent, efficient, and reliable access",
    image: require("../assets/images/onboarding-1.jpg"),
  },
  {
    id: 2,
    title: "Centralized Record",
    description:
      "The all-in-one record keeping solution for the Sindh Water & Agriculture Transformation Project. Real-time data management at your fingertips",
    image: require("../assets/images/onboarding-2.jpg"),
  },
  {
    id: 3,
    title: "Technology Powered Agriculture",
    description:
      "SWAT AMIS is a platform powered by technology to provide transparent, efficient and reliable access.",
    image: require("../assets/images/onboarding-3.jpg"),
  },
];

const OnboardingScreen = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const router = useRouter();

  const handlePress = (event: any) => {
    const tapX = event.nativeEvent.locationX;

    if (tapX < width / 2) {
      if (currentStage > 0) {
        setCurrentStage((prev) => prev - 1);
      }
    } else {
      if (currentStage < STAGES.length - 1) {
        setCurrentStage((prev) => prev + 1);
      } else {
        router.replace("/login");
      }
    }
  };

  return (
    <>
      <StatusBar animated translucent />

      <ImageBackground
        source={STAGES[currentStage].image}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* ✅ FIXED OVERLAY (soft + professional) */}
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.05)", // very light top (keeps image clean)
            "rgba(0,0,0,0.25)", // subtle middle
            "rgba(0,0,0,0.65)", // stronger only at bottom for text
          ]}
          locations={[0, 0.6, 1]}
          style={StyleSheet.absoluteFillObject}
        />

        <SafeAreaView style={styles.container}>
          {/* Progress */}
          <View style={styles.indicatorContainer}>
            {STAGES.map((_, index) => (
              <View key={index} style={styles.indicatorBackground}>
                <View
                  style={[
                    styles.indicatorProgress,
                    {
                      width: index <= currentStage ? "100%" : "0%",
                    },
                  ]}
                />
              </View>
            ))}
          </View>

          {/* Content */}
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.content}>
              <View style={styles.textWrapper}>
                <Text style={styles.title}>{STAGES[currentStage].title}</Text>
                <Text style={styles.subtitle}>
                  {STAGES[currentStage].description}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {/* Footer */}
          <View style={styles.footer}>
            {currentStage < STAGES.length - 1 && (
              <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text style={styles.skipText}>SKIP ONBOARDING</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "110%",
  },
  container: {
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "space-between",
    zIndex: 10,
  },
  indicatorBackground: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginHorizontal: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  indicatorProgress: {
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  textWrapper: {
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#EDEDED",
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    alignItems: "center",
  },
  skipText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OnboardingScreen;
