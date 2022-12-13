import { TestBed } from '@angular/core/testing';

import { IstSituationService } from './ist-situation.service';

describe('IstSituationService', () => {
  let service: IstSituationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IstSituationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
