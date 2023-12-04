import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commute-tracker',
  templateUrl: './commute-tracker.component.html',
  styleUrls: ['./commute-tracker.component.css']
})
export class CommuteTrackerComponent implements OnInit {
  commuteForm: FormGroup = new FormGroup({});

  co2Produced: number | null = null;

  transportModes = ['Car', 'Bus', 'Train', 'Cycling', 'Walking'];
  commuteFrequencies = ['Daily', 'Weekly', 'Monthly'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.commuteForm = this.fb.group({
      distance: ['', [Validators.required, Validators.min(0)]],
      modeOfTransport: ['', Validators.required],
      frequency: ['', Validators.required],
      timeTaken: ['', [Validators.required, Validators.pattern('^([0-9]+[.]?[0-9]*|[.][0-9]+)$')]],
      additionalNotes: ['']
    });
  }

  onSubmit(): void {
    this.co2Produced = this.calculateCO2();

    if (this.co2Produced !== null) {
      console.log(`CO2 produced for commute: ${this.co2Produced} kg`);
    } else {
      console.error('Invalid input. Please check your values.');
    }
  }

  private calculateCO2(): number | null {
    const distance = this.commuteForm.get('distance')?.value;
    const timeTaken = this.commuteForm.get('timeTaken')?.value;

    if (distance !== null && timeTaken !== null) {
      const emissionFactor = this.getEmissionFactorByTransportMode(this.commuteForm.get('modeOfTransport')?.value);
      if (emissionFactor !== null) {
        return distance * timeTaken * emissionFactor;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private getEmissionFactorByTransportMode(mode: string | null): number | null {
    const emissionFactors: { [mode: string]: number } = {
      'Car': 0.2,
      'Bus': 0.05,
      'Bicycle': 0,
      'Walking': 0
    };

    return mode !== null ? emissionFactors[mode] : null;
  }
}
