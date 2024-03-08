import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  private fb: FormBuilder;
  searchQuery: string = "";
  constructor(fb: FormBuilder){
    this.fb = fb;
  }

  @Output() search: EventEmitter<string> = new EventEmitter();
ngOnInit(): void {
  this.form = this.fb.group({
    searchInput: ['']
  });
}
  onSearch() {
    const formData = this.form.value;
    this.searchQuery = formData.searchInput;
    this.search.emit(this.searchQuery); // Emit the search query to the parent component
  }
}
