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
  
  ticketsByStatus: Record<string, Ticket[]> = {
    BACKLOG: [{ id: 1, title: 'Setup project', status: 'Todo' }],
    TODO: [{ id: 2, title: 'Create UI', status: 'Todo' }],
    IN_PROGRESS: [{ id: 3, title: 'API integration', status: 'Hold' }],
  };

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

  onDrop(event: CdkDragDrop<Ticket[]>, newStatus: string) {
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
}
