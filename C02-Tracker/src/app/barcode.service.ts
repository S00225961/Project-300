import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://world.openfoodfacts.org/api/v0/product/';
  searchItems(query: string): Observable<any>{
    const url = `${this.apiUrl + query}&json=true`;
    return this.http.get<any>(url);
  }
}
