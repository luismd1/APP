import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicios.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-vivo',
  templateUrl: './vivo.page.html',
  styleUrls: ['./vivo.page.scss'],
})
export class VivoPage implements OnInit {



  constructor(private conexionDB : DbservicioService, private toastController : ToastController, private router : Router) {

  }

  mapa(){
    this.router.navigate(['/mapa']);
  }

  cancelar(){
    this.mensaje('Viaje cancelado');
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
