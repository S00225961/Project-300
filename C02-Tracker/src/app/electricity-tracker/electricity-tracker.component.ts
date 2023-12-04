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

  co2ConversionFactor = 0.5;

  electricitySources = [
    { value: 'coal', label: 'Coal' },
    { value: 'naturalGas', label: 'Natural Gas' },
    { value: 'renewable', label: 'Renewable Energy' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.electricityForm = this.fb.group({
      usageInKwh: ['', [Validators.required, Validators.min(0)]],
      timeUsedInHours: ['', [Validators.required, Validators.min(0)]],
    });
  }

  calculateCO2(): number {
    if (this.electricityForm.valid) {
      const formData = this.electricityForm.value;
      const { usageInKwh, timeUsedInHours } = formData;

      this.co2Produced = usageInKwh * timeUsedInHours * this.co2ConversionFactor;

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
