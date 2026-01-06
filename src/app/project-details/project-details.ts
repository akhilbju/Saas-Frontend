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
import { ProjectApiModel } from '../models/getprojects.response';
import { ProjectContextService } from '../services/project-context';

@Component({
  selector: 'app-project-details',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {
  constructor(private apiservice: ApiService, private routes: ActivatedRoute,private context:ProjectContextService) {}
  projectDetails: ProjectApiModel = {
    id :0,
    description:'',
    isCompleted:false,
    name:'',
    teamMembers:[],
  };
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
    this.context.setProject(this.projectDetails);
  }

  getprojectDetails() {
    this.apiservice.getProjectDetails(this.projectId).subscribe({
      next: (response) => {
        this.projectDetails.teamMembers = response.teamMembers;
        this.projectDetails.description = response.description;
        this.projectDetails.id = response.id;
        this.projectDetails.name = response.name;
        this.projectDetails.isCompleted = response.isCompleted;
      },
    });
  }
}
