import { Component } from '@angular/core';
import { ApiService } from '../services/api';
import { FormsModule } from '@angular/forms'; // 1. Import this

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private apiService: ApiService) {}

  onLoginSubmit() {
    this.apiService.loginUser(this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        if (response.IsSuccess) {
          alert(response.Message);
        }
      },
    });
  }
}
