import { Component, Input, OnInit, AfterContentChecked, QueryList, ViewChildren, ElementRef, ViewChild} from '@angular/core';
import { Product } from '../models/product.model';
import { AuthService } from '../auth.service';
import { ApiForStatisticsService } from '../api-for-statistics.service';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit, AfterContentChecked {
  @ViewChildren('productCards') productCardsElements: QueryList<ElementRef> = new QueryList<ElementRef>;
  @ViewChild('barcodeProduct') barcodeProduct: any;
  @Input() jsonData: any = [];
  @Input() showBarcodeProduct: any;
  loadingMessageText: string = "Loading Food Products";
  loadingInterval: any;
  dotCount = 0;
  dotLimit = 15;
  selectedProducts: Product[] = [];
  cardCount: boolean = false;
  userID: any;
  constructor(private authService: AuthService, private apiForStats: ApiForStatisticsService){}

  containsBootstrapCards() {
    //Check if any element in the document contains the Bootstrap card class
    if(this.productCardsElements.length > 0){
      this.cardCount = true;
    }
    else {
      this.cardCount = false;
    }

  }
  ngAfterContentChecked(): void {
    this.containsBootstrapCards();
  }
  ngOnInit() {
    this.userID = this.authService.userID;
    console.log("userID: " + this.userID);
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
  toggleSelection(event: any, productName: string, c02Value: string, imageURL: string): void {
    
    const isChecked = event.target.checked;
    const product = new Product();
    product.name = productName;
    product.c02 = c02Value;
    product.imageURL = imageURL;
    if (isChecked) {
      this.selectedProducts.push(product)
    } else {
      let productToRemove = this.selectedProducts.find(product => product.name == productName);
      if(productToRemove){
        const index = this.selectedProducts.indexOf(productToRemove);
        this.selectedProducts.splice(index, 1);
      }
    }
  }
  onSubmit(){
    this.containsBootstrapCards();
    this.selectedProducts.forEach(product => {
      console.log('SUBMIT CLICKED!');
      console.log(product.name + " " + product.c02);
      const event = {
        userID: this.userID,
        productName: product.name,
        category: null,
        co2EmissionsPerUnit: product.c02,
        imageURL: product.imageURL
      };
      //post to db
      const eventDataJson = JSON.stringify(event);
      console.log(eventDataJson);
      this.apiForStats.postFoodProdutsByUserID(eventDataJson)
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
          console.log('Data sent successfully:', result);
        }
      );
    });

  }
}
