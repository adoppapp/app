import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { AvisoPipe} from '../pipe/aviso.pipe'
import { HomePageRoutingModule } from './home-routing.module';
import { AvisoComponent } from '../aviso/aviso.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, AvisoComponent]
})
export class HomePageModule {}
