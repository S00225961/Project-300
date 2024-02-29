import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-electricity-tracker',
  templateUrl: './electricity-tracker.component.html',
  styleUrls: ['./electricity-tracker.component.css']
})
export class ElectricityTrackerComponent implements OnInit {
  electricityForm: FormGroup = new FormGroup({});

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.electricityForm = this.fb.group({
      usageInKwh: ['', [Validators.required, Validators.min(0)]],
      timeUsedInMonths: ['', [Validators.required, Validators.min(0)]],
      electricitySource: ['', [Validators.required]]
    });
  }

  calculateCO2(): number {
    if (this.electricityForm.valid) {
      const formData = this.electricityForm.value;
      const { usageInKwh, timeUsedInMonths, electricitySource } = formData;

      switch(electricitySource)
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

      this.co2Produced = usageInKwh * timeUsedInMonths * this.co2ConversionFactor;

      return this.co2Produced;
    }

    return -1;
  }

  onSubmit(): void {
    this.co2Produced = this.calculateCO2();

    if (this.co2Produced !== -1) {
      console.log(`CO2 produced: ${this.co2Produced} kg`);
    } else {
      console.error('Invalid input. Please check your values.');
    }
  }

}
