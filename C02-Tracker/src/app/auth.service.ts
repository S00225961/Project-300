import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize} from 'rxjs';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { ApiForStatisticsService } from './api-for-statistics.service';

const poolData = {
  UserPoolId: 'eu-west-1_RrXVPO1LU',
  ClientId: '5j2144t3b5fsbin0mvigl0ft51',
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userID: any;
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private apiForStats: ApiForStatisticsService) {
    const sessionData = localStorage.getItem('userSession');
    this.isAuthenticatedSubject.next(!!sessionData);
  }

  signUp(username: string, password: string, email: string, givenName: string, familyName: string): Promise<any> {
    const attributeList: CognitoUserAttribute[] = [];
    
    const emailAttribute = new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    });
    const givenNameAttribute = new CognitoUserAttribute({
      Name: 'given_name',
      Value: givenName,
    });
    const familyNameAttribute = new CognitoUserAttribute({
      Name: 'family_name',
      Value: familyName,
    });
    
    attributeList.push(emailAttribute, givenNameAttribute, familyNameAttribute);
    return new Promise((resolve, reject) => {
        userPool.signUp(username, password, attributeList, [], (err, result) => { 
            if (err) {
                reject(err);
            } else {
                // After successful Cognito sign up, post the user data to your backend
                this.http.post('http://localhost:3000/api/users', { username, email, password, givenName, familyName }).subscribe({
                    next: (backendResult) => resolve({ cognitoResult: result, backendResult }),
                    error: (backendError) => reject(backendError)
                });
            }
        });
    });
}


  
  // Method to verify a user's email with a given code
  verifyUserEmail(username: string, code: string): Promise<any> {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
  
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result); 
        }
      });
    });
  }
  
  // Method to sign in a user
  async signIn(username: string, password: string): Promise<any> {
    this.apiForStats.getUserIDByUsername(username)
    .pipe(
      catchError((err) => {
        console.error('Error fetching data:', err);
        return [];
      }),
      finalize(() => {
        console.log('Request completed.');
      })
    )
    .subscribe(
      (result) => {
        this.userID = result;
      }
    );
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
  
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session: CognitoUserSession) => {
          console.log('Authentication successful', session);
          this.setAuthenticated(true);
          localStorage.setItem('userSession', JSON.stringify({
            username: username,
            idToken: session.getIdToken().getJwtToken(),
            accessToken: session.getAccessToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken()
          }));
          resolve(session);
        },
        onFailure: (error) => {
          console.error('Authentication failed', error);
          reject(error);
        }
      });
    });

    // return new Promise((resolve, reject) => {
    //   cognitoUser.authenticateUser(authenticationDetails, {
    //     onSuccess: (result) => {
    //       console.log('Authentication successful', result);
    //       this.setAuthenticated(true);
    //       resolve(result); // User sign-in was successful
    //     },
    //     onFailure: (err) => {
    //       console.error('Authentication failed', err);
    //       reject(err);
    //     },
    //   });
    // });
  }

  // Method to sign out the current user
  signOut(): Promise<void> {
    const cognitoUser = userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser) {
        cognitoUser.signOut();
        localStorage.removeItem('userSession');
        resolve();
        this.setAuthenticated(false);
      } else {
        reject(new Error('No user to sign out.'));
      }
    });
  }

  // Method to update authentication status
  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  // Method to check authentication status
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  
}
