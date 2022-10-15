import { Component, Input } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicios.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private conexionDB : DbservicioService) {
    conexionDB.verViajeActual();
  }


}
