import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpTestingController.verify();
  });

  it('Probar JSON api', () => {
    const lista =[{
        "id": 1,
        "nombre": "v.rosendo5",
        "clave": "J.12mm5",
        "id_rol": 1
      }];

    var cont : any;
    service.getUsers().subscribe((res)=>{
      expect(res).toBeTruthy();
      expect(res).toHaveSize(1);
      const product = res[0];
      expect(product).toBe(lista[0]);
    });

    const mockRequest = httpTestingController.expectOne(
      'http://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/users'
    );
    
    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(lista);
  });
});
