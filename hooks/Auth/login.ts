import { Login } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({
      email,
      password,
      latitude,
      longitude,
    }: {
      email: string;
      password: string;
      latitude: number;
      longitude: number;
    }) => Login(email, password, latitude, longitude),
    onSuccess: (data) => {
      console.log(data);
      Toast.show({
        type: "success",
        text1: "Login successful",
      });
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Failed to login",
      });
    },
  });
};
