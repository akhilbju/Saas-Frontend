import { CommonResponse } from "./common.response";

export interface LoginResponse  extends CommonResponse {
  accessToken: string;
  refreshToken: string;
  userType: string;
}