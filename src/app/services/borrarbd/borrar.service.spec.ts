import { TestBed } from '@angular/core/testing';

import { BorrarService } from './borrar.service';

describe('BorrarService', () => {
  let service: BorrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
