import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BorrarService } from '../services/borrarbd/borrar.service';
import { DbservicioService } from '../services/dbservicios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usu : string = "";
  pass : string = "";
  listaUsu : any = [
    {
      id : '',
      correo : '',
      contrasena : ''
    }
  ];

  item : any = {
    imagen : "assets/imgs/DowntownCabCoLogoGTAV.webp",
  }

  constructor(private toastController : ToastController, private router : Router, private conexionBD : DbservicioService) {

  }

  claveOlvidada(){
    this.router.navigate(['/clave-olvidada']);
  }

  iniciar(){
    this.conexionBD.login(this.usu, this.pass);
  }

  async mensaje(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }
}
