import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C02-Tracker';
  performSearch(query: string) {
    // Implement your API request here using the 'query'
    alert(`Search query: ${query}`);
    // You can send an HTTP request to your API using Angular's HttpClient here
  }
}
