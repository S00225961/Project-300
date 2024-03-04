import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = "";

  @Output() search: EventEmitter<string> = new EventEmitter();

  onSearch() {
    this.search.emit(this.searchQuery); // Emit the search query to the parent component
  }
}
