import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCamaraService {

  foto : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private camara : Camera) { }

  tomarFoto(){
    const options : CameraOptions = {
      quality : 100,
      destinationType : this.camara.DestinationType.FILE_URI,
      encodingType : this.camara.EncodingType.JPEG,
      mediaType : this.camara.MediaType.PICTURE
    }

    this.camara.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.foto.next(base64Image);
    }, (err) => {

    });
  }

  obs_foto(){
    return this.foto.asObservable();
  }
}
