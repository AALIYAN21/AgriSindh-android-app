import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) => {
  try {
    if (!token) return;
    await AsyncStorage.setItem("token", token);
    return true;
  } catch (e: any) {
    console.log("Token Save Error:", e);
    return false;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (e: any) {
    console.log("Token Get Error:", e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
    return true;
  } catch (e: any) {
    console.log("Token Remove Error:", e);
    return false;
  }
};
