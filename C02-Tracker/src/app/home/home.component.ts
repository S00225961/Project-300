import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchResults: any;
  constructor(private apiService: ApiServiceService) {}

  handleSearch(searchTerm: string) {
    this.apiService.searchItems(searchTerm)
    .pipe(
      catchError((err) => {
        console.error('Error fetching data:', err);
        return [];
      }),
      finalize(() => {
        console.log('Request completed.');
      })
    )
    .subscribe(
      (result) => {
        this.searchResults = result;
      }
    );
  }

  ngOnInit(): void {
   
  }
}
