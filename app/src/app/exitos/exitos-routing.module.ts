import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExitosPage } from './exitos.page';

const routes: Routes = [
  {
    path: '',
    component: ExitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExitosPageRoutingModule {}
