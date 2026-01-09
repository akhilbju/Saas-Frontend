import { Component, Inject } from '@angular/core';
import { GetTaskHistory } from '../models/getTaskHistory';
import { ApiService } from '../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  constructor(private api: ApiService, private routes: ActivatedRoute) {}
  taskHistory: GetTaskHistory[] = [];
  taskId: number = 0;
  ngOnInit() {
    this.routes.paramMap.subscribe((params) => {
      const id = params.get('taskId');
      if (!id) {
        console.error('ProjectId missing from parent route');
        return;
      }
      this.taskId = +id;
      this.getTaskHistory();
    });
  }

  getTaskHistory() {
    this.api.getTaskHistory(this.taskId).subscribe({
      next: (value) => {
        this.taskHistory = value;
        this.taskHistory = this.taskHistory
          .slice()
          .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      },
    });
  }

  get formattedHistory() {
    return this.taskHistory.map((h) => ({
      ...h,
      message: `${h.updatedBy} changed status from "${h.fromStatusName}" to "${h.toStatusName}"`,
      time: new Date(h.dateTime),
    }));
  }
}
