import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoPage } from './acceso.page';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { OlvidoComponent } from './componentes/olvido/olvido.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/acceso/login', pathMatch: 'full'
  },
  {
    path: '',
    component: AccesoPage,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'isRight' }
      },
      {
        path: 'registro',
        component: RegistroComponent,
        data: { animation: 'isRight' }
      },
      {
        path: 'olvido',
        component: OlvidoComponent,
        data: { animation: 'isRight' }
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoPageRoutingModule {}
