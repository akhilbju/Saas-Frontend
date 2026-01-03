import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';
import { Route, Router } from '@angular/router';
import { Getprojectstatuses } from '../models/getprojectstatuses';
import { CreateProjectStatus } from '../models/createprojectstatuses ';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {
  constructor(private apiservice: ApiService, private routes: Router) {}
  projectId = history.state.projectId;
  projectDetails: any = {};
  statuses: Getprojectstatuses[] = [];

  createProjectStatus: CreateProjectStatus = {
    isDefault: false,
    position: 0,
    projectId: this.projectId,
    status: '',
  };

  addsettingstab: boolean = false;
  ngOnInit() {
    this.getprojectDetails();
    this.getprojectStatuses();
  }

  getprojectDetails() {
    this.apiservice.getProjectDetails(this.projectId).subscribe({
      next: (response) => {
        this.projectDetails = response;
      },
    });
  }
  getprojectStatuses() {
    this.apiservice.getProjectStatuses(this.projectId).subscribe({
      next: (response) => {
        this.statuses = response;
      },
    });
  }
  activeTab: 'settings' | 'board' | 'timelogs' | 'others' = 'board';

  setActive(tab: 'settings' | 'board' | 'timelogs' | 'others') {
    this.activeTab = tab;
  }
  CreateStatus() {
    if (this.createProjectStatus.status == '') return;
    this.apiservice.createProjectStatus(this.createProjectStatus).subscribe({
      next: (response) => {
        console.log(response);
        this.getprojectStatuses();
      },
    });
    this.addsettingstab = false;
    this.getprojectStatuses();
  }

  checkActiveTab(tab: String) {
    if (this.activeTab == tab) return true;
    return false;
  }
}
