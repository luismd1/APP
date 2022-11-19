import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
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

  usuarios: any[]=[{
    id: '',
    nombre:'',
    clave:''
  }];

  autos : any[]=[{
    patente: '',
    marca: '',
    id_usuario: ''
  }];

  item : any = {
    imagen : "assets/imgs/DowntownCabCoLogoGTAV.webp",
  }

  constructor(private servicioApi: ApiService,private toastController : ToastController, private router : Router, private conexionBD : DbservicioService) {

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

    this.servicioApi.getUsers().subscribe((res)=>{
      this.usuarios = res;
      //console.log(res)
      for(let x of this.usuarios){
        this.conexionBD.registrarUsuario(x.id, x.nombre,x.clave);
      }
     
    });

    this.servicioApi.getAutos().subscribe((res)=>{
      this.autos = res;
      //console.log(res)
      for(let x of this.autos){
        this.conexionBD.registrarAuto(x.patente, x.marca,x.id_usuario);
      }
    this.conexionBD.inserttablas();
    });
    

  }
}
