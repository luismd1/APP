import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarautoPage } from './eliminarauto.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarautoPageRoutingModule {}
