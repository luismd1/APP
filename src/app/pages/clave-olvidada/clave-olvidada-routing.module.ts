import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaveOlvidadaPage } from './clave-olvidada.page';

const routes: Routes = [
  {
    path: '',
    component: ClaveOlvidadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaveOlvidadaPageRoutingModule {}
