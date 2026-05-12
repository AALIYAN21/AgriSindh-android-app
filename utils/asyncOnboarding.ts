import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveOnboarding = async () => {
  try {
    await AsyncStorage.setItem("onboarding", "true");
    return true;
  } catch (e: any) {
    console.log("Onboarding Save Error:", e);
    return false;
  }
};

export const getOnboarding = async () => {
  try {
    const onboarding = await AsyncStorage.getItem("onboarding");
    return onboarding;
  } catch (e: any) {
    console.log("Onboarding Get Error:", e);
    return null;
  }
};
