import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarautoPageRoutingModule } from './eliminarauto-routing.module';

import { EliminarautoPage } from './eliminarauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarautoPageRoutingModule
  ],
  declarations: [EliminarautoPage]
})
export class EliminarautoPageModule {}
