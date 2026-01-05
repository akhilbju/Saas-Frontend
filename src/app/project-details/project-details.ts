import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-details',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {
  constructor(private apiservice: ApiService, private routes: Router) {}
  projectDetails: any = {};
  projectId = history.state.projectId;

  ngOnInit() {
    this.getprojectDetails();
  }

  getprojectDetails() {
    this.apiservice.getProjectDetails(this.projectId).subscribe({
      next: (response) => {
        this.projectDetails = response;
      },
    });
  }
}
