import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { GooglemapsService } from './googlemaps.service';

const {Geolocation} = Plugins;
declare var google: any;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})
export class GooglemapsComponent implements OnInit {

  @Input() position = {
    lat : -2.899116,
    lng : -78.99958149999999
  };

  label = {
    titulo : 'Ubicacion',
    subtitulo : 'Ubicacion de destino'
  }

  map : any;
  marker : any;
  infowindow : any;
  positionSet : any;

  @ViewChild('map') divMap : ElementRef;
  constructor(private renderer : Renderer2,
              @Inject(DOCUMENT) private document,
              private googlemapsService : GooglemapsService,
              public modalController : ModalController) { }

  ngOnInit() : void {
    this.init()
  }

  async init() {
    this.googlemapsService.init(this.renderer, this.document).then( () => {
      this.initMap();
    }).catch( (err) => {
      console.log(err);
    });
  }

  initMap(){
    const position = this.position;

    let latLng = new google.maps.LatLng(position.lat, position.lng);

    let mapOptions = {
      center : latLng,
      zoom : 15,
      disableDefaultUI : true,
      clickableIcons : false,
    }

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map : this.map,
      animation : google.maps.Animation.DROP,
      draggables : true,
    });
    this.clickHandEvent();
    this.infowindow = new google.maps.InfoWindow();
    if (this.label.titulo.length){
      this.addMarker(position);
      this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
    }
  }

  clickHandEvent(){
    this.map.addListener('click', (event : any) => {
      const position = {
        lat : event.latLng.lat(),
        lng : event.latLng.lng(),
      };
      this.addMarker(position);
    });
  }

  addMarker(position : any): void{
    let latLng = new google.maps.LatLng(position.lat, position.lng);

    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker : any, titulo : string, subtitulo : string){
    const contentString = '<div id="contentInsideMap">' +
                          '<div>' + 
                          '</div>' +
                          '<p style = "font-weight : bold; margin-bottom: 5px;">' + titulo + '</p>' +
                          '<div id = "bodyContent">' + 
                          '<p class = "normal m-0">' + subtitulo + '</p>' +
                          '</div>' + 
                          '</div>';

    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  }

  async mylocation(){
    Geolocation.getCurrentPosition().then((res) => {
      const position = {
        lat : res.cooords.latitude,
        lng : res.cooords.longitude,
      }
      this.addMarker(position);
    });
  }

  aceptar(){
    this.modalController.dismiss();
  }
}
