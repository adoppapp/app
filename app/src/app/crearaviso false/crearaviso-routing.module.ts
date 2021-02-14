import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearavisoPage } from './crearaviso.page';

const routes: Routes = [
  {
    path: '',
    component: CrearavisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearavisoPageRoutingModule {}
