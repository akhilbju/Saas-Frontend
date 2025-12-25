import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login.response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private commonUrl = 'https://fat-gabriela-akhil-organization-7ed0f63b.koyeb.app/api/';

  private AuthLoginUrl = this.commonUrl + 'Auth/LoginUser';
  private RefreshTokenUrl = this.commonUrl + 'Auth/RefreshTokenGenerateRefreshToken?RefreshToken=';

  constructor(private http: HttpClient) {}
  loginUser(data: any) {
    return this.http.post<LoginResponse>(this.AuthLoginUrl, data);
  }
  refreshToken(refreshToken: string) {
    return this.http.get<any>(this.RefreshTokenUrl + refreshToken);
  }
}
