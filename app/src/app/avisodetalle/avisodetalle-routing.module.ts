import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisodetallePage } from './avisodetalle.page';

const routes: Routes = [
  {
    path: ':id',
    component: AvisodetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisodetallePageRoutingModule {}
