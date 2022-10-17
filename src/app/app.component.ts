import { Component, Input } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DbservicioService } from 'src/app/services/dbservicios.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private geolocation: Geolocation , private conexion :  DbservicioService){

  }

  GetGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {

      this.conexion.locations[0].geometry.coordinates = [
        resp.coords.latitude,
        resp.coords.longitude
      ]
      console.log("");

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }



}
