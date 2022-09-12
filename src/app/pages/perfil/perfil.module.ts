import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { CabeceraComponent } from 'src/app/components/cabecera/cabecera.component';
import { PerfilDatosComponent } from 'src/app/components/perfil-datos/perfil-datos.component';
import { PerfilConfigComponent } from 'src/app/components/perfil-config/perfil-config.component';
import { PerfilHistorialComponent } from 'src/app/components/perfil-historial/perfil-historial.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage, CabeceraComponent,PerfilDatosComponent,PerfilConfigComponent,PerfilHistorialComponent]
})
export class PerfilPageModule {}
