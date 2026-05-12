export interface LoginResponse {
  data: {
    token: string;
    message: string;
    status: number;
    user: User;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
}
