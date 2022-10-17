import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicios.service';

@Component({
  selector: 'app-eliminarauto',
  templateUrl: './eliminarauto.page.html',
  styleUrls: ['./eliminarauto.page.scss'],
})
export class EliminarautoPage implements OnInit {

  listaAutos : any = [];
  autoSeleccionado : number;

  constructor(private conexion : DbservicioService) { 
    conexion.ListaAuto();
  }

  eliminarAuto(){
    this.conexion.eliminarAuto(this.autoSeleccionado);
  }

  ngOnInit() {
    this.conexion.dbState().subscribe((res) => {
      if(res){
        this.conexion.fetchAutoUsu().subscribe(item => {
          this.listaAutos = item;
        });
      }
    });
  }

}
