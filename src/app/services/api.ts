import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login.response';
import { AddProjectRequest } from '../models/addproject.request';
import { CommonResponse } from '../models/common.response';
import { GetProjectRequest } from '../models/getproject.request';
import { GetProjectResponse } from '../models/getprojects.response';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private commonUrl = 'https://fat-gabriela-akhil-organization-7ed0f63b.koyeb.app/api/';

  private Auth = 'Auth/';
  private Project = 'Project/';

  private auth : any = {
    LoginUser : this.commonUrl + this.Auth + 'LoginUser',
    RefreshTokenGenerateRefreshToken : this.commonUrl + this.Auth + 'RefreshTokenGenerateRefreshToken?RefreshToken=',
  };

  private project : any = {
    AddProject : this.commonUrl + this.Project + 'AddProject',
    GetProjects : this.commonUrl + this.Project + 'GetProjects',
  };
  

  constructor(private http: HttpClient) {}
  loginUser(data: any) {
    return this.http.post<LoginResponse>(this.auth.LoginUser, data);
  }
  refreshToken(refreshToken: string) {
    return this.http.get<LoginResponse>(this.auth.RefreshTokenGenerateRefreshToken + refreshToken);
  }

  addProject(data: AddProjectRequest) {
    return this.http.post<CommonResponse>(this.project.AddProject, data);
  }

  getProjects(data: GetProjectRequest) {
    return this.http.post<GetProjectResponse>(this.project.GetProjects, data);
  }
}
