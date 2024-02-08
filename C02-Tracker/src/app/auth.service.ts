import { Injectable } from '@angular/core';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession, 
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_RrXVPO1LU',
  ClientId: '5j2144t3b5fsbin0mvigl0ft51',
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Method to sign up a new user with attributes
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
          resolve(result); // User registration was successful
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
  signIn(username: string, password: string): Promise<any> {
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
        onSuccess: (result) => {
          console.log('Authentication successful', result);
          resolve(result); // User sign-in was successful
        },
        onFailure: (err) => {
          console.error('Authentication failed', err);
          reject(err);
        },
      });
    });
  }

  // Method to sign out the current user
  signOut(): Promise<void> {
    const cognitoUser = userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser) {
        cognitoUser.signOut();
        resolve();
      } else {
        reject(new Error('No user to sign out.'));
      }
    });
  }
}
