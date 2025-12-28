import { Component, inject } from '@angular/core';
import { GetProjectRequest } from '../models/getproject.request';
import { ApiService } from '../services/api';
import { NgFor, NgIf } from '@angular/common';
import { Roles } from '../shared/Roles';

@Component({
  selector: 'app-project',
  imports: [NgFor,NgIf],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  getProjects: GetProjectRequest = {
    projectName: '',
    rowsPerPage: 10,
    pageNumber: 1,
  };
  projects: any[] = [];
  apiService = inject(ApiService);
  ngOnInit() {
    this.apiService.getProjects(this.getProjects).subscribe({
      next: (response) => {
        if (response.count > 0) {
          this.projects = response.projects;
        }
      }
    });
  }
  allowedUser() : boolean {
    const role = localStorage.getItem('Role');
    return role === Roles.Admin || role === Roles.Manager;
  }
}
