import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicios.service';

@Component({
  selector: 'app-conduce',
  templateUrl: './conduce.component.html',
  styleUrls: ['./conduce.component.scss'],
})
export class ConduceComponent implements OnInit {
  
  listaAutos : any = [];
  viajeActual : any = [];



  // Datos del auto
  auto : boolean = false; // Booleano que comprueba si es que el auto existe
  patente :  "";
  marca :  "";
  modelo : "";
  autoSeleccionado : number;


  // Datos del viaje
  id_auto = 1;
  destino : string = "";
  fecha : "";
  hora : "";
  pasajeros : number;
  costo : number;  

  fk_id_auto = 1;

  constructor(private toastController : ToastController, private router : Router, private conexion : DbservicioService) {
    conexion.ListaAuto();
    conexion.verViajeActual();
  }
  

  verAuto(){
    if (this.listaAutos.length > 0){
      console.log('Lista autos:' + this.listaAutos);
      this.auto = true;
    } else {
      this.auto = false;
      console.log('Error:' + this.listaAutos);
    }
  }

  guardarAuto(){
    if(this.patente.length == 6 && this.marca.length > 2 && this.modelo.length > 2){
      this.conexion.crearAuto(this.patente, this.marca, this.modelo);
      this.auto = true;
      this.conexion.presentAlert("Ahora puede ingresar un viaje ", "Auto guardado con éxito");
    }else{
      this.conexion.presentAlert("Error al guardar el auto", "Compruebe los datos");
    }
  }
  guardarViaje(){
    if(this.destino.length > 5 && this.fecha != null && this.hora != null && this.pasajeros > 1 && this.costo > 0 && this.autoSeleccionado != null){
      if (this.viajeActual.length > 0){
        this.mensaje('Ya tienes un viaje activo, cancelalo para crear uno.');
      } else {
        this.conexion.crearViaje(this.destino, this.fecha, this.hora, this.pasajeros, this.costo, this.autoSeleccionado); 
        this.mensaje('Viaje agregado 😎');
        this.router.navigate(['/inicio/viajar']);
      }
    }else{
      this.conexion.presentAlert("Error al guardar el viaje", "Compruebe los datos");
    }
  }

  async mensaje(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad(){
  }

  ngOnInit() {
    this.conexion.dbState().subscribe((res) => {
      if(res){
        this.conexion.fetchAutoUsu().subscribe(item => {
          this.listaAutos = item;
          this.verAuto();
        });
        this.conexion.fetchViajeActual().subscribe(item => {
          this.viajeActual = item;
        });
      }
    });
  }

}
