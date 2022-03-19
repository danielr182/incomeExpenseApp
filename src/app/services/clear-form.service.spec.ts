import { TestBed } from '@angular/core/testing';

import { ClearFormService } from './clear-form.service';

describe('ClearFormService', () => {
  let service: ClearFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
