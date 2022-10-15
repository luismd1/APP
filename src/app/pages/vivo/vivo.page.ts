import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicios.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';

@Component({
  selector: 'app-vivo',
  templateUrl: './vivo.page.html',
  styleUrls: ['./vivo.page.scss'],
})
export class VivoPage implements OnInit {

  viajeActual : any = [];
  actual : boolean;

  constructor(private conexionBD : DbservicioService, private toastController : ToastController, private router : Router, private modalController : ModalController) {
    conexionBD.verViajeActual();
  }

  async mapa(){
    const ubicacion = this.viajeActual[0].destino;

    const modalAdd = await this.modalController.create({
      component : GooglemapsComponent,
      swipeToClose : true,
      componentProps : {}
    });
    await modalAdd.present();
  }

  cancelar(){
    this.mensaje('Viaje cancelado');
  }

  verActual(){
    if(this.viajeActual.length > 0){
      this.actual = true;
    }else{
      this.actual = false;
    }
    console.log('ESTO ES LO QUE ME LLEGA CTM D:' + this.viajeActual);
  }

  async mensaje(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.conexionBD.fetchViajeActual().subscribe(item => {
      if(item){
        this.viajeActual = item;
        this.verActual();
      }else{
        console.log("No llega nada aca");
      }
    });
  }

}
