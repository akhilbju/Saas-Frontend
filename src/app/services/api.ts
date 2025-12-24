import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    private AuthLoginUrl = 'https://fat-gabriela-akhil-organization-7ed0f63b.koyeb.app/api/Auth/LoginUser';

    constructor(private http: HttpClient) {}
    loginUser(data: any) {
        return this.http.post<any>(this.AuthLoginUrl, data);
    }
}
