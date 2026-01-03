import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login.response';
import { AddProjectRequest } from '../models/addproject.request';
import { CommonResponse } from '../models/common.response';
import { GetProjectRequest } from '../models/getproject.request';
import { GetProjectResponse } from '../models/getprojects.response';
import { GetUsers } from '../models/getusers.response';
import { GetProjectDetails } from '../models/getprojectdetails';
import { Project } from '../project/project';
import { Getprojectstatuses } from '../models/getprojectstatuses';
import { CreateProjectStatus } from '../models/createprojectstatuses ';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private commonUrl = 'https://fat-gabriela-akhil-organization-7ed0f63b.koyeb.app/api/';

  private Auth = 'Auth/';
  private Project = 'Project/';
  private Common = 'Common/';

  private auth : any = {
    LoginUser : this.commonUrl + this.Auth + 'LoginUser',
    RefreshTokenGenerateRefreshToken : this.commonUrl + this.Auth + 'GenerateRefreshToken?RefreshToken=',
  };

  private project : any = {
    AddProject : this.commonUrl + this.Project + 'CreateProject',
    GetProjects : this.commonUrl + this.Project + 'GetProjects',
    GetProjectDetails : this.commonUrl + this.Project + 'GetProjectById/',
    GetProjectStatueses : this.commonUrl + this.Project + 'GetProjectStatuses/projectId?projectId=',
    AddProjectStatus : this.commonUrl + this.Project + 'CreateProjectStatus',
    DeleteProjectStatus : this.commonUrl + this.Project + 'DeleteProjectStatus/',
  };
  
  private common : any = {
    GetAllUsers : this.commonUrl + this.Common + 'GetUsers',
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

  getAllUsers() {
    return this.http.get<GetUsers[]>(this.common.GetAllUsers);
  }

  getProjectDetails(projectId : number){
    return this.http.get<GetProjectDetails>(this.project.GetProjectDetails + projectId);
  }

  getProjectStatuses(ProjectId : number){
    return this.http.get<Getprojectstatuses[]>(this.project.GetProjectStatueses + ProjectId);
  }

  createProjectStatus(request: CreateProjectStatus) {
    return this.http.post<CommonResponse>(this.project.AddProjectStatus,request)
  }
  deleteProjectStatus(statusId : number){
    return this.http.delete<CommonResponse>(this.project.DeleteProjectStatus + statusId);
  }
}
