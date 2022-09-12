import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clave-olvidada',
  templateUrl: './clave-olvidada.page.html',
  styleUrls: ['./clave-olvidada.page.scss'],
})
export class ClaveOlvidadaPage implements OnInit {

  pro : boolean = null;
  usuperfil : string = "";
  usu : string ="";
  pass1 : string = "";
  pass2 : string = "";
  correo : string = "seb.cortes@duocuc.cl";
  item : any = {
    imagen : "assets/imgs/DowntownCabCoLogoGTAV.webp"
  }

  constructor(private toastController : ToastController, private router : Router, private activedRoute : ActivatedRoute) {
    this.activedRoute.queryParams.subscribe(params =>{
      if (this.router.getCurrentNavigation().extras.state){
        this.usu = this.router.getCurrentNavigation().extras.state.usuario;
        this.usuperfil = this.router.getCurrentNavigation().extras.state.usuarioconfig;
        this.pro = this.router.getCurrentNavigation().extras.state.procedencia;
      }else{
        this.pro=null;
      }
    })
  }



  recuperarContra(){
    if( this.pro==true){
      this.recuperarContraperfil();
    }else{
      let navigationExtras : NavigationExtras = {
        state : {
          pass : this.pass1
        }
      }
      let password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,20}$/;
      if(this.correo==this.usu && this.pass1==this.pass2 && password.test(this.pass1)){
        this.contraRecuperada('Tu contraseña se ha cambiado con exito.');
        this.router.navigate(['/home'], navigationExtras);
      }else{
        this.contraRecuperada('Correo incorrecto intentelo de nuevo');
      }
    }
  }

  recuperarContraperfil(){
    let navigationExtras : NavigationExtras = {
      state : {
        pass : this.pass1
      }
    }
    let password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,20}$/;
    if(this.correo==this.usuperfil && this.pass1==this.pass2 && password.test(this.pass1)){
      this.contraRecuperada('Tu contraseña se ha cambiado con exito.');
      this.router.navigate(['/home'], navigationExtras);
    }else{
      this.contraRecuperada('Correo incorrecto intentelo de nuevo');
    }
  }

  async contraRecuperada(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
