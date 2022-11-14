import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

import { ServicioCamaraService } from './servicio-camara.service';

describe('ServicioCamaraService', () => {
  let service: ServicioCamaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [Camera],
      imports : [HttpClientModule]
    });
    service = TestBed.inject(ServicioCamaraService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('tomar foto', () => {
    service.tomarFoto();
    expect(service.foto).toBeDefined();
  });
});
