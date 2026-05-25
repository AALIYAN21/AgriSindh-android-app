import { changeUserPassword } from "@/services/PasswordService";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useChangePassword = () => {
  return useMutation<
    any,
    Error,
    {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }
  >({
    mutationFn: changeUserPassword,

    onSuccess: (data) => {
      console.log("password changed successfully FROM HOOKS", data);

      Toast.show({
        type: "success",
        text1: "Password changed successfully",
      });
    },

    onError: (error: any) => {
      console.log(error);

      Toast.show({
        type: "error",
        text1:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to change password",
      });
    },
  });
};
