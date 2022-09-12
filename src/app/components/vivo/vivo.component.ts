import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InicioPageModule } from 'src/app/pages/inicio/inicio.module';

@Component({
  selector: 'app-vivo',
  templateUrl: './vivo.component.html',
  styleUrls: ['./vivo.component.scss'],
})
export class VivoComponent implements OnInit {

  destino : string = "";
  hora : string = "";
  precio : number;

  constructor(private toastController : ToastController, private router : Router, private activedRoute : ActivatedRoute) {
    this.activedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.destino = this.router.getCurrentNavigation().extras.state.destino;
        this.hora = this.router.getCurrentNavigation().extras.state.hora;
        this.precio = this.router.getCurrentNavigation().extras.state.costo;
      }
    });
  }

  mapa(){
    this.router.navigate(['/mapa']);
  }

  chat(){
    this.router.navigate(['/chat']);
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
  ngOnInit() {}

}
