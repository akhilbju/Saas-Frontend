import { Component, Inject } from '@angular/core';
import { GetTaskHistory } from '../models/getTaskHistory';
import { ApiService } from '../services/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  constructor(private api: ApiService, private routes: ActivatedRoute) {}
  taskHistory: GetTaskHistory = {
    dateTime: null,
    fromStatusId: null,
    fromStatusName: '',
    toStatusId: null,
    toStatusName: '',
    updatedBy: '',
  };
  taskId: number = 0;
  ngOnInit() {
    this.routes.paramMap.subscribe((params) => {
      const id = params.get('taskId');
      if (!id) {
        console.error('ProjectId missing from parent route');
        return;
      }
      this.taskId = +id;
      this.getTaskHistory()
    });
  }

  getTaskHistory() {
    this.api.getTaskHistory(this.taskId).subscribe({
      next: (value) => {
        this.taskHistory = value;
      },
    });
  }
}
