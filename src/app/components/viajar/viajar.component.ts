import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicios.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.component.html',
  styleUrls: ['./viajar.component.scss'],
})
export class ViajarComponent implements OnInit {
  listaViajes: any = [
    {
      idViaje : '',
      destino: '',
      fecha: '',
      hora: '',
      pasajeros: '',
      costo: ''
    }
  ]

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



  constructor(private modalCtrl : ModalController,private conexion : DbservicioService, private router : Router, private toastController : ToastController) {
    conexion.buscarViajes();
  }

  //    this.activedRoute.queryParams.subscribe(params => {
  //  if(this.router.getCurrentNavigation().extras.state){
  //    this.viajes.push({
  //      id : this.router.getCurrentNavigation().extras.state.id,
  //      destino : this.router.getCurrentNavigation().extras.state.destino,
  //      fecha : this.router.getCurrentNavigation().extras.state.fecha,
  //      hora : this.router.getCurrentNavigation().extras.state.hora,
  //      pasajeros : this.router.getCurrentNavigation().extras.state.pasajeros,
  //      costo : this.router.getCurrentNavigation().extras.state.costo
  //    });
  //  }
  //});

  async abrirModal(idViaje){
    const modal = await this.modalCtrl.create({
      component : ModalComponent,
      componentProps : this.listaViajes[idViaje-1],
      swipeToClose : true,
    });
    modal.present();
    
    const { data ,role } = await modal.onWillDismiss();

    if (role === 'confirm'){
      this.conexion.agregarPasajero(this.listaViajes[idViaje-1].idViaje);
      this.mensaje('Viaje reservado');
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
    this.conexion.dbState().subscribe((res)=>{
      if(res){
        //subscribo a los cambios en las consultas de BD
        this.conexion.fetchViaje().subscribe(item=>{
          this.listaViajes = item;
        })
      }
    })
  }

}
