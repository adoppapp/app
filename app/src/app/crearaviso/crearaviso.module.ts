import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearavisoPageRoutingModule } from './crearaviso-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CrearavisoPage } from './crearaviso.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    ImageCropperModule,
    CrearavisoPageRoutingModule
  ],
  declarations: [CrearavisoPage ]
})
export class CrearavisoPageModule {}
