import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiForStatisticsService } from '../api-for-statistics.service';
import { catchError, finalize } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-electricity-tracker',
  templateUrl: './electricity-tracker.component.html',
  styleUrls: ['./electricity-tracker.component.css']
})
export class ElectricityTrackerComponent implements OnInit {
  electricityForm: FormGroup = new FormGroup({});
  userID: any;
  userData: any;
  electricitySource: string = "";
  co2Produced: number | null = null;

  co2ConversionFactor: number | null = null;

  electricitySources = [
    { value: 'coal', label: 'Coal' },
    { value: 'naturalGas', label: 'Natural Gas' },
    { value: 'oil', label: 'Oil' },
    { value: 'solar', label: 'Solar'},
    { value: 'nuclear', label: 'Nuclear'},
    { value: 'hydro', label: 'Hydro'},
    { value: 'wind', label: 'Wind'}
  ];

  constructor(private fb: FormBuilder, private apiForStats: ApiForStatisticsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
    const localStorageData = localStorage.getItem('getUserIDByUsername');
    if(localStorageData){
      this.userData = JSON.parse(localStorageData);
      this.userID = this.userData.userID;
      console.log(this.userID);
    }
  }

  private initForm(): void {
    this.electricityForm = this.fb.group({
      usageInKwh: ['', [Validators.required, Validators.min(0)]],
      electricitySource: ['', [Validators.required]]
    });
  }

  calculateCO2(): number {
    if (this.electricityForm.valid) {
      const formData = this.electricityForm.value;
      const { usageInKwh } = formData;
      switch(this.electricitySource)
      {
        case 'coal':
          this.co2ConversionFactor = 0.9;
          break;
        case 'naturalGas':
          this.co2ConversionFactor = 0.5;
          break;
        case 'oil':
          this.co2ConversionFactor = 0.65;
          break;
        case 'solar':
          this.co2ConversionFactor = 0.058;
          break;
        case 'nuclear':
          this.co2ConversionFactor = 0.005;
          break;
        case 'hydro':
          this.co2ConversionFactor = 0.02;
          break;
        case 'wind':
          this.co2ConversionFactor = 0.005;
          break;
        default:
          this.co2ConversionFactor = 1;
          break;
      }

      this.co2Produced = usageInKwh *  this.co2ConversionFactor;

      return this.co2Produced;
    }

    return -1;
  }
  onSelectionChange(event: any) {
    console.log(event); 
    this.electricitySource = event;
  }
  onSubmit(): void {
    this.co2Produced = this.calculateCO2();

    if (this.co2Produced !== -1) {
      console.log(`CO2 produced: ${this.co2Produced} kg`);
      console.log("userID: " + this.userID);
      console.log("source: " + this.electricitySource);
      const event = {
        userID: this.userID,
        usageInKwh: this.electricityForm.value.usageInKwh,
        source: this.electricitySource,
        co2Emissions: this.co2Produced,
      };
      //post to db
      const eventDataJson = JSON.stringify(event);
      console.log(eventDataJson);
      this.apiForStats.postElectricityRecordsByUserID(eventDataJson)
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
    } else {
      console.error('Invalid input. Please check your values.');
    }
  }

}
