import { Component } from '@angular/core';
import { ApiService } from '../services/api';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../models/login.model';

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

  constructor(private apiService: ApiService) {}

  onLoginSubmit() {
    this.apiService.loginUser(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        if (response.isSuccess) {
          localStorage.setItem('AccessToken', response.accessToken);
          localStorage.setItem('RefreshToken', response.refreshToken);
          alert('Login successful!');
        } else {
          alert('Login failed: ' + response.message);
        }
      },
    });
  }
}
