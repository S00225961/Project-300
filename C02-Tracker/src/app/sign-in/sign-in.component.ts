import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signIn() {
    this.authService.signIn(this.username, this.password)
      .then(data => {
        console.log('Sign-in successful', data);
        //redirecting user to home page
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.error('Sign-in failed', err);
      });
  }
}
