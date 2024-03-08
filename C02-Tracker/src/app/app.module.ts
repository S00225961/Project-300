import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { CommuteTrackerComponent } from './commute-tracker/commute-tracker.component';
import { ElectricityTrackerComponent } from './electricity-tracker/electricity-tracker.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignInComponent } from './sign-in/sign-in.component'; 
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerificationPopupComponent } from './verification-popup/verification-popup.component'; 


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    DisplayProductsComponent,
    CommuteTrackerComponent,
    ElectricityTrackerComponent,
    HomeComponent,
    SignInComponent, 
    SignUpComponent,
    VerificationPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
