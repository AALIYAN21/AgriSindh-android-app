import { Login } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";

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
  });
};
