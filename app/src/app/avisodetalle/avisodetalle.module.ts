import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
// import {CaruselFotosComponent} from '../r-component/carusel-fotos/carusel-fotos.component'
import { AvisodetallePageRoutingModule } from './avisodetalle-routing.module';
import { AvisodetallePage } from './avisodetalle.page';
import { ResponsiveModule } from 'ngx-responsive';
import { configresponsive } from '../configresponsive';
import { CajausuarioComponent} from './cajausuario/cajausuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    HttpClientModule,
    ResponsiveModule.forRoot(configresponsive),
    AvisodetallePageRoutingModule
  ],
  declarations: [AvisodetallePage, CajausuarioComponent]
})
export class AvisodetallePageModule {}
