import { Component, inject } from '@angular/core';
import { GetProjectRequest } from '../models/getproject.request';
import { ApiService } from '../services/api';
import { NgFor, NgIf } from '@angular/common';
import { Roles } from '../shared/Roles';
import { AddProjectRequest } from '../models/addproject.request';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  constructor(private routes : Router){}
  getProjects: GetProjectRequest = {
    projectName: '',
    rowsPerPage: 10,
    pageNumber: 1,
  };
  users: any = [];
  showPopup: boolean = false;
  allProjects: any = {};
  apiService = inject(ApiService);
    creatProjectReq: AddProjectRequest = {
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    teamMemberIds: [],
    timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  showUserDropdown = false;
  selectedUsers: any[] = [];

  ngOnInit() {
    this.getProjectsApi();
    this.getAllUsers();
  }

  getProjectsApi() {
    this.apiService.getProjects(this.getProjects).subscribe({
      next: (response) => {
        this.allProjects = response
      },
    });
  }

  getAllUsers(){
    this.apiService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
    });
  }

  allowedUser(): boolean {
    const role = localStorage.getItem('Role');
    return role === Roles.Admin || role === Roles.Manager;
  }

   closePopup() {
    this.showPopup = false;
    this.showUserDropdown = false;
  }

  openPopup() {
    this.showPopup = true;
  }

  createProject() {
    this.apiService.addProject(this.creatProjectReq).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.closePopup();
          this.getProjectsApi();
          Swal.fire('Success', response.message, 'success');
        }
      },
    });
  }


  dropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  addUser(user: any) {
      this.creatProjectReq.teamMemberIds.push(user.id);
      this.users.splice(this.users.indexOf(user), 1);
      this.selectedUsers.push(user);
  }


  removeUser(user: any) {
    this.creatProjectReq.teamMemberIds = this.creatProjectReq.teamMemberIds.filter((u) => u !== user.id);
    this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
    this.users.push(user);
  }

  navigate(projectId : number){
    this.routes.navigate(['project-details'],{
      state : { projectId : projectId
      }
    });
  }
  
}
