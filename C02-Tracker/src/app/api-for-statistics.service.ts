import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiForStatisticsService {
  private apiUrl = 'https://whcrxwkr7h.execute-api.eu-west-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }
  listUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }
  //get userID by username
  //get electricity records by user id
  //get food products by user id
  //get transport details by user id
  
  //post electricity records by user id
  //post food products by user id
  //post transport details by user id
  
}
