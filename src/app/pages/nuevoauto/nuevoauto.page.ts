import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicios.service';

@Component({
  selector: 'app-nuevoauto',
  templateUrl: './nuevoauto.page.html',
  styleUrls: ['./nuevoauto.page.scss'],
})
export class NuevoautoPage implements OnInit {

  patente :  string = "";
  marca :  string = "";
  modelo : string = "";

  constructor(private conexion : DbservicioService) { }

  guardarAuto(){
    if(this.patente.length == 6 && this.marca.length > 2 && this.modelo.length > 2){
      this.conexion.crearAuto(this.patente, this.marca, this.modelo);
      this.conexion.presentAlert("Ahora puede ingresar un viaje ", "Auto guardado con éxito");
    }else{
      this.conexion.presentAlert("Error al guardar el auto", "Compruebe los datos");
    }
  }

  ngOnInit() {
  }

}
