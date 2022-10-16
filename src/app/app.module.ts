import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, Camera, Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
