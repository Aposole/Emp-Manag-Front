import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;  // Using non-null assertion
  password!: string;  // Using non-null assertion

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);  // Store the token
        this.router.navigate(['/main']);  // Navigate to the main component
      },
      error: (e) => console.error(e)
    });
  }
}
