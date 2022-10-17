import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import {NativeGeocoder} from '@awesome-cordova-plugins/native-geocoder/ngx';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, Camera, Geolocation, NativeStorage,NativeGeocoder],
  bootstrap: [AppComponent],
})
export class AppModule {}
