import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'clave-olvidada',
    loadChildren: () => import('./pages/clave-olvidada/clave-olvidada.module').then( m => m.ClaveOlvidadaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'vivo',
    loadChildren: () => import('./pages/vivo/vivo.module').then( m => m.VivoPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./pages/maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'nuevoauto',
    loadChildren: () => import('./pages/nuevoauto/nuevoauto.module').then( m => m.NuevoautoPageModule)
  },
  {
    path: 'eliminarauto',
    loadChildren: () => import('./pages/eliminarauto/eliminarauto.module').then( m => m.EliminarautoPageModule)
  },
  {
    /* Not Found */
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
