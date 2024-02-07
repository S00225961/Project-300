import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';

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

  constructor(private authService: AuthService, private dialog: MatDialog) {}

signUp() {
  this.authService.signUp(this.username, this.password, this.email, this.givenName, this.familyName)
    .then(data => {
      console.log('Sign up successful:', data);
      // After sign-up, open the verification dialog immediately
      this.openVerificationDialog();
    })
    .catch(err => {
      console.error('Sign up error:', err);
    });
}

openVerificationDialog(): void {
  const dialogRef = this.dialog.open(VerificationPopupComponent, {
    width: '250px',
    data: { username: this.username, email: this.email } // Pass username and email for verification
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      // If the user verified their email, sign them in
      this.signInUser();
    } else {
      console.log('Verification cancelled by user');
    }
  });
}

signInUser() {
  this.authService.signIn(this.username, this.password)
    .then(session => {
      console.log('Sign in successful, session:', session);
    })
    .catch(err => {
      console.error('Sign in error:', err);
    });
}
}
