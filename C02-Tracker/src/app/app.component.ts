import { Component, OnInit} from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiServiceService) {}

  title = 'C02-Tracker';
  searchResults: any;

  handleSearch(searchTerm: string) {
    // Add logic to handle the search term in the parent component
    //calling api and sending json data to the display-products component
    this.apiService.searchItems(searchTerm)
    .pipe(
      catchError((err) => {
        console.error('Error fetching data:', err);
        throw err; // Rethrow the error after handling it
      }),
      finalize(() => {
        // This block will be executed whether the request is successful or an error occurs
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
