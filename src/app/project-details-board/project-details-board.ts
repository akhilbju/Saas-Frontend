import { Component, NgModule } from '@angular/core';
import { ApiService } from '../services/api';
import { ActivatedRoute } from '@angular/router';
import { Getprojectstatuses } from '../models/getprojectstatuses';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CreateTask } from '../models/createTask';
import { GetTask } from '../models/GetTask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectContextService } from '../services/project-context';

@Component({
  selector: 'app-project-details-board',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './project-details-board.html',
  styleUrl: './project-details-board.css',
})
export class ProjectDetailsBoard {
  constructor(
    private apiService: ApiService,
    private routes: ActivatedRoute,
    private context: ProjectContextService
  ) {}
  projectId: number = 0;
  statuses: Getprojectstatuses[] = [];
  sortedStatuses: any[] = [];
  createTaskRequest: CreateTask = {
    assignedTo: [],
    description: '',
    duration: 0,
    name: '',
    projectId: this.projectId,
    type: '',
  };
  createTaskPopup: boolean = false;
  showUserDropdown: boolean = false;
  tasks: GetTask[] = [];
  projectDetails: any = {
    id: 0,
    description: '',
    isCompleted: false,
    name: '',
    teamMembers: [],
  };

  tasksByStatus: Record<string, any[]> = {};

  ngOnInit(): void {
    this.routes.parent?.paramMap.subscribe((params) => {
      const id = params.get('projectId');
      if (!id) {
        console.error('ProjectId missing from parent route');
        return;
      }
      this.projectId = +id;
      this.createTaskRequest.projectId = this.projectId;
      this.projectDetails = this.context.getProject();
    });
    this.getStatuses();
    this.GetTask();
    this.setTaskBasedOnStatus();
  }

  getStatuses(): void {
    this.apiService.getProjectStatuses(this.projectId).subscribe({
      next: (response) => {
        this.statuses = response;
        this.orderItem();
      },
    });
  }

  orderItem(): void {
    this.sortedStatuses = Object.entries(this.statuses)
      .filter(([, value]) => typeof value === 'object' && 'position' in value)
      .map(([key, value]) => ({
        key,
        ...value,
      }))
      .sort((a, b) => a.position - b.position);
  }

  onDrop(event: CdkDragDrop<GetTask[]>, newStatus: number) {
    if (event.previousContainer === event.container) {
      // Same column → reorder
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Different column → move ticket
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedTicket = event.container.data[event.currentIndex];
      movedTicket.status = newStatus;
    }
  }

  createTask(): void {
    this.createTaskRequest.assignedTo = this.selectedUsers.map((user) => user.id);
    this.apiService.createTask(this.createTaskRequest).subscribe({
      next: (response) => {
        this.createTaskPopup = false;
        this.createTaskRequest = {
          assignedTo: [],
          description: '',
          duration: 0,
          name: '',
          projectId: this.projectId,
          type: '',
        };
      },
    });
  }

  initializeTaskMap(): void {
    this.tasksByStatus = {};

    for (const status of this.sortedStatuses) {
      this.tasksByStatus[status.statusId] = [];
    }
  }
  setTaskBasedOnStatus(): void {
    this.initializeTaskMap();

    for (const task of this.tasks) {
      if (this.tasksByStatus[task.status] !== undefined) {
        this.tasksByStatus[task.status].push(task);
      }
    }
  }
  GetTask(): void {
    this.apiService.getallTask(this.projectId).subscribe({
      next: (response) => {
        this.tasks = response;
      },
    });
  }

  selectedUsers: any[] = [];

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  addUser(user: any) {
    if (!this.selectedUsers.find((u) => u.id === user.id)) {
      this.selectedUsers.push(user);
    }
  }

  removeUser(user: any) {
    this.selectedUsers = this.selectedUsers.filter((u) => u.id !== user.id);
    this.projectDetails.teamMembers;
  }
}
