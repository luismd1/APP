import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaveOlvidadaPageRoutingModule } from './clave-olvidada-routing.module';

import { ClaveOlvidadaPage } from './clave-olvidada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaveOlvidadaPageRoutingModule
  ],
  declarations: [ClaveOlvidadaPage]
})
export class ClaveOlvidadaPageModule {}
