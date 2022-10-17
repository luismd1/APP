import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import {Plugins} from '@capacitor/core';
import {NativeGeocoder, NativeGeocoderResult,NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

const {Geolocation} = Plugins;




declare var google : any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map : any ;
  marker:any ;

  label= {
    titulo : 'Ubicacion',
    Subtitulo : 'Punto de partida'
  }

  locations: any [];
  coords  : any ;


  position={
    lat : -33.363665,
    lng : -70.678402
  };

  @ViewChild('map',{read: ElementRef, static : false})mapRef : ElementRef;
  
  VentanaInformacion : any = [];
  infoWindows: any = [];
  Marcadores : any = [
  {
    titulo : "Duoc uc: sede plaza norte.",
    latitude : "-33.363665",
    longitude : "-70.678402"
  },
  {
    titulo : "HOLA RUSIA.",
    latitude : "56.170102",
    longitude : "104.068477"
  }
  ];

  constructor(  ) {}



  ionViewDidEnter(){
    this.crearMap();
  }

  addMarcadores(Marcadores){
    for (let Marcador of Marcadores){
      let position = new google.map.LatLng(Marcador.latitude,Marcador.longitude);
      let MapMarcador = new google.maps.Marcador({
        position : position,
        titulo : Marcador.titulo,
        latitude : Marcador.latitude,
        longitude : Marcador.longitude
      });
      MapMarcador.setMap(this.map);
      this.addInfoMarcador(MapMarcador);
    }
  }

  addInfoMarcador(Marcador){
    let infoWindowContent = '<div id="content" >' +
                              '<h2 id="firstHeading" class="firstHeading"  > Marcador.titulo </h2>'+ 
                              '<p>Punto de partida del viaje </p> '+
                              '</div>';
    let infoWindow = new google.maps.infoWindow({
      content: infoWindowContent
    });

    Marcador.addListener('click',()=>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map, Marcador);
    });
    this.infoWindows.push(infoWindow);                     
  }

  closeAllInfoWindows(){
    for (let window of this.infoWindows){
      window.close();
    }
  }
  
  crearMap(){
    const  position = this.position;
    let latlng = new google.maps.LatLng(position.lat,position.lng);
    const mapOptions= {
      center : latlng,
      zoom :15,
      disableDefaultUI : true,
      clickableIcons : false,
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement,mapOptions);
    //this.marker = new google.maps.Marker({
    //  map: this.map,
    //  draggable: true,

    //});
    //this.addMarker(position);
  }


  addMarker(position: any ): void{
    let latLng = new google.maps.LatLng(position.lat,position.lng);
    this.marker.LatLng(position.lat,position.lng);
    //this.map.panTo(position);
    //this.PositionSet = position; 
  }

  async locate( ) {
    const  position = this.position;
    let latlng = new google.maps.LatLng(position.lat,position.lng);
    const coordinates = await Geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    console.log("Coordenadas : ", this.coords.latitude, this.coords.longitude)
    this.position.lat = this.coords.latitude;
    this.position.lng = this.coords.longitude;
    this.crearMap();


  }


  ngOnInit() {
  }

}
