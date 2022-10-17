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
    this.conexion.fetchviajeporusuario().subscribe(item => {
      if(item){
        this.listaUsuariosviajes = item;
        this.verusuarioviaje();
        console.log("Esto llega al ngoninit"+ this.listaUsuariosviajes);
      }else{
        console.log("No llega nada aca");
      }
    });
  }

}
