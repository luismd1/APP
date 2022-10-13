import { TestBed } from '@angular/core/testing';

import { ServicioCamaraService } from './servicio-camara.service';

describe('ServicioCamaraService', () => {
  let service: ServicioCamaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCamaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
