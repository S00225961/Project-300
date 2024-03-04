import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  givenName: string = '';
  familyName: string = '';

  // Add properties to manage the user state
  private tempUserData: any = null;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router // Inject the Router
  ) {}

  // Method to sign up a new user
  signUp() {
    this.authService.signUp(this.username, this.password, this.email, this.givenName, this.familyName)
      .then(data => {
        console.log('Sign up successful:', data);
        this.tempUserData = { username: this.username, password: this.password };
        this.openVerificationDialog();
      })
      .catch(err => {
        console.error('Sign up error:', err);
      });
  }

  // Method to open the verification dialog
  openVerificationDialog(): void {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      width: '250px',
      data: { username: this.username } // Pass the username to the dialog
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
          this.router.navigate(['/dashboard']); // Navigate to the dashboard
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
