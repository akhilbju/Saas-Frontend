export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
  isSuccess: boolean;
  message: string;
  error: string;
}