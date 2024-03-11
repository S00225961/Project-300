import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';
import { Router } from '@angular/router'; // Import Router
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // Add properties to manage the user state
  private tempUserData: any = null;
  form: FormGroup = new FormGroup({});
  private fb: FormBuilder;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    fb: FormBuilder
  ) {this.fb = fb}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required,]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      givenName: ['', [Validators.required]],
      familyName: ['', [Validators.required]]
    });
  }

  // Method to sign up a new user
  signUp() {
    const formData = this.form.value;
    const {username, password, email, givenName, familyName} = formData;

    this.authService.signUp(username, password, email, givenName, familyName)
      .then(data => {
        console.log('Sign up successful:', data);
        this.tempUserData = { username: username, password: password };
        this.openVerificationDialog();
      })
      .catch(err => {
        console.error('Sign up error:', err);
      });
  }

  // Method to open the verification dialog
  openVerificationDialog(): void {
    const username = this.form.value.username;
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      width: '250px',
      data: { username: username } // Pass the username to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.signInUser();
      } else {
        console.log('Verification cancelled by user');
        this.tempUserData = null;
      }
    });
  }

  // Method to sign in the user after verification
  signInUser() {
    if (this.tempUserData) {
      this.authService.signIn(this.tempUserData.username, this.tempUserData.password)
        .then(session => {
          console.log('Sign in successful, session:', session);
          this.tempUserData = null;
          this.router.navigate(['/home']); 
        })
        .catch(err => {
          console.error('Sign in error:', err);
          this.tempUserData = null;
        });
    } else {
      console.error('No user data available for sign-in.');
    }
  }
}
