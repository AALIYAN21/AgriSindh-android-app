import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const DataSyncStatus = () => {
  const pieData = [
    {
      value: 65,
      color: "#154212",
    },
    {
      value: 35,
      color: "#dcdfe3",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Data Sync Status</Text>
      <Text style={styles.subHeading}>
        Current state of data synchronization
      </Text>

      <View style={styles.card}>
        <PieChart
          data={pieData}
          donut
          showText
          textColor="#154212"
          textSize={28}
          radius={90}
          innerRadius={65}
          centerLabelComponent={() => {
            return (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.percent}>65%</Text>
                <Text style={styles.synced}>Synced</Text>
              </View>
            );
          }}
        />

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#154212" }]} />
            <Text>Synced Data</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#dcdfe3" }]} />
            <Text>35% Pending</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="sync" size={22} color="white" />
          <Text style={styles.buttonText}>Sync Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DataSyncStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#154212",
  },
  subHeading: {
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
  },
  percent: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#154212",
  },
  synced: {
    fontSize: 14,
    color: "#666",
  },
  legendContainer: {
    flexDirection: "row",
    marginTop: 25,
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#154212",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
});