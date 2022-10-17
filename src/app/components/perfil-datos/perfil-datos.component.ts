import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ServicioCamaraService } from 'src/app/services/camera/servicio-camara.service';
import { DbservicioService } from 'src/app/services/dbservicios.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

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

  constructor(private nativeStorage : NativeStorage , private alertController: AlertController, private camara : ServicioCamaraService, private conexion : DbservicioService, private router : Router, private toastController : ToastController, private activedRoute : ActivatedRoute) { 
    this.mostrar();
  }

  fotito(){
    this.camara.tomarFoto();
  }

  guardar(){
    this.nativeStorage.setItem('foto' + this.listaDatos[0].idUsuario, {'id' : this.listaDatos[0].idUsuario, 'foto' : this.foto}).then(()=>{
      this.mensaje('Foto guardada');
    });
  }

  mostrar(){
    this.nativeStorage.getItem('foto' + this.listaDatos[0].idUsuario).then((val) => {
      this.foto = val.foto;
      this.mensaje('Foto cargada');
    });
  }

  borrar(){
    this.nativeStorage.remove('foto' + this.listaDatos[0].idUsuario).then(() => {
      this.mensaje('Foto eliminada');
      this.foto = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
    });
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
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
        this.conexion.fetchUsuarioActual().subscribe(item=>{
          this.listaDatos = item;
          console.log(this.listaDatos);
        })
      }
    });

    this.camara.obs_foto().subscribe((res) => {
      if(res){
        this.foto = res;
        this.guardar();
        console.log(this.foto);
      }
    });
  }

}
