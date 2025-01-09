import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  adminData = { name: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.adminData).subscribe({
      next: (res) => {
        console.log('Registration successful');
        this.router.navigate(['/login']); // Optionally redirect to login after registration
      },
      error: (e) => console.error(e)
    });
  }
}
