import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usu : string = "";
  pass : string = "";
  correo : string = "seb.cortes@duocuc.cl";
  contra : string = "hola123";
  correo2 : string = null;
  contra2 : string = null;


  item : any = {
    imagen : "assets/imgs/DowntownCabCoLogoGTAV.webp",
  }
  constructor(private toastController : ToastController, private router : Router, private activedRoute : ActivatedRoute) {
    this.activedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.contra = this.router.getCurrentNavigation().extras.state.pass;
        this.correo2 = this.router.getCurrentNavigation().extras.state.usu;
        this.contra2 = this.router.getCurrentNavigation().extras.state.pass;
      }
    })
  }

  registro(){
    this.router.navigate(['/registro']);
  }

  claveOlvidada(){
    let navigationExtras : NavigationExtras = {
      state : {
        usuario : this.usu
      }
    }
    this.router.navigate(['/clave-olvidada'], navigationExtras);
  }

  iniciar(){
    let navigationExtras : NavigationExtras = {
      state : {
        usuario : this.correo,
        contra2 : this.contra2
      }
    }
    if(this.correo == this.usu && this.contra == this.pass || this.correo2 == this.usu && this.contra2 == this.pass){
      this.router.navigate(['/inicio'], navigationExtras)
    }else{
      this.mensaje('El correo y/o la contraseña es incorrecta.')
    }
  }

  async mensaje(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }
}
