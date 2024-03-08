import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {
  @Input() jsonData: any = [];
  loadingMessageText: string = "Loading Food Products";
  loadingInterval: any;
  dotCount = 0;
  dotLimit = 15;
  containsBootstrapCards(): boolean {
    // Check if any element in the document contains the Bootstrap card class
    return document.querySelectorAll('.card').length > 0;
  }
  
  ngOnInit() {
    this.loadingInterval = setInterval(() => {
      this.loadingMessageDisplay();
    }, 750);
  }

  ngOnDestroy() {
    clearInterval(this.loadingInterval);
  }

  loadingMessageDisplay() {
    this.dotCount++;
    if (this.dotCount > this.dotLimit) {
      this.dotCount = 0;
      this.loadingMessageText = 'Loading food products';
    } else {
      this.loadingMessageText += '.';
    }
  }
  
}
