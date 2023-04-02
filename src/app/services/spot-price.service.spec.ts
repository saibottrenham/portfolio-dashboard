import { TestBed } from '@angular/core/testing';

import { SpotPriceService } from './spot-price.service';

describe('SpotPriceService', () => {
  let service: SpotPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
