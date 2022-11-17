import { TestBed } from '@angular/core/testing';

import { TrebuchetService } from './trebuchet.service';

describe('TrebuchetService', () => {
  let service: TrebuchetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrebuchetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
