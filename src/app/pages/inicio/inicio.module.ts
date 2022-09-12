import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { ViajarComponent } from 'src/app/components/viajar/viajar.component';
import { ConduceComponent } from 'src/app/components/conduce/conduce.component';
import { AppComponent } from 'src/app/app.component';
import { VivoComponent } from 'src/app/components/vivo/vivo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage, ViajarComponent, ConduceComponent, AppComponent, VivoComponent]
})
export class InicioPageModule {}
