import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://whcrxwkr7h.execute-api.eu-west-1.amazonaws.com/dev'; 

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user`, user);
  }
}
