import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry } from 'rxjs/Operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  htttpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos/autos/'
  api2URL = 'http://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos/users/'


  constructor(private http : HttpClient) {

  }

  getAutos() : Observable<any>{
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
  }

  getUsers() : Observable<any>{
    return this.http.get(this.api2URL).pipe(
      retry(3)
    );
  }
}
