import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BorrarService {

  public database: SQLiteObject;

  borraUsu = 'DROP TABLE usuario;';
  borrarAuto = 'DROP TABLE auto;';
  borrarViaje = 'DROP TABLE viaje;';
  borrarDescuento = 'DROP TABLE descuento;';
  borrarUsuViaje = 'DROP TABLE usuarioviaje;';

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController,private alertController: AlertController) {
    this.crearBD();
  }

  async presentAlert(msj: string, lugar: string) {
    const alert = await this.alertController.create({
      header: lugar,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  borrarBD(){
    this.database.executeSql(this.borraUsu, []);
    this.database.executeSql(this.borrarAuto, []);
    this.database.executeSql(this.borrarViaje, []);
    this.database.executeSql(this.borrarDescuento, []);
    this.database.executeSql(this.borrarUsuViaje, []);
  }

  crearBD() {
    //validación de la plataforma
    this.platform.ready().then(() => {
      //creación de la BD
      this.sqlite.create({
        name: 'actividad.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        //crear las tablas
        this.borrarBD();
        this.presentAlert("borrar","borrar");
      }).catch(e => {
        this.presentAlert(e, "borrada de BD");
      })

    })
  }
}
