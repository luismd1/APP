import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-historial',
  templateUrl: './perfil-historial.component.html',
  styleUrls: ['./perfil-historial.component.scss'],
})
export class PerfilHistorialComponent implements OnInit {
  viajes : any = [
    {
      id : 1,
      destino : "Los platanos",
      estado : "conducido",
      fecha : "26/08/2022",
      hora : "17:30",
      costo : 1500
    },
    {
      id : 2,
      destino : "Pasaje Odessa",
      estado : "conducido",
      fecha : "24/08/2022",
      hora : "13:00",
      costo : 5000
    },
    {
      id : 3,
      destino : "Avenida las Torres con Lo cruzat",
      estado : "conducido",
      fecha : "22/08/2022",
      hora : "12:00",
      costo : 1000
    },
    {
      id : 4,
      destino : "Millantu con antumalal",
      estado : "viajado",
      fecha : "20/08/2022",
      hora : "12:30",
      costo : 6000
    },
  ]

  constructor() { }

  ngOnInit() {}

}
