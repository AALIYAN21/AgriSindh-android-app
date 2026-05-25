import apiClient from "@/api/apiClient";
import { ChangeUserPassword } from "@/constants/types";

// CHANGE USER PASSWORD API SERVICE LAYER
export const changeUserPassword = async (body: ChangeUserPassword) => {
  console.log("CHANGE USER PASSWORD FROM SERVICE", body);
  try {
    const response = await apiClient.post("/api/change-password", {
      current_password: body.currentPassword,
      new_password: body.newPassword,
      confirm_password: body.confirmPassword,
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
