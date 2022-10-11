import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Viaje } from './viaje';
import { Auto } from './auto';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DbservicioService {
  //variable para guardar y manipular la BD
  public database: SQLiteObject;
  //variables para crear tablas e insertar registros por defecto en tablas
  tablaUsuario = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, correo VARCHAR(50) NOT NULL, contrasena VARCHAR(50) NOT NULL);";
  tablaAuto = "CREATE TABLE IF NOT EXISTS auto (id_auto INTEGER PRIMARY KEY AUTOINCREMENT,patente VARCHAR(50) NOT NULL, marca VARCHAR(50) NOT NULL, modelo VARCHAR(50) NOT NULL, capacidad INTEGER NOT NULL,FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)  );";
  tablaViaje = "CREATE TABLE IF NOT EXISTS viaje(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT,destino VARCHAR(50) NOT NULL, fecha VARCHAR(10) NOT NULL, hora VARCHAR(6) NOT NULL, pasajeros INTEGER NOT NULL, costo INTEGER NOT NULL ,FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ,FOREIGN KEY (id_auto) REFERENCES auto(id_auto)  );";
  tablaDescuento = "CREATE TABLE IF NOT EXISTS descuento(id_desc INTEGER PRIMARY KEY AUTOINCREMENT, codigo VARCHAR(50) NOT NULL, descuento FLOAT NOT NULL, estado BOOLEAN NOT NULL);";
  // Insert's
  insertUsuario = "INSERT OR IGNORE INTO usuario(id_usuario, correo, contrasena) VALUES (1,'seb.cortes@duocuc.cl', 'Hola123');";
  insertAuto = "INSERT OR IGNORE INTO auto VALUES (1, 'AABB11', 'Chevrolet', 'Camaro', 5);";
  insertViaje = "INSERT OR IGNORE INTO viaje VALUES (1, 'Valle grande,Psje Rio maule', '10/07/2022', '08:20', 4, 5000);";
  insertViaje2 = "INSERT OR IGNORE INTO viaje VALUES (2, 'Quilicura,Las torres', '2022-09-29', '08:20', 4, 5000);";
  
  insertDescuento = "INSERT OR IGNORE INTO descuento(id_desc, codigo, descuento, estado) VALUES (1, '1b3', 0.5, 1);";





  // FALTA ESTA TABLA
  // FALTA HACER LA RELACION ENTRE LAS TABLAS 
  tablaUsuarioViaje = "FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),FOREIGN KEY (id_viaje) REFERENCES viaje(id_viaje)";



  //observable para manipular los registros de una tabla
  listaAutos = new BehaviorSubject([]);
  listaViajes = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);

  //observable para validar si la BD esta disponible o no
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //observable para el login
  usuarioActual = new BehaviorSubject([]);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, private toastController : ToastController, private router : Router) {
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

  async mensaje(texto) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }

  //método para crear la base de datos
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
        this.crearTablas();
      }).catch(e => {
        this.presentAlert(e, "Creación de BD");
      })

    })
  }


  //método para crear tablas
  async crearTablas() {
    try {
      //CREACION DE TABLAS
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaAuto, []);
      await this.database.executeSql(this.tablaViaje, []);
      await this.database.executeSql(this.tablaDescuento, []);
      //INSERT'S A LAS TABLAS
      await this.database.executeSql(this.insertUsuario, []);
      await this.database.executeSql(this.insertAuto, []);
      await this.database.executeSql(this.insertViaje, []);
      await this.database.executeSql(this.insertViaje2, []);
      await this.database.executeSql(this.insertDescuento, []);
      //puedo mostrar mensaje de tablas creadas
      this.presentAlert("Tablas Creadas", "Creación de Tablas");
      //llamar a metodo para traer todos los registros de la tabla
      this.buscarViajes();
      this.buscarUsuario();
      //manipular observable de la bd lista
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert(e, "Creación de Tablas");
    }
  }

  dbState() {
    return this.isDBReady.asObservable();
  }
  fetchAuto(): Observable<Auto[]> {
    return this.listaAutos.asObservable();
  }

  fetchViaje(): Observable<Viaje[]> {
    return this.listaViajes.asObservable();
  }

  fetchUsu(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  fetchUsuarioActual() : Observable<Usuario[]>{
    return this.usuarioActual.asObservable();
  }

  // BUSCAR VIAJE 
  buscarViajes() {
    //realizamos la consulta a la BD
    return this.database.executeSql('SELECT * FROM viaje;', []).then(res => {
      //variable para guardar los registros en una coleccion de datos de la clase noticia
      let items: Viaje[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idViaje: res.rows.item(i).id_viaje,
            destino: res.rows.item(i).destino,
            fecha: res.rows.item(i).fecha,
            hora: res.rows.item(i).hora,
            pasajeros: res.rows.item(i).pasajeros,
            costo: res.rows.item(i).costo,
            id_auto: res.rows.item(i).id_auto,
            id_usuario: res.rows.item(i).id_usuario
          });

        }
      }
      this.listaViajes.next(items);

    })
  }
  buscarAuto(){
    return this.database.executeSql('SELECT * FROM auto;', []).then(res => {
      let irems: Auto[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          irems.push({
            idAuto: res.rows.item(i).id_auto,
            patente: res.rows.item(i).patente,
            marca: res.rows.item(i).marca, 
            modelo: res.rows.item(i).modelo,
            capacidad: res.rows.item(i).capacidad,
            id_usuario: res.rows.item(i).id_usuario
            
          });

        }
      }
      this.listaViajes.next(irems);
    })
  }

  buscarUsuario() {
    //realizamos la consulta a la BD
    return this.database.executeSql('SELECT * FROM usuario;', []).then(res => {
      //variable para guardar los registros en una coleccion de datos de la clase noticia
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idUsuario : res.rows.item(i).id_usuario,
            correo : res.rows.item(i).correo,
            contrasena : res.rows.item(i).contrasena
          });
        }
      }
      this.listaViajes.next(items);

    })
  }

  // FUNCION QUE CONPRUEBA SI LA CLAVE Y EL USUARIO SON CORRECTOS
  login(usu, contra){
    let items : Usuario[] = [];
    let data = [usu, contra];
    this.database.executeSql('SELECT * FROM usuario WHERE correo = ? AND contrasena = ?;',data).then(res => {
      if (res.rows.length > 0){
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            idUsuario : res.rows.item(i).id_usuario,
            correo : res.rows.item(i).correo,
            contrasena : res.rows.item(i).contrasena
          });
        }
        this.usuarioActual.next(items);
        this.router.navigate(['/inicio']);
      }else {
        this.mensaje('Usuario y/o contraseña incorrecta');
      }
    });
  }

  // ELIMINAR VIAJE
  eliminarViaje(id) {
    return this.database.executeSql('DELETE FROM viaje WHERE id_viaje = ?;', [id]).then(a => {
      this.buscarViajes();
    });

  }

  crearViaje (id_viaje,destino, fecha, hora, pasajeros, costo){
    let data = [id_viaje,destino, fecha, hora,pasajeros, costo];
    console.log(data);
    this.database.executeSql('INSERT OR IGNORE INTO viaje VALUES ( ?, ?, ?, ?, ?, ?);',data).then(res => {
      this.buscarViajes();
      this.presentAlert('XDXDXDD','XDXDXD');
    }).catch(e => {
      this.presentAlert(e, "QUE PASA");
  })
  }

  crearAuto (id_auto,patente, marca, modelo, capacidad,id_usuario){
    let data = [id_auto,patente, marca, modelo, capacidad,id_usuario];
    return this.database.executeSql('INSERT OR IGNORE INTO auto(id_auto,patente, marca, modelo, capacidad,id_usuario) VALUES (?, ?, ?, ?, ?, ?);',data).then(res => {
      this.buscarAuto();
    });
  }

}
