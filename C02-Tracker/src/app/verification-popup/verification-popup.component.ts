import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verification-popup',
  templateUrl: './verification-popup.component.html',
  styleUrls: ['./verification-popup.component.css']
})
export class VerificationPopupComponent {
  verificationCode: string = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<VerificationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onInputChange(event: any): void {
    const value = event.target.value;
    if (value !== null) {
      this.verificationCode = value;
      console.log('User input:', this.verificationCode);
    }
  }
  // Method to verify the code entered by the user
  verifyCode() {
    this.authService.verifyUserEmail(this.data.username, this.verificationCode).then(() => {
      //this.verificationComplete.emit(true);
      console.log('Verification successful');
      this.dialogRef.close(true); // Close the dialog when the verification is successful
    }).catch((error: any) => {
      console.error('Verification failed', error);
    });
  }

  // Method to handle cancel click if necessary
  onCancelClick() {
    this.dialogRef.close(); // Close the dialog when the user clicks cancel
  }
}
