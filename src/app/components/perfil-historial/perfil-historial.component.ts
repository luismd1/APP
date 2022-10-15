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
  usuarioviaje : boolean;
  listaUsuariosviajes: any = [
    {
      destino: '',
      fecha : '',
      hora: '',
      costo: '',
      estado: ''
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

  constructor(private modalCtrl : ModalController,private conexion : DbservicioService, private router : Router,private toastController : ToastController, private activedRoute : ActivatedRoute) {
    conexion.buscarViajePorUsuario();
  }
  verusuarioviaje(){
    if(this.listaUsuariosviajes.length > 0){
      this.usuarioviaje = true;
    }else{
      this.usuarioviaje = false;
    }
    console.log('ESTO ES LO QUE ME LLEGA CTM D:' + this.listaUsuariosviajes);
  }
  ngOnInit() {
    this.conexion.fetchUsuarioViaje().subscribe(item => {
      if(item){
        this.listaUsuariosviajes = item;
        this.verusuarioviaje();
      }else{
        console.log("No llega nada aca");
      }
    });
  }

}
