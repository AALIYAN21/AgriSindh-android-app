import { Colors } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
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

  const handlePress = () => {
    router.push('/commodityForm');
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
          <View style={styles.content}>
            <Text style={styles.title}>Add Items</Text>

            <Text style={styles.description}>
              Manage all your agricultural commodities in one centralized location.
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
              <Text style={styles.buttonText}>Add Commodities</Text>
              {/* <Text style={styles.icon}>＋</Text> */}
              <MaterialIcons name="add-circle-outline" color={"white"} size={20} />
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
    fontSize: 16,
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