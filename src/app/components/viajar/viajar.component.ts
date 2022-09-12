import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.component.html',
  styleUrls: ['./viajar.component.scss'],
})
export class ViajarComponent implements OnInit {

  name : string = "";
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  viajes : any = [
    {
      id : 1,
      destino : "Av las torres quilicura",
      fecha : "26/08/2022",
      hora : "17:30",
      pasajeros : 3,
      costo : 1500
    },
    {
      id : 2,
      destino : "Rio maule valle grande",
      fecha : "24/08/2022",
      hora : "13:00",
      pasajeros : 2,
      costo : 5000
    },
    {
      id : 3,
      destino : "Antumalal con lo cruzat",
      fecha : "22/08/2022",
      hora : "12:00",
      pasajeros : 1,
      costo : 1000
    },
    {
      id : 4,
      destino : "Mata con lo marcoleta",
      fecha : "20/08/2022",
      hora : "12:30",
      pasajeros : 5,
      costo : 6000
    },
  ]

  constructor(private modalCtrl : ModalController, private router : Router, private toastController : ToastController, private activedRoute : ActivatedRoute) {
    this.activedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.viajes.push({
          id : this.router.getCurrentNavigation().extras.state.id,
          destino : this.router.getCurrentNavigation().extras.state.destino,
          fecha : this.router.getCurrentNavigation().extras.state.fecha,
          hora : this.router.getCurrentNavigation().extras.state.hora,
          pasajeros : this.router.getCurrentNavigation().extras.state.pasajeros,
          costo : this.router.getCurrentNavigation().extras.state.costo
        });
      }
    });
  }

  async abrirModal(id){
    const modal = await this.modalCtrl.create({
      component : ModalComponent,
      componentProps : this.viajes[id-1],
      swipeToClose : true,
    });
    modal.present();

    const { data ,role } = await modal.onWillDismiss();

    if (role === 'confirm'){
      let navigationExtras : NavigationExtras = {
        state : {
          destino : this.viajes[id-1].destino,
          hora : this.viajes[id-1].hora,
          costo : this.viajes[id-1].costo
        }
      }
      this.router.navigate(['inicio/vivo'], navigationExtras);
      this.mensaje('Viaje ' + this.viajes[id-1].id + ' confirmado');
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
