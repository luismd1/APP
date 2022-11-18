import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { BorrarService } from './borrar.service';

describe('BorrarService', () => {
  let service: BorrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
      providers : [SQLite]
    });
    service = TestBed.inject(BorrarService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('Verificar el borrar', () => {
    expect(service.borraUsu).toContain('DROP');
    expect(service.borrarAuto).toContain('DROP');
    expect(service.borrarDescuento).toContain('DROP');
    expect(service.borrarViaje).toContain('DROP');
    expect(service.borrarUsuViaje).toContain('DROP');
  });
});
