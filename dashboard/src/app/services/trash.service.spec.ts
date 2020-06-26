import { TestBed } from '@angular/core/testing';

import { TrashService } from './trash.service';

describe('TrashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrashService = TestBed.get(TrashService);
    expect(service).toBeTruthy();
  });
});
