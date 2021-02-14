import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisavisosPageRoutingModule } from './misavisos-routing.module';

import { MisavisosPage } from './misavisos.page';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    MisavisosPageRoutingModule
  ],
  declarations: [MisavisosPage]
})
export class MisavisosPageModule {}
