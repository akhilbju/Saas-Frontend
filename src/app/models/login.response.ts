export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userType: string;
  isSuccess: boolean;
  message: string;
  error: string;
}