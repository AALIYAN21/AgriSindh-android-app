import { LocationResult } from "@/constants/types";
import * as Location from "expo-location";

export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    return status === "granted";
  } catch (e) {
    console.log("Location Permission Error", e);
    return false;
  }
}

export async function getCurrentLocation(): Promise<LocationResult> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      return { success: false, error: "Location permission denied" };
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      success: true,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };
  } catch (e) {
    console.log("Location Access Error", e);
    return {
      success: false,
      error: "Failed to get location.",
      message: "Please allow location permission to continue.",
    };
  }
}
