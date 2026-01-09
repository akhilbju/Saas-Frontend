import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {

  constructor(
    public dialogRef: MatDialogRef<TaskDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

   close(): void {
    this.dialogRef.close();
  }

}
