import apiClient from "@/api/apiClient";
import { LoginResponse } from "@/constants/types";
import { removeToken, saveToken } from "@/utils/asyncToken";

export const Login = async (
  email: string,
  password: string,
  latitude: number,
  longitude: number,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post("/api/login", {
      email,
      password,
      latitude,
      longitude,
    });
    await saveToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    await removeToken();
    return true;
  } catch (e) {
    console.log("Logout Error:", e);
    return false;
  }
};
