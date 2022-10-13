import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicios.service';

@Component({
  selector: 'app-perfil-historial',
  templateUrl: './perfil-historial.component.html',
  styleUrls: ['./perfil-historial.component.scss'],
})
export class PerfilHistorialComponent implements OnInit {
  listaUsuariosviajes: any = [
    {
      id_usuario_viaje: '',
      pk_id_viaje : '',
      pk_id_auto: ''
    }
  ]


  //viajes : any = [
  //  {
  //    id : 1,
  //    destino : "Los platanos",
  //    estado : "conducido",
  //    fecha : "26/08/2022",
  //    hora : "17:30",
  //    costo : 1500
  //  },
  //  {
  //    id : 2,
  //    destino : "Pasaje Odessa",
 //     estado : "conducido",
  //    fecha : "24/08/2022",
  //    hora : "13:00",
  //    costo : 5000
  //  },
  ////  {
  //    id : 3,
  //    destino : "Avenida las Torres con Lo cruzat",
  //    estado : "conducido",
  ////    fecha : "22/08/2022",
 //     hora : "12:00",
 //     costo : 1000
  //  },
  //  {
  //    id : 4,
  //    destino : "Millantu con antumalal",
  //    estado : "viajado",
  //    fecha : "20/08/2022",
  //    hora : "12:30",
  //    costo : 6000
  //  },
  //]

  constructor(private modalCtrl : ModalController,private conexion : DbservicioService, private router : Router,
     private toastController : ToastController, private activedRoute : ActivatedRoute) {
    conexion. buscarViajePorUsuario();
  }

  ngOnInit() {
    //me subscribo al servicio
    this.conexion.dbState().subscribe((res)=>{
      if(res){
        //subscribo a los cambios en las consultas de BD
        this.conexion.fetchUsuarioViaje().subscribe(item=>{
          this.listaUsuariosviajes = item;
        })
      }
    })
  }

}
