import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExitosPageRoutingModule } from './exitos-routing.module';

import { ExitosPage } from './exitos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExitosPageRoutingModule
  ],
  declarations: [ExitosPage]
})
export class ExitosPageModule {}
