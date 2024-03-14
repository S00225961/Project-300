import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiForStatisticsService {
  private apiUrl = 'https://whcrxwkr7h.execute-api.eu-west-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }
  // listUsers(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/user`);
  // }
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
  postElectricityRecordsByUserID(userID: string, data: any){
    this.http.post(`${this.apiUrl}/electricity/${userID}`, data);
  }
  //post food products by user id
  postFoodProdutsByUserID(userID: string, data: any){
    this.http.post(`${this.apiUrl}/product/${userID}`, data);
  }
  //post transport details by user id
  postTransportByUserID(userID: string, data: any){
    this.http.post(`${this.apiUrl}/commute/${userID}`, data);
  }
  
}
