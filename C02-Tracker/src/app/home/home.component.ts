import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { catchError, finalize } from 'rxjs/operators';
import { BarcodeService } from '../barcode.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchResults: any;
  scanning: boolean = false;
  showBarcodeProduct: boolean = false;
  allowedFormats: BarcodeFormat[] = [BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,];
  constructor(private apiService: ApiServiceService, private barcodeService: BarcodeService) {}

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
        this.showBarcodeProduct = false;
      }
    );
  }
  ngOnInit(): void {
    
  }

  startScanning(): void {
    this.scanning = true; // Set scanning flag to true
  }

  onScanSuccess(result: string): void {
    this.scanning = false; 
    this.barcodeService.searchItems(result)
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
        this.showBarcodeProduct = true;
      }
    );
    alert(`Barcode scanned successfully: ${result}`);
  }

  onScanError(error: Error): void {
    console.error('Scan error:', error);
  }
  
}
