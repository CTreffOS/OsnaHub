import { TestBed } from '@angular/core/testing';

import { MastodonService } from './mastodon.service';

describe('MastodonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MastodonService = TestBed.get(MastodonService);
    expect(service).toBeTruthy();
  });
});
