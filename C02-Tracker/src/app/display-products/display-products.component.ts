import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit, AfterContentChecked {

  @Input() jsonData: any = [];
  loadingMessageText: string = "Loading Food Products";
  loadingInterval: any;
  dotCount = 0;
  dotLimit = 15;
  selectedProducts: Product[] = [];
  cardCount: boolean = false;

  containsBootstrapCards() {
    // Check if any element in the document contains the Bootstrap card class
    if(document.querySelectorAll('.card').length > 1){
      this.cardCount = true;
    }
    else {
      this.cardCount = false;
    }
  }
  ngAfterContentChecked(): void {
    if(!this.cardCount){
      this.containsBootstrapCards();
    }
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
  toggleSelection(event: any, productName: string, c02Value: string): void {
    
    const isChecked = event.target.checked;
    const product = new Product();
    product.name = productName;
    product.c02 = c02Value;
    if (isChecked) {
      this.selectedProducts.push(product)
    } else {
      let productToRemove = this.selectedProducts.find(product => product.name = productName);
      if(productToRemove){
        const index = this.selectedProducts.indexOf(productToRemove);
        this.selectedProducts.splice(index, 1);
      }
    }
  }
  onSubmit(){
    this.selectedProducts.forEach(product => {
      console.log(product.name + " " + product.c02);
    });

  }
}
