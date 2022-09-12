import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usu : string = "";
  pass1 : string = "";
  pass2 : string = ""; 
  item : any = {
    imagen : "assets/imgs/DowntownCabCoLogoGTAV.webp"
  }

  constructor(private toastController : ToastController, private router : Router) { }

  registrarse(){
    let navigationExtras : NavigationExtras = {
      state : {
        usu : this.usu,
        pass : this.pass1
      }
    }
    let expresiones = {
      correo : /^[a-zA-Z0-9_\.+-]+@duocuc.cl$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,20}$/,
    }
    if (expresiones.correo.test(this.usu) && expresiones.password.test(this.pass1) && this.pass1 == this.pass2) {
      this.msj('Cuenta creada con exito');
      this.router.navigate(['/home'], navigationExtras);
    }else{
      this.msj('Datos ingresados incorrectamente intentelo de nuevo');
    }
  }

  async msj(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
