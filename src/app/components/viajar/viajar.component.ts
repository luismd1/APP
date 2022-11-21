import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicios.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.component.html',
  styleUrls: ['./viajar.component.scss'],
})
export class ViajarComponent implements OnInit {

  listaViajes: any = [];
  viajeActual: any = [];
  listaDescuentos : any = [];

  name: string = "";

  constructor(private modalCtrl: ModalController, private conexion: DbservicioService, private router: Router, private toastController: ToastController) {
    conexion.buscarViajes();
    conexion.verViajeActual();
    conexion.listarDescuento();
    console.log('LLEGANDO A VIAJES');
  }

  async abrirModal(idViaje) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: this.listaViajes[idViaje],
      swipeToClose: true,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      let mensaje = `${data}`;
      console.log('CODIGO: '+mensaje);
      if (this.viajeActual.length > 0) {
        this.mensaje('Ya tienes un viaje activo, cancelalo para tomar este.');
      } 
      else {
        let precio = this.listaViajes[idViaje].costo;
        for (var i = 0; i < this.listaDescuentos.length; i++){
          if (data == this.listaDescuentos[i].codigo){
            precio = precio - (precio * this.listaDescuentos[i].descuento); 
          }
        }
        //RESTAR PASAJERO RESTA UN PASAJERO (CREO)
        if (this.listaViajes[idViaje].pasajeros > 0 ){
          this.conexion.restarPasajero(this.listaViajes[idViaje].idViaje);
        }else{
          this.conexion.falseviaje(this.listaViajes[idViaje].idViaje);
        }
        
        //AGREGAR PASAJERO ES AGREGAR EL VIAJE A LA TABLA USARIO VIAJE
        this.conexion.agregarPasajero(this.listaViajes[idViaje].idViaje, precio);
        this.mensaje('Viaje reservado');
      }
    }
    else{
      this.conexion.sumarPasajero(this.listaViajes[idViaje].idViaje);
    }
  }

  async mensaje(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    //me subscribo al servicio
    this.conexion.dbState().subscribe((res) => {
      if (res) {
        //subscribo a los cambios en las consultas de BD
        this.conexion.fetchViaje().subscribe(item => {
          this.listaViajes = item;
          console.log('viajes en viajes:' + item);
        });
        this.conexion.fetchViajeActual().subscribe(item => {
          this.viajeActual = item;
        });
        this.conexion.fetchDescuento().subscribe(item => {
          this.listaDescuentos = item;
        })
      }
    })
  }

}
