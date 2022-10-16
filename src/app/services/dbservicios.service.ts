import { Injectable, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Viaje } from './viaje';
import { Auto } from './auto';
import { Router } from '@angular/router';
import { viajeporusuario } from './viajeporusuario';

import { ApiService } from '../services/api.service';
@Injectable({
  providedIn: 'root'
})
export class DbservicioService implements OnInit  {
  //variable para guardar y manipular la BD
  public database: SQLiteObject;
  //variables para crear tablas e insertar registros por defecto en tablas
  tablaUsuario = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, correo VARCHAR(50) NOT NULL, contrasena VARCHAR(50) NOT NULL);";
  tablaAuto = "CREATE TABLE IF NOT EXISTS auto (id_auto INTEGER PRIMARY KEY AUTOINCREMENT,patente VARCHAR(50) NOT NULL, marca VARCHAR(50) NOT NULL, modelo VARCHAR(50) NOT NULL, capacidad INTEGER NOT NULL,estado BOOLEAN NOT NULL,fk_id_usuario INTEGER ,FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario));";
  tablaViaje = "CREATE TABLE IF NOT EXISTS viaje(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, id_conductor INTEGER NOT NULL,destino VARCHAR(50) NOT NULL, fecha VARCHAR(10) NOT NULL, hora VARCHAR(6) NOT NULL, pasajeros INTEGER NOT NULL, costo INTEGER NOT NULL, estado BOOLEAN NOT NULL, fk_id_auto INTEGER, FOREIGN KEY (fk_id_auto) REFERENCES auto(id_auto) );";
  tablaDescuento = "CREATE TABLE IF NOT EXISTS descuento(id_desc INTEGER PRIMARY KEY AUTOINCREMENT, codigo VARCHAR(50) NOT NULL, descuento FLOAT NOT NULL, estado BOOLEAN NOT NULL);";
  // Insert's
  //insertUsuario = "INSERT OR IGNORE INTO usuario(id_usuario, correo, contrasena) VALUES (1,'seb.cortes@duocuc.cl', 'Hola123');";
  //insertUsuario2 = "INSERT OR IGNORE INTO usuario(id_usuario, correo, contrasena) VALUES (2,'lu.munozd@duocuc.cl', 'Hola123');";
  insertAuto = "INSERT OR IGNORE INTO auto VALUES (1, 'AABB11', 'Chevrolet', 'Camaro', 5,true, 1);";
  insertViaje = "INSERT OR IGNORE INTO viaje VALUES (1, 1, 'Valle grande,Psje Rio maule', '10/07/2022', '08:20', 4, 5000,1, false);";
  insertViaje2 = "INSERT OR IGNORE INTO viaje VALUES (2, 1, 'Quilicura,Las torres', '2022-09-29', '08:20', 4, 5000,1, false);";
  insertUsuarioViaje = "INSERT OR IGNORE INTO usuarioviaje VALUES(1,1, 'conductor')";
  
  //insertDescuento = "INSERT OR IGNORE INTO descuento(id_desc, codigo, descuento, estado) VALUES (1, '1b3', 0.5, 1);";





  // FALTA ESTA TABLA
  // FALTA HACER LA RELACION ENTRE LAS TABLAS 
  tablaUsuarioViaje = "CREATE TABLE IF NOT EXISTS usuarioviaje (fk_id_usuario INTEGER,fk_id_viaje INTEGER, rol VARCHAR(255),FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario),FOREIGN KEY (fk_id_viaje) REFERENCES viaje(id_viaje))";



  //observable para manipular los registros de una tabla
  listaAutos = new BehaviorSubject([]);
  listaViajes = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);

  //observable para el historial de viajes
  listaUsuariosviajes = new BehaviorSubject([]);
  //observable para el viaje actual
  viajeActual = new BehaviorSubject([]);
  estadoauto = new BehaviorSubject([]);
  //observable para validar si la BD esta disponible o no
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //observable para el login
  usuarioActual = new BehaviorSubject([]);
  //variables para ingreso de los ids correctamente
  idViaje: number;
  idAuto: number;
  idUsuViaje: number;
  fkAuto: number;

  //autos que vendran desde el json del profe
  autos : any = [];
  users : any = [];

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, private toastController: ToastController, private router: Router, private json : ApiService) {
    this.json.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.json.getAutos().subscribe((res) => {
      this.autos = res;
    });
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
      await this.database.executeSql(this.tablaUsuarioViaje, []);
      //INSERT'S A LAS TABLAS
      this.JSONusu();
      this.JSONauto();
      await this.database.executeSql(this.insertViaje, []);
      await this.database.executeSql(this.insertViaje2, []);
      await this.database.executeSql(this.insertUsuarioViaje, []);
      //await this.database.executeSql(this.insertDescuento, []);
      //puedo mostrar mensaje de tablas creadas
      this.presentAlert("Tablas Creadas", "Creación de Tablas");
      //llamar a metodo para traer todos los registros de la tabla
      //this.buscarViajes();
      //this.buscarUsuario();
      //manipular observable de la bd lista
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert(e, "Creación de Tablas");
    }
  }
  
  // FETCH Y DIVERSOS OBSERVABLES
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

  fetchUsuarioActual(): Observable<Usuario[]> {
    return this.usuarioActual.asObservable();
  }

  fetchviajeporusuario(): Observable<viajeporusuario[]> {
    return this.listaUsuariosviajes.asObservable();
  }
  
  fetchViajeActual(): Observable<Viaje[]>{
    return this.viajeActual.asObservable();
  }
  fetchEstadoAuto(): Observable<Auto[]>{
    return this.estadoauto.asObservable();
  }
  buscarusuactual() {

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
            id_conductor: res.rows.item(i).id_conductor,
            destino: res.rows.item(i).destino,
            fecha: res.rows.item(i).fecha,
            hora: res.rows.item(i).hora,
            pasajeros: res.rows.item(i).pasajeros,
            costo: res.rows.item(i).costo,
            fk_id_auto: res.rows.item(i).fk_id_auto,
            estado: res.rows.item(i).estado
          });

        }
      }
      this.listaViajes.next(items);

    })
  }
  buscarAuto() {
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
            estado: res.rows.item(i).estado,
            fk_id_usuario: res.rows.item(i).fk_id_usuario

          });

        }
      }
      this.listaAutos.next(irems);
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
            idUsuario: res.rows.item(i).id_usuario,
            correo: res.rows.item(i).correo,
            contrasena: res.rows.item(i).contrasena
          });
        }
      }
      this.listaUsuarios.next(items);

    })
  }
  buscarViajePorUsuario() {
    let items: viajeporusuario[] = [];
    let data = [this.usuarioActual.value[0].idUsuario];
    return this.database.executeSql('SELECT v.destino,v.fecha,v.hora,v.costo,v.estado FROM viaje v INNER JOIN usuarioviaje x ON v.id_viaje = x.fk_id_viaje  INNER JOIN usuario u ON u.id_usuario = x.fk_id_usuario  WHERE u.id_usuario = ?;', data).then(res => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            destino: res.rows.item(i).destino,
            fecha: res.rows.item(i).fecha,
            hora: res.rows.item(i).hora,
            costo: res.rows.item(i).costo,
            estado: res.rows.item(i).estado
            
          });
          console.log('XDxd')
        }
      }
      console.log("todo bien todo correcto  " + items);
      this.listaUsuariosviajes.next(items);
    }).catch(e => {
      console.log("todo mal todo incorrecto  " + items);
    })
  }

  // FUNCION QUE CONPRUEBA SI LA CLAVE Y EL USUARIO SON CORRECTOS
  login(usu, contra) {
    let items: Usuario[] = [];
    let data = [usu, contra];
    this.database.executeSql('SELECT * FROM usuario WHERE correo = ? AND contrasena = ?;', data).then(res => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idUsuario: res.rows.item(i).id_usuario,
            correo: res.rows.item(i).correo,
            contrasena: res.rows.item(i).contrasena
          });
        }
        this.usuarioActual.next(items);
        this.router.navigate(['/inicio']);
      } else {
        this.mensaje('Usuario y/o contraseña incorrecta');
      }
    });
  }

  crearUsuViaje() {
    this.maxUsuViaje();
    let data = [this.idUsuViaje,this.usuarioActual.value[0].idUsuario];

    return this.database.executeSql('INSERT OR IGNORE INTO usuarioviaje (id_usuario_viaje,fk_id_viaje,fk_id_usuario) VALUES (?,(SELECT MAX(id_viaje) FROM viaje),?)', data).then(res => {
      this.buscarViajePorUsuario();
      console.log("crear usu viaje, esto llega si se crea: "+data)
    }).catch(e => {
      console.log("crear usu viaje, esto llega si no se crea: "+data)
    })
  }
  // ELIMINAR VIAJE
  eliminarViaje(id) {
    return this.database.executeSql('DELETE FROM viaje WHERE id_viaje = ?;', [id]).then(a => {
      this.buscarViajes();
    });

  }

  crearViaje(destino, fecha, hora, pasajeros, costo) {
    this.maxviaje();
    this.verfkauto();
    let data = [this.idViaje, this.usuarioActual.value[0].idUsuario, destino, fecha, hora, pasajeros, costo, true, this.fkAuto.valueOf()];
    console.log(data);
    console.log(this.idViaje);
    console.log(this.usuarioActual.value[0].idUsuario);
    console.log(this.fkAuto);
    this.database.executeSql('INSERT OR IGNORE INTO viaje VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?);', data).then(res => {
      this.buscarViajes();
      this.presentAlert('XDXDXDD', 'CREAR VIEJA');
      this.crearUsuViaje();
    }).catch(e => {
      this.presentAlert(e, "QUE PASA");
    })
  }

  crearAuto(patente, marca, modelo, capacidad) {
    this.maxauto();
    let data = [this.idAuto, patente, marca, modelo, capacidad, this.usuarioActual.value[0].idUsuario];
    return this.database.executeSql('INSERT OR IGNORE INTO auto VALUES (?, ?, ?, ?, ?, ?);', data).then(res => {
      this.buscarAuto();
      this.presentAlert('XDXDXDD', 'CREAR AUTO');
    }).catch(e => {
      this.presentAlert(e, "QUE PASA");
    })
  }
  updAuto(patente, marca, modelo, capacidad){
    let data = [this.idAuto, patente, marca, modelo, capacidad, this.usuarioActual.value[0].idUsuario];
    return this.database.executeSql('UPDATE auto SET id_auto = ?, patente=?, marca=?, modelo=?, capacidad=?,fk_id_usuario=? ;', data).then(res => {
  }).catch(e => {
    console.log("update auto mal");
    })
}

  maxviaje() {
    return this.database.executeSql('SELECT * FROM viaje;', []).then(res => {

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {

          this.idViaje = i + 1;
          

        }
        console.log("esto trae maxviaje: "+this.idViaje);
      }

    }).catch(e => {
      this.presentAlert(e, "maxviaje");
    });

  }
  maxauto() {
    return this.database.executeSql('SELECT MAX(id_auto) FROM auto GROUP BY id_auto;', []).then(res => {
    
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          console.log("antes del sumar "+this.idAuto);
          this.idAuto = res.rows.item(i).id_auto 
          console.log("despues del sumar "+this.idAuto);
          

        }
        console.log("maxauto bien"+this.idAuto);
      }
    }).catch(e => {
      console.log("maxauto mal"+this.idAuto);
    });

  }
  maxUsuViaje() {
    return this.database.executeSql('SELECT MAX(id_usuario_viaje) FROM usuarioviaje;', []).then(res => {

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {

          this.idUsuViaje = res.rows.item(i).id_usuario_viaje + 1
          

        }
        console.log("maxusuviaje bien"+this.idUsuViaje);
      }
    }).catch(e => {
      console.log("maxusuviaje mal"+this.idUsuViaje);
    });

  }

  verfkauto() {
    let data = [this.usuarioActual.value[0].idUsuario];
    return this.database.executeSql('SELECT id_auto FROM auto where fk_id_usuario=?;', data).then(res => {

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {

          this.fkAuto = res.rows.item(i).id_auto


        }     
      this.presentAlert("TODOBIEN", "FKAUTO");
      }


    }).catch(e => {
      this.presentAlert(e, "fkauto");
    });

  }
  verEstadoAuto(){
    let items :Auto []= [];
    let data = [this.usuarioActual.value[0].idUsuario];
    this.database.executeSql('SELECT * FROM auto where fk_id_usuario=?;', data).then(res => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idAuto: res.rows.item(i).id_auto,
            patente: res.rows.item(i).patente,
            marca: res.rows.item(i).marca,
            modelo: res.rows.item(i).modelo,
            capacidad: res.rows.item(i).capacidad,
            estado: res.rows.item(i).estado,
            fk_id_usuario: res.rows.item(i).fk_id_usuario
            
          });
        }
        this.estadoauto.next(items);
      }
    }).catch(e => {
      console.log('Error EstadoAuto: ' + e);
    });
  }

  verViajeActual() {
    let items : Viaje[] = [];
    let data = [this.usuarioActual.value[0].idUsuario, this.usuarioActual.value[0].idUsuario];
    this.database.executeSql('SELECT v.id_viaje, v.id_conductor, v.destino, v.fecha, v.hora, v.pasajeros, v.costo, v.estado FROM viaje v JOIN usuarioviaje u ON v.id_viaje = u.fk_id_viaje WHERE v.id_conductor = ? OR u.fk_id_usuario = ? AND v.estado = true;', data).then(res => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            idViaje : res.rows.item(i).id_viaje,
            id_conductor : res.rows.item(i).id_conductor,
            destino : res.rows.item(i).destino,
            fecha : res.rows.item(i).fecha,
            hora : res.rows.item(i).hora,
            pasajeros : res.rows.item(i).pasajeros,
            costo : res.rows.item(i).costo,
            estado : res.rows.item(i).estado,
            fk_id_auto : res.rows.item(i).fk_id_auto
          });
        } 
        console.log("todo bien todo correcto  " + items);  
        this.viajeActual.next(items);
      }
    }).catch(e => {
      console.log('Error verViajeActual: ' + e);
    });
  }

  JSONusu(){
    for (var i=0;i < this.users.length; i++){
      let data = [this.users[i].id, this.users[i].nombre, this.users[i].clave];
      this.database.executeSql('INSERT OR IGNORE INTO usuario VALUES(?, ?, ?)',data).then(res => {
        this.presentAlert('WENA','JSON USU BIEN');
      }).catch(e => {
        this.presentAlert('ERROR EN LA INSERSION DE DATOS DEL JSON: ', e);
      });
    }

  }

  JSONauto(){
    for (var i = 0;i < this.autos.length; i++){
      let data = [i, this.autos[i].patente, this.autos[i].marca, this.autos[i].id_usuario];
      this.database.executeSql('INSERT OR IGNORE INTO auto VALUES (?,?,?, "modelo", 5, ?)',data).then(res => {
        console.log('Autos ingresados con exito');
      }).catch(e => {
        console.log(e);
      })
    }
  }

  agregarPasajero(ide){
    let data = [this.usuarioActual.value[0].idUsuario, ide, 'pasajero']
    this.database.executeSql('INSERT OR IGNORE INTO usuarioviaje VALUES(?,?,?)', data).then((res)=>{
      this.database.executeSql('UPDATE viaje SET pasajeros = pasajeros-1 WHERE id_viaje = ?', [ide]).then((res) => {
        console.log('PASAJERO DESCONTADO');
      });
      console.log('VIAJE CONFIRMADO CON EXITO PAPU');
    }).catch(e => {
      console.log(e);
    });
  }

  existenciaViaje(){
    
  }

  ngOnInit() {
    
  }
}
