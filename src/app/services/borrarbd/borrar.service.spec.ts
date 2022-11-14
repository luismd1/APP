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

  it('BD Borrada', () => {
    service.presentAlert('Test','BD borrada');
  });
});
