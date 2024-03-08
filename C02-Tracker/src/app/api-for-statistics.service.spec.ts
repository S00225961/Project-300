import { TestBed } from '@angular/core/testing';

import { ApiForStatisticsService } from './api-for-statistics.service';

describe('ApiForStatisticsService', () => {
  let service: ApiForStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiForStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
