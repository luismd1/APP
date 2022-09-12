import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usu: string = "";
  pass: string = "";
  contranueva: string = "";
  item: any = {
    src: "assets/imgs/DowntownCabCoLogoGTAV.webp"
  }

  constructor(private toastController: ToastController, private router: Router, private activedRoute: ActivatedRoute) {
    this.activedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usu = this.router.getCurrentNavigation().extras.state.usuario;
        this.pass = this.router.getCurrentNavigation().extras.state.contra2;
        this.contranueva = this.router.getCurrentNavigation().extras.state.pass;

        let navigationExtras: NavigationExtras = {
          state: {
            usu: this.usu,
            pass: this.pass
          }


        }
        this.router.navigate(['perfil/perfil-datos'], navigationExtras);

      }})
  }


  segmentChanged($event) {
    let direccion = $event.detail.value;
    console.log(direccion);
    let navigationExtras: NavigationExtras = {
      state: {
        usu: this.usu,
        pass: this.pass,
        contranueva: this.contranueva
      }
    }
    this.router.navigate(['perfil/' + direccion], navigationExtras);

  }


  ngOnInit() {
  }

}
function navigationExtras(arg0: string[], navigationExtras: any) {
  throw new Error('Function not implemented.');
}

