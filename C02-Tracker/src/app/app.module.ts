import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { CommuteTrackerComponent } from './commute-tracker/commute-tracker.component';
import { ElectricityTrackerComponent } from './electricity-tracker/electricity-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    DisplayProductsComponent,
    CommuteTrackerComponent,
    ElectricityTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
