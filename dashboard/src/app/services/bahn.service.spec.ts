import { TestBed } from '@angular/core/testing';

import { BahnService } from './bahn.service';

describe('BahnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BahnService = TestBed.get(BahnService);
    expect(service).toBeTruthy();
  });
});
