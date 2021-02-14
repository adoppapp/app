import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisavisosPage } from './misavisos.page';

const routes: Routes = [
  {
    path: '',
    component: MisavisosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisavisosPageRoutingModule {}
