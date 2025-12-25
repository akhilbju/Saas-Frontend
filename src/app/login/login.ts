import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Constants } from '../shared/constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData: LoginModel = {
    email: '',
    password: '',
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onLoginSubmit() {
    if(!this.loginData.email || !this.loginData.password){
      Swal.fire('Error', 'Please enter both email and password.', 'error');
      return;
    }
    this.apiService.loginUser(this.loginData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          localStorage.setItem(Constants.AccessToken, response.accessToken);
          localStorage.setItem(Constants.RefreshToken, response.refreshToken);
          localStorage.setItem(Constants.Role, response.role);
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Error', response.message, 'error');
        }
      },
    });
  }
}
