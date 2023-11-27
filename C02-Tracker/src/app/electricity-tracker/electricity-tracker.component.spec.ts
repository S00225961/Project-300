import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityTrackerComponent } from './electricity-tracker.component';

describe('ElectricityTrackerComponent', () => {
  let component: ElectricityTrackerComponent;
  let fixture: ComponentFixture<ElectricityTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectricityTrackerComponent]
    });
    fixture = TestBed.createComponent(ElectricityTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
