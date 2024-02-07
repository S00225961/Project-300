import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verification-popup',
  templateUrl: './verification-popup.component.html',
  styleUrls: ['./verification-popup.component.css']
})
export class VerificationPopupComponent {
  verificationCode: string = '';
  
  @Output() verificationComplete = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  // verify the code entered by the user
  verifyCode() {
    // Call the verification method from AuthService
    this.authService.verifyUserEmail(this.verificationCode).then(() => {
      this.verificationComplete.emit(true);
      console.log('Verification successful');
    }).catch((error: any) => { 
      console.error('Verification failed', error);
    });
  }
  onCancelClick() {
  }
}
