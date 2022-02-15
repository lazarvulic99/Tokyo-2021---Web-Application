import { TestBed } from '@angular/core/testing';

import { LokacijeService } from './lokacije.service';

describe('LokacijeService', () => {
  let service: LokacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LokacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
