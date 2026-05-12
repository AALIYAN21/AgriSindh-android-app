import apiClient from "@/api/apiClient";
import { LoginResponse } from "@/constants/types";
import { saveToken } from "@/utils/asyncToken";

export const Login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post("/login", { email, password });
    await saveToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
