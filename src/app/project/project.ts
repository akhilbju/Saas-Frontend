import { Component, inject } from '@angular/core';
import { GetProjectRequest } from '../models/getproject.request';
import { ApiService } from '../services/api';
import { NgFor, NgIf } from '@angular/common';
import { Roles } from '../shared/Roles';
import { AddProjectRequest } from '../models/addproject.request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  getProjects: GetProjectRequest = {
    projectName: '',
    rowsPerPage: 10,
    pageNumber: 1,
  };

  users: any = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
    { id: 5, name: 'Ethan' },
  ];
  showPopup: boolean = false;
  projects: any[] = [];
  apiService = inject(ApiService);
    creatProjectReq: AddProjectRequest = {
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    teamMemberIds: [],
  };

  showUserDropdown = false;
  selectedUsers: any[] = [];

  ngOnInit() {
    this.apiService.getProjects(this.getProjects).subscribe({
      next: (response) => {
        if (response.count > 0) {
          this.projects = response.projects;
        }
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
          console.log('Project created successfully');
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
}
