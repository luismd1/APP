import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VivoPage } from './vivo.page';

const routes: Routes = [
  {
    path: '',
    component: VivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VivoPageRoutingModule {}
