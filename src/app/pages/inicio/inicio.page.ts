import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usu : string = "";
  contra1 : string ="";
  actual : boolean = false;

  constructor(private router : Router, private activedRoute : ActivatedRoute,private toastController : ToastController) {
    this.activedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.usu = this.router.getCurrentNavigation().extras.state.usuario;
        this.contra1 = this.router.getCurrentNavigation().extras.state.contra; 
        
      }
      if(this.router.getCurrentNavigation().extras.state.actual){
        this.actual = this.router.getCurrentNavigation().extras.state.actual;
      }else{console.log('xdxd');}
      console.log(this.actual);
      this.router.navigate(['inicio/viajar']);
    })
    
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
