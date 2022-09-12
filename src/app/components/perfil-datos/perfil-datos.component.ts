import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-datos',
  templateUrl: './perfil-datos.component.html',
  styleUrls: ['./perfil-datos.component.scss'],
})
export class PerfilDatosComponent implements OnInit {

  usuarioperfil : string ="";
  contraperfil : string ="";
  item : any = {
    imagen : "assets/imgs/perfil.png",
  }

  constructor(private router : Router, private activedRoute : ActivatedRoute) { 

    this.activedRoute.queryParams.subscribe( params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.usuarioperfil =  this.router.getCurrentNavigation().extras.state.usu;
        this.contraperfil = this.router.getCurrentNavigation().extras.state.pass;
      }
      

    })
  }

  ngOnInit() {}

}
