import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const FeatureScreen = () => {
  return (
    <View style={styles.container}>
      {/* FEATURE CARD */}
      <View style={styles.cardWrapper}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=2000",
          }}
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

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add Commodities</Text>
              {/* <Text style={styles.icon}>＋</Text> */}
              <MaterialIcons name="add-circle-outline" color={"white"} size={20}/>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

/* NAV ITEM COMPONENT */
const NavItem = ({ icon, label, active }: {icon: any, label: string, active: boolean}) => {
  return (
    <TouchableOpacity
      style={[styles.navItem, active && styles.navItemActive]}
    >
      <Text style={styles.navIcon}>{icon}</Text>

      <Text style={[styles.navLabel, active && styles.navLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FeatureScreen;

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#2e7d32",
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

  /* BOTTOM NAV */
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },

  navItem: {
    alignItems: "center",
    padding: 8,
  },

  navItemActive: {
    backgroundColor: "#2e7d32",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  navIcon: {
    fontSize: 18,
  },

  navLabel: {
    fontSize: 10,
    marginTop: 4,
    color: "#666",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  navLabelActive: {
    color: "#fff",
  },
});