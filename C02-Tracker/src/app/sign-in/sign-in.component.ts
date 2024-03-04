import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  signIn() {
    this.authService.signIn(this.username, this.password)
      .then(data => {
        console.log('Sign-in successful', data);
      })
      .catch(err => {
        console.error('Sign-in failed', err);
      });
  }
}
