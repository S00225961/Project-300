import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiForStatisticsService {
  private apiUrl = 'https://whcrxwkr7h.execute-api.eu-west-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }
  
  //get userID by username
  getUserIDByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${username}`);
  }
  //get electricity records by user id
  getElectricityRecordsByUserID(userID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/electricity/${userID}`);
  }
  //get food products by user id
  getFoodProductsByUserID(userID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${userID}`);
  }
  //get transport details by user id
  getTransportByUserID(userID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/commute/${userID}`);
  }
  //post electricity records by user id
  postElectricityRecordsByUserID(data: any){
    return this.http.post(`${this.apiUrl}/electricity/`, data);
  }
  //post food products by user id
  postFoodProdutsByUserID(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/product/`, data);
  }
  postTransportByUserID(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/commute/`, data);
  }
  
}
