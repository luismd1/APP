import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-config',
  templateUrl: './perfil-config.component.html',
  styleUrls: ['./perfil-config.component.scss'],
})
export class PerfilConfigComponent implements OnInit {

  usuarioconfig : string ="";
  contraconfig : string ="";
  procedencia : boolean =true;
  item : any = {
    imagen : "assets/imgs/perfil.png",
  }

  constructor(private router : Router, private activedRoute : ActivatedRoute) { 

    this.activedRoute.queryParams.subscribe( params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.usuarioconfig =  this.router.getCurrentNavigation().extras.state.usu;
        this.contraconfig = this.router.getCurrentNavigation().extras.state.pass;
        this.contraconfig = this.router.getCurrentNavigation().extras.state.contranueva;
      }
      
    } 
  );  
  }
  claveOlvidada(){
    let navigationExtras : NavigationExtras = {
      state : {
        usuarioconfig : this.usuarioconfig,
        procedencia : this.procedencia
      }
    }
    this.router.navigate(['/clave-olvidada'], navigationExtras);
  }

  nuevoAuto(){
    this.router.navigate(['/nuevoauto']);
  }

  eliminarAuto(){
    this.router.navigate(['/eliminarauto']);
  }
  ngOnInit() {}

}
