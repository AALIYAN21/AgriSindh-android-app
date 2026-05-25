export interface LoginResponse {
  data: {
    token: string;
    message: string;
    status: number;
    user: User;
  };
}

export type UserCoordinates = {
  latitude: number;
  longitude: number;
};

export type LocationResult = {
  success: boolean;
  location?: UserCoordinates;
  error?: string;
  message?: string;
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ChangeUserPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
