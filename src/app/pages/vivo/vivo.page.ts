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

  viajeActual : any;
  actual : boolean;

  constructor(private conexionBD : DbservicioService, private toastController : ToastController, private router : Router) {
    conexionBD.verViajeActual();
    this.verActual();
  }

  mapa(){
    this.router.navigate(['/mapa']);
  }

  cancelar(){
    this.mensaje('Viaje cancelado');
  }

  verActual(){
    if(this.viajeActual > 0){
      this.actual = true;
    }else{
      this.actual = false;
    }
  }

  async mensaje(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.conexionBD.dbState().subscribe((res) => {
      if(res){
        this.conexionBD.fetchViajeActual().subscribe(item => {
          this.viajeActual = item;
        });
      }
    });
  }

}
