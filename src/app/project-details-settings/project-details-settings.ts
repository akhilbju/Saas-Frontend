import { Component } from '@angular/core';
import { Getprojectstatuses } from '../models/getprojectstatuses';
import { ApiService } from '../services/api';
import { ActivatedRoute } from '@angular/router';
import { CreateProjectStatus } from '../models/createprojectstatuses ';
import { EditProjectStatus } from '../models/editProjectStatus';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-project-details-settings',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './project-details-settings.html',
  styleUrl: './project-details-settings.css',
})
export class ProjectDetailsSettings {
  constructor(private apiservice: ApiService, private routes: ActivatedRoute) {}
  projectDetails: any = {};
  projectId!: number;
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
  ngOnInit(): void {
    this.routes.parent?.paramMap.subscribe((params) => {
      const id = params.get('projectId');
      if (!id) {
        console.error('ProjectId missing from parent route');
        return;
      }
      this.projectId = +id;
      this.createProjectStatus.projectId = this.projectId;
      this.getprojectStatuses();
    });
  }

  getprojectStatuses() {
    this.apiservice.getProjectStatuses(this.projectId).subscribe({
      next: (response) => {
        this.statuses = response;
      },
    });
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
