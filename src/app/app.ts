import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  showSidebar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showSidebar = !this.router.url.includes('login');
    });
  }
}
