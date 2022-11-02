import { TestBed } from '@angular/core/testing';

import { SharedPhoneDetailsService } from './shared-phone-details.service';

describe('SharedPhoneDetailsService', () => {
  let service: SharedPhoneDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPhoneDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
