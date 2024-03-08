import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
  form: FormGroup = new FormGroup({});;

  private fb: FormBuilder;

  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
    this.fb = fb;
  }
  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[^@\s]+$/)]], // Pattern to disallow email format
      password: ['', [Validators.required]]
    });
  }
  signIn() {
    const formData = this.form.value;
    const {username, password} = formData;
    this.authService.signIn(username, password)
      .then(data => {
        console.log('Sign-in successful', data);
        //redirecting user to home page
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.error('Sign-in failed', err);
        alert("The details you entered were incorrect. \nPlease try again.");
      });
  }
}
