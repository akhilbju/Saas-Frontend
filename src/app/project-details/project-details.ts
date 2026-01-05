import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';
import { Route, Router } from '@angular/router';
import { Getprojectstatuses } from '../models/getprojectstatuses';
import { CreateProjectStatus } from '../models/createprojectstatuses ';
import { NgIf, NgFor } from '@angular/common';
import { EditProjectStatus } from '../models/editProjectStatus';

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

  editProjectStatus: EditProjectStatus = {
    isDefault: false,
    position: 0,
    StatusId: 0,
    status: '',
  };

  newStatus: Getprojectstatuses = {
    isDefault: this.createProjectStatus.isDefault,
    position: this.createProjectStatus.position,
    statusId: Math.max.length,
    status: this.createProjectStatus.status,
  };
  addsettingstab: boolean = false;
  editsettingstab: boolean = false;
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
        this.getprojectStatuses();
      },
    });
    this.statuses = [...this.statuses, this.newStatus];
    this.addsettingstab = false;
    this.getprojectStatuses();

    this.createProjectStatus = {
      isDefault: false,
      position: 0,
      projectId: this.projectId,
      status: '',
    };
  }

  checkActiveTab(tab: String) {
    if (this.activeTab == tab) return true;
    return false;
  }

  deleteStatus(statusId: number) {
    this.apiservice.deleteProjectStatus(statusId).subscribe({
      next: (response) => {
        this.getprojectStatuses();
      },
    });
  }

  editStatus(status: Getprojectstatuses) {
    this.editsettingstab = true;
    this.editProjectStatus.StatusId = status.statusId;
    this.editProjectStatus.isDefault = status.isDefault;
    this.editProjectStatus.position = status.position;
    this.editProjectStatus.status = status.status;
  }

  editStatusApi() {
    this.apiservice.editProjectStatus(this.editProjectStatus).subscribe({
      next: (response) => {
        this.getprojectStatuses();
        this.editsettingstab = false;
      },
    });
  }
}
