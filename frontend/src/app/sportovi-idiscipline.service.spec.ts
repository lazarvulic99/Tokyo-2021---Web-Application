import { TestBed } from '@angular/core/testing';

import { SportoviIdisciplineService } from './sportovi-idiscipline.service';

describe('SportoviIdisciplineService', () => {
  let service: SportoviIdisciplineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportoviIdisciplineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
