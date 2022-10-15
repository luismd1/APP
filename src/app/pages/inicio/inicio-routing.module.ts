import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConduceComponent } from 'src/app/components/conduce/conduce.component';
import { ViajarComponent } from 'src/app/components/viajar/viajar.component';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children: [
      {
        path: 'viajar',
        component: ViajarComponent
      },
      {
        path: 'conduce',
        component: ConduceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
