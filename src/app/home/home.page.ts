import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbservicioService } from '../services/dbservicios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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

  login : boolean;
  constructor(private toastController : ToastController, private router : Router, private conexionBD : DbservicioService) {

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


  // FALTA TERMINAR ESTA WEA CTM
  iniciar(){
    this.conexionBD.login(this.usu, this.pass);
    this.login = this.conexionBD.res2;
    if(this.login){
      this.mensaje('REDIRECCION');
      this.router.navigate(['/inicio']);
    }else{
      this.mensaje('Usuario y/o contraseña incorrecta');
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
    //me subscribo al servicio
    this.conexionBD.dbState().subscribe((res)=>{
      if(res){
        //subscribo a los cambios en las consultas de BD
        this.conexionBD.fetchUsu().subscribe(item=>{
          this.listaUsu = item;
        })
      }
    })
  }
}
