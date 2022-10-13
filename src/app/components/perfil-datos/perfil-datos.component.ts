import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicios.service';

@Component({
  selector: 'app-perfil-datos',
  templateUrl: './perfil-datos.component.html',
  styleUrls: ['./perfil-datos.component.scss'],
})
export class PerfilDatosComponent implements OnInit {

//  usuarioperfil : string ="";
//  contraperfil : string ="";
//  item : any = {
//    imagen : "assets/imgs/perfil.png",
//  }

  listaDatos: any = [
    {
      idUsuario : '',
      correo: '',
      contrasena: ''
    }
  ]


  constructor(private modalCtrl : ModalController,private conexion : DbservicioService, private router : Router, 
    private toastController : ToastController, private activedRoute : ActivatedRoute) { 

    //this.activedRoute.queryParams.subscribe( params => {
    //  if(this.router.getCurrentNavigation().extras.state){
    //    this.usuarioperfil =  this.router.getCurrentNavigation().extras.state.usu;
    //    this.contraperfil = this.router.getCurrentNavigation().extras.state.pass;
    //  }


   // })
  }
  ngOnInit() {
    //me subscribo al servicio
    this.conexion.dbState().subscribe((res)=>{
      if(res){
        //subscribo a los cambios en las consultas de BD
        this.conexion.fetchUsuarioActual().subscribe(item=>{
          this.listaDatos = item;
        })
      }
    })
  }

}
