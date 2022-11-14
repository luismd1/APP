import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { DbservicioService } from './dbservicios.service';

describe('DbserviciosService', () => {
  let service: DbservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [SQLite],
      imports : [HttpClientModule]
    });
    service = TestBed.inject(DbservicioService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('Mensaje de error', ()=>{
    service.mensajesError();
  });
});
