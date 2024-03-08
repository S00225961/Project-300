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
}
