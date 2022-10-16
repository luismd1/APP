import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map')mapRef : ElementRef;
  map : GoogleMap;

  constructor() {}

  ionViewDidEnter(){
    this.crearMap();
  }

  async crearMap(){
    this.map = await GoogleMap.create({
      id : 'my-map',
      apiKey : environment.mapsKey,
      element : this.mapRef.nativeElement,
      config : {
        center : {
          lat : -33.3633,
          lng : -70.6782,
        },
        zoom : 15,
      }
    });
  }

  ngOnInit() {
  }

}
