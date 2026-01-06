import { Component } from '@angular/core';
import { ApiService } from '../services/api';
import { ActivatedRoute } from '@angular/router';
import { Getprojectstatuses } from '../models/getprojectstatuses';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Ticket } from '../models/ticketmodel';
import { CreateTask } from '../models/createTask';
import { GetTask } from '../models/GetTask';

@Component({
  selector: 'app-project-details-board',
  imports: [NgFor, DragDropModule],
  templateUrl: './project-details-board.html',
  styleUrl: './project-details-board.css',
})
export class ProjectDetailsBoard {
  constructor(private apiService: ApiService, private routes: ActivatedRoute) {}
  projectId: number = 0;
  statuses: Getprojectstatuses[] = [];
  sortedStatuses: any[] = [];
  createTaskRequest: CreateTask = {
    assignedTo: [],
    description: '',
    duration: 0,
    name: '',
    projectId: 0,
    type: '',
  };
  tasks: GetTask[] = [];

  tasksByStatus: Record<string, GetTask[]> = {};

  ngOnInit(): void {
    this.routes.parent?.paramMap.subscribe((params) => {
      const id = params.get('projectId');
      if (!id) {
        console.error('ProjectId missing from parent route');
        return;
      }
      this.projectId = +id;
    });
    this.getStatuses();
    this.GetTask();
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

  CreateTask(): void {
    this.apiService.createTask(this.createTaskRequest).subscribe({
      next: (response) => {
        for (const task of this.tasks) {
          if (!this.tasksByStatus[task.status]) {
            this.tasksByStatus[task.status] = [];
          }
          this.tasksByStatus[task.status].push(task);
        }
      },
    });
  }

  GetTask(): void {
    this.apiService.getallTask(this.projectId).subscribe({
      next: (response) => {
        this.tasks = response;
      },
    });
  }
}
