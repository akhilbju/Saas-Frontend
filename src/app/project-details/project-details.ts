import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api';
import {
  ActivatedRoute,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-project-details',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {
  constructor(private apiservice: ApiService, private routes: ActivatedRoute) {}
  projectDetails: any = {};
  projectId = history.state.projectId;

  ngOnInit() {
    this.routes.paramMap?.subscribe((params) => {
      const id = params.get('projectId');
      if (!id) {
        console.error('ProjectId missing from parent route');
        return;
      }
      this.projectId = +id;
    });
    this.getprojectDetails();
  }

  getprojectDetails() {
    this.apiservice.getProjectDetails(this.projectId).subscribe({
      next: (response) => {
        this.projectDetails = response;
        console.log('projectname', this.projectDetails.name);
      },
    });
  }
}
