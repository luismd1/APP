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

  // Datos del auto
  auto : boolean = false; // Booleano que comprueba si es que el auto existe
  patente :  "";
  marca :  "";
  modelo : "";
  capacidad: "0";
  id_usuario =1;

  // Datos del viaje
  id_auto = 1;
  destino : "";
  fecha : "";
  hora : "";
  pasajeros : "0";
  costo : "";
  id_viaje = 3;

  constructor(private toastController : ToastController, private router : Router, private conexion : DbservicioService) { }


  guardarAuto(){
    if(true){
      this.conexion.crearAuto(this.id_auto,this.patente, this.marca, this.modelo, this.capacidad, this.id_usuario);
      this.auto = true;
      this.conexion.presentAlert("Ahora puede ingresar un viaje ", "Auto guardado con éxito");
    }else{
      this.conexion.presentAlert("Error al guardar el auto", "Compruebe los datos");
    }
  }
  guardarViaje(){
    if(true){
      this.conexion.crearViaje(this.id_viaje,this.destino, this.fecha, this.hora, this.pasajeros, this.costo  );  
      this.conexion.presentAlert("Ahora los usuarios podrán verlo en la sección de viajes ", "viaje agregado");
      this.router.navigate(['/inicio/viajar']);
    }else{
      this.conexion.presentAlert("Error al guardar el viaje", "Compruebe los datos");
    }
  }


  //regAuto(){
   // if(this.patente.length == 6 && this.marca.length > 2 && this.modelo.length > 2 && this.capacidad > 1){
    //  this.mensaje('Auto registrado con exito :D');
    //  this.auto = true;
    //}else{
     // this.mensaje('Datos incorrectos intentelo nuevamente D:')
    //}
  //}

  //regviaje(){
   // if(this.destino.length > 4 && this.pasajeros > 0 && this.fecha != null && this.hora != null){
    //  this.mensaje('Viaje registrado con exito :D');
    //  let navigationExtras : NavigationExtras = {
     //   state : {
      //    id : 5,
       //   destino : this.destino,
        //  fecha : this.fecha,
         // hora : this.hora,
          //pasajeros : this.pasajeros,
          //costo : this.costo
        //}
      //}
      //this.router.navigate(['inicio/viajar'], navigationExtras);
    //}else{
      //this.mensaje('Datos incorrectos intentelo de nuevo D:');
    //}
  //}

  //async mensaje(texto) {
   // const toast = await this.toastController.create({
    //  message: texto,
    //  duration: 2000
    //});
    //toast.present();
  //}

  ngOnInit() {}

}
