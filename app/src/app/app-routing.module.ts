import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/guard.guard';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'tabnav',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'misavisos',
    loadChildren: () => import('./misavisos/misavisos.module').then(m => m.MisavisosPageModule)
  },
  {
    path: 'acceso',
    loadChildren: () => import('./acceso/acceso.module').then( m => m.AccesoPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosPageModule)
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./solicitudes/solicitudes.module').then(m => m.SolicitudesPageModule)
  },
  {
    path: 'avisodetalle',
    loadChildren: () => import('./avisodetalle/avisodetalle.module').then(m => m.AvisodetallePageModule)
  },
  {
    path: 'tabnav',
    loadChildren: () => import('./tabnav/tabnav.module').then( m => m.TabnavPageModule)
  },
  {
    path: 'wellcome',
    loadChildren: () => import('./wellcome/wellcome.module').then( m => m.WellcomePageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'exitos',
    loadChildren: () => import('./exitos/exitos.module').then( m => m.ExitosPageModule)
  },
  {
    path: 'seguimiento',
    loadChildren: () => import('./seguimiento/seguimiento.module').then( m => m.SeguimientoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
