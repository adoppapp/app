import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {  AngularFireStorage } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ResponsiveModule } from 'ngx-responsive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {configresponsive} from './configresponsive';
import {RMenuUsuarioComponent} from './component/r-menu-usuario/r-menu-usuario.component';
import { AvisoPipe } from './pipe/aviso.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, RMenuUsuarioComponent, AvisoPipe ],
  entryComponents: [RMenuUsuarioComponent],
  exports : [AvisoPipe],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
     ReactiveFormsModule,
    HttpClientModule,
    ResponsiveModule.forRoot(configresponsive),
     AngularSvgIconModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    [AvisoPipe],
    AngularFireStorage,
    // { provide: ErrorHandler, useClass: MyErrorHandler },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
