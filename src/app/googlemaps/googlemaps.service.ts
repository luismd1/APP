import { Injectable } from '@angular/core';
import { resolve } from 'dns';

declare var google :any;

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  apiKey = "AIzaSyB6dwK37_EccbuOCDFMrVolwZVQfb-7Eko";
  mapsLoaded = false;

  constructor() {}

  init(renderer : any, document : any): Promise<any>{
    return new Promise((resolve) => {
      if(this.mapsLoaded){
        console.log('google estaba previamente cargado :D')
        resolve(true);
        return;
      }
      
      const script = renderer.createElement('script');
      script.id = 'googleMaps';

      window['mapInit'] = () => {
        this.mapsLoaded = true;
        if (google){
          console.log('google cargado :D')
        } else {
          console.log('google no esta definido :/')
        }
        resolve(true);
        return;
      }

      if(this.apiKey){
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else{
        
      }
    });
  }
}
