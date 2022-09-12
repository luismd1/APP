import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-conduce',
  templateUrl: './conduce.component.html',
  styleUrls: ['./conduce.component.scss'],
})
export class ConduceComponent implements OnInit {

  // Datos del auto
  auto : boolean = false; // Booleano que comprueba si es que el auto existe
  patente : string = "";
  marca : string = "";
  modelo : string = "";
  capacidad: number = null;

  // Datos del viaje
  destino : string = "";
  fecha : string = null;
  hora : string = null;
  pasajeros : number = null;
  costo : number = null;

  constructor(private toastController : ToastController, private router : Router) { }

  regAuto(){
    if(this.patente.length == 6 && this.marca.length > 2 && this.modelo.length > 2 && this.capacidad > 1){
      this.mensaje('Auto registrado con exito :D');
      this.auto = true;
    }else{
      this.mensaje('Datos incorrectos intentelo nuevamente D:')
    }
  }

  regViaje(){
    if(this.destino.length > 4 && this.pasajeros > 0 && this.fecha != null && this.hora != null){
      this.mensaje('Viaje registrado con exito :D');
      let navigationExtras : NavigationExtras = {
        state : {
          id : 5,
          destino : this.destino,
          fecha : this.fecha,
          hora : this.hora,
          pasajeros : this.pasajeros,
          costo : this.costo
        }
      }
      this.router.navigate(['inicio/viajar'], navigationExtras);
    }else{
      this.mensaje('Datos incorrectos intentelo de nuevo D:');
    }
  }

  async mensaje(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {}

}
