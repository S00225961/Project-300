import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuteTrackerComponent } from './commute-tracker.component';

describe('CommuteTrackerComponent', () => {
  let component: CommuteTrackerComponent;
  let fixture: ComponentFixture<CommuteTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommuteTrackerComponent]
    });
    fixture = TestBed.createComponent(CommuteTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
