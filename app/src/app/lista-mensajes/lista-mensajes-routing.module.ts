import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaMensajesPage } from './lista-mensajes.page';

const routes: Routes = [
  {
    path: '',
    component: ListaMensajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaMensajesPageRoutingModule {}
