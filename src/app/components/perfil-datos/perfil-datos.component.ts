import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ServicioCamaraService } from 'src/app/services/camera/servicio-camara.service';
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
  ];

  foto : any = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"; 

  constructor(private camara : ServicioCamaraService, private conexion : DbservicioService, private router : Router, private toastController : ToastController, private activedRoute : ActivatedRoute) { 
    
  }

  fotito(){
    this.camara.tomarFoto();
  }

  
  ngOnInit() {
    //me subscribo al servicio
    this.conexion.dbState().subscribe((res)=>{
      if(res){
        //subscribo a los cambios en las consultas de BD
        this.conexion.fetchUsuarioActual().subscribe(item=>{
          this.listaDatos = item;
          console.log(this.listaDatos);
        })
      }
    });

    this.camara.obs_foto().subscribe((res) => {
      if(res){
        this.foto = res;
        console.log(this.foto);
      }
    });
  }

}
