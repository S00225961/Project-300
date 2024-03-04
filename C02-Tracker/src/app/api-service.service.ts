import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=';
  searchItems(query: string): Observable<any>{
    const url = `${this.apiUrl + query}&json=true`;
    return this.http.get<any>(url);
  }
}
