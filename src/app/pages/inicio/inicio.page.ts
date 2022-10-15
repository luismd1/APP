import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usu : string = "";
  contra1 : string ="";
  actual : boolean = false;
  viajeActual : any;

  constructor(private router : Router, private activedRoute : ActivatedRoute, private toastController : ToastController, private conexionBD : DbservicioService) {
    conexionBD.verViajeActual();
    this.router.navigate(['inicio/viajar']);
    this.verActual();
  }

  iniciar(){
    let navigationExtras : NavigationExtras = {
      state : {
        usuario : this.usu,
        contra2 : this.contra1
      }
    }
    this.router.navigate(['/perfil'], navigationExtras);
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
