import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { ApiService } from '../services/api';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Getprojectstatuses } from '../models/getprojectstatuses';
import {
  CdkDragDrop,
  CdkDragMove,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CreateTask } from '../models/createTask';
import { GetTask } from '../models/GetTask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectContextService } from '../services/project-context';
import { UpdateTaskRequest } from '../models/updateTaskRequest';

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
    private context: ProjectContextService,
    private router: Router
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
  connectedDropLists: string[] = [];

  tasksByStatus: Record<number, any[]> = {};
  updatetaskRequest: UpdateTaskRequest = {
    assignees: [],
    description: '',
    duration: null,
    status: null,
    taskId: 0,
    taskName: '',
  };
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
  }

  getStatuses(): void {
    this.apiService.getProjectStatuses(this.projectId).subscribe({
      next: (response) => {
        this.statuses = response;
        this.orderItem();
        this.setConnectedDropLists();
        this.GetTask();
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

  onDrop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const ticket = event.item.data;
    const targetStatusId = Number(event.container.id.replace('status-', ''));
    this.updatetaskRequest.status = targetStatusId;
    this.updatetaskRequest.taskId = ticket.taskId;
    this.updateTask();
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
        this.setTaskBasedOnStatus();
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
      this.projectDetails.teamMembers.splice(this.projectDetails.teamMembers.indexOf(user), 1);
    }
  }

  removeUser(user: any) {
    this.selectedUsers = this.selectedUsers.filter((u) => u.id !== user.id);
    this.projectDetails.teamMembers.push(user);
  }

  setConnectedDropLists(): void {
    this.connectedDropLists = this.sortedStatuses.map((s) => 'status-' + s.statusId);
  }

  openTaskDetails(taskId: any) {
    this.router.navigate(['task-details', taskId]);
  }
  updateTask(): void {
    this.apiService.updateTask(this.updatetaskRequest).subscribe({
      next: (response) => {
        this.updatetaskRequest = {
          assignees: [],
          description: '',
          duration: null,
          status: null,
          taskId: 0,
          taskName: '',
        };
      },
    });
  }
  deleteTask(taskId: number) {
    this.apiService.deleteTaksk(taskId).subscribe({
      next: (respone) => {
        this.GetTask();
      },
    });
  }

  @ViewChild('boardWrapper', { static: true })
  boardWrapper!: ElementRef<HTMLElement>;

  onDragMoved(event: CdkDragMove) {
    const container = this.boardWrapper.nativeElement;
    const rect = container.getBoundingClientRect();

    const threshold = 70;
    const speed = 18;

    if (event.pointerPosition.x > rect.right - threshold) {
      container.scrollLeft += speed;
    } else if (event.pointerPosition.x < rect.left + threshold) {
      container.scrollLeft -= speed;
    }
  }
}
