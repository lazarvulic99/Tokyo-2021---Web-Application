import { TestBed } from '@angular/core/testing';

import { MedaljeService } from './medalje.service';

describe('MedaljeService', () => {
  let service: MedaljeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedaljeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
