import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPage } from './perfil.page';
import { PerfilDatosComponent } from 'src/app/components/perfil-datos/perfil-datos.component';
import { PerfilConfigComponent } from 'src/app/components/perfil-config/perfil-config.component';
import { PerfilHistorialComponent } from 'src/app/components/perfil-historial/perfil-historial.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage,
    children: [
      {
        path:'perfil-datos',
        component: PerfilDatosComponent
      },
      {
        path:'perfil-historial',
        component: PerfilHistorialComponent
      },
      {
        path: 'perfil-config',
        component: PerfilConfigComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
