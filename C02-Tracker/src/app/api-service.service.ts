import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'https://world.openfoodfacts.org/api/v2/search'; 

  constructor(private http: HttpClient) {}

  searchItems(query: string): Observable<any> {
    const url = `${this.apiUrl}?query=${query}`;
    return this.http.get(url);
  }
}
