import { Injectable } from '@angular/core';
import { 
  CognitoUserPool, 
  AuthenticationDetails, 
  CognitoUser, 
  CognitoUserAttribute 
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

  signUp(username: string, password: string, email: string, givenName: string, familyName: string) {
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
      userPool.signUp(username, password, attributeList, [], (err, result) => { // Changed null to []
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  verifyUserEmail(code: string): Promise<any> {
    const cognitoUser = userPool.getCurrentUser();
    
    if (!cognitoUser) {
      return Promise.reject(new Error('No user available.'));
    }
    
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err: Error | null, session: any) => { 
        if (err || !session.isValid()) {
          reject(err ? err : new Error('Session is invalid.'));
          return;
        }
        
        cognitoUser.confirmRegistration(code, true, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }
  


  
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
          resolve(result);
        },
        onFailure: (err) => {
          console.error('Authentication failed', err);
          reject(err);
        },
      });
    });
  }
}
