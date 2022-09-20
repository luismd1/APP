import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Viaje } from './viaje';

@Injectable({
  providedIn: 'root'
})
export class DbservicioService {
//variable para guardar y manipular la BD
  public database: SQLiteObject;
//variables para crear tablas e insertar registros por defecto en tablas
  tablaUsuario = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, correo VARCHAR(50) NOT NULL, contrasena VARCHAR(50) NOT NULL);";
  tablaAuto = "CREATE TABLE IF NOT EXISTS auto (id_auto INTEGER PRIMARY KEY AUTOINCREMENT,patente VARCHAR(50) NOT NULL, marca VARCHAR(50) NOT NULL, modelo VARCHAR(50) NOT NULL, capacidad INTEGER NOT NULL);";
  tablaViaje = "CREATE TABLE IF NOT EXISTS viaje(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT,destino VARCHAR(50) NOT NULL, fecha DATE NOT NULL, hora NOT NULL, capacidad INTEGER NOT NULL, costo INTEGER NOT NULL);";
  tablaDescuento = "CREATE TABLE IF NOT EXISTS descuento(id_desc INTEGER PRIMARY KEY AUTOINCREMENT, codigo VARCHAR(50) NOT NULL, descuento FLOAT NOT NULL, estado BOOLEAN NOT NULL);";
  




  // FALTA ESTA TABLA
  // FALTA HACER LA RELACION ENTRE LAS TABLAS 
  tablaUsuarioViaje = "";




  //observable para manipular los registros de una tabla
  listaViajes = new BehaviorSubject([]);

  //observable para validar si la BD esta disponible o no
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearBD();
   }

//método para mostrar mensajes mediante alertas
  async presentAlert(msj: string, lugar: string) {
    const alert = await this.alertController.create({
      header: lugar,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

//método para crear la base de datos
  crearBD(){
    //validación de la plataforma
    this.platform.ready().then(()=>{
      //creación de la BD
      this.sqlite.create({
        name: 'actividad.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        this.database = db;
        //crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert(e,"Creación de BD");
      })

    })
  }


  //método para crear tablas
  async crearTablas(){
    try{
      await this.database.executeSql(this.tablaUsuario,[]);
      await this.database.executeSql(this.tablaAuto,[]);
      await this.database.executeSql(this.tablaViaje,[]);
      await this.database.executeSql(this.tablaDescuento,[]);
      //puedo mostrar mensaje de tablas creadas
      this.presentAlert("Tablas Creadas","Creación de Tablas");
      //llamar a metodo para traer todos los registros de la tabla
      this.buscarViajes();
      //manipular observable de la bd lista
      this.isDBReady.next(true);
    }catch(e){
      this.presentAlert(e,"Creación de Tablas");
    }
  }

  dbState(){
    return this.isDBReady.asObservable();
  }
  fetchViaje(): Observable<Viaje[]>{
    return this.listaViajes.asObservable();

  }
  // BUSCAR VIAJE 
  buscarViajes(){
    //realizamos la consulta a la BD
    return this.database.executeSql('SELECT * FROM viaje',[]).then(res=>{
      //variable para guardar los registros en una coleccion de datos de la clase noticia
      let items: Viaje[] = [];
      if(res.rows.length > 0){
        for(var i=0; i < res.rows.length; i++){
          items.push({
            idViaje : res.rows.item(i).id_viaje,
            destino : res.rows.item(i).destino,
            fecha : res.rows.item(i).fecha,
            hora : res.rows.item(i).hora,
            capacidad : res.rows.item(i).capacidad,
            costo : res.rows.item(i).costo
          });

        }
      }
      this.listaViajes.next(items);

    })
  }

  // ELIMINAR VIAJE
  eliminarViaje(id){
    return this.database.executeSql('DELETE FROM viaje WHERE id = ?',[id]).then(a=>{
      this.buscarViajes();
    })

  }

}