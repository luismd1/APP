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

  it('Verificar inserts', ()=>{
    expect(service.insertAuto).toContain('INSERT');
    expect(service.insertDescuento).toContain('INSERT');
    expect(service.insertDescuento2).toContain('INSERT');
    expect(service.insertDescuento3).toContain('INSERT');
    expect(service.insertUsuarioViaje).toContain('INSERT');
    expect(service.insertViaje).toContain('INSERT');
  });

  it('Prueba NativeStorage', () => {
    let foto : any;

    localStorage.setItem('xd','XD');

    foto = localStorage.getItem('xd');
    expect(foto).toEqual('XD');

    localStorage.removeItem('xd');
    foto = localStorage.getItem('xd');    
    expect(foto).toBeNull();
  });

  
});
