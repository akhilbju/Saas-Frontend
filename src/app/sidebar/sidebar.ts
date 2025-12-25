import { Component } from '@angular/core';
import { Constants } from '../shared/constant';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'] 
})
export class Sidebar {
  
  logout() {
    localStorage.removeItem(Constants.AccessToken);
    localStorage.removeItem(Constants.RefreshToken);
    localStorage.removeItem(Constants.Role);
    window.location.href = '/login';
  }
}
