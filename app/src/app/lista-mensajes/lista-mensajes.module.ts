import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaMensajesPageRoutingModule } from './lista-mensajes-routing.module';

import { ListaMensajesPage } from './lista-mensajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaMensajesPageRoutingModule
  ],
  declarations: [ListaMensajesPage]
})
export class ListaMensajesPageModule {}
