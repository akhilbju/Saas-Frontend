import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
 <div class="loader-overlay" *ngIf="loader.loading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styleUrl: './loader.css',
})
export class LoaderComponent {
    constructor(public loader: LoaderService) {}
}
