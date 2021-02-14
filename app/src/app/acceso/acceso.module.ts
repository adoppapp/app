import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesoPageRoutingModule } from './acceso-routing.module';

import { AccesoPage } from './acceso.page';
import {OlvidoComponent} from './componentes/olvido/olvido.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ResponsiveModule } from 'ngx-responsive';
import {configresponsive} from '../configresponsive';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsiveModule.forRoot(configresponsive),
    ReactiveFormsModule,
    AngularSvgIconModule,
    AccesoPageRoutingModule
  ],
  declarations: [AccesoPage, OlvidoComponent, RegistroComponent, LoginComponent]
})
export class AccesoPageModule {}
