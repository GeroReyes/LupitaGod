import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

//Definimos las rutas principales de la aplicación
const routes: Routes = [
  {
    path: 'auth', //Ruta padre(inicial) para autenticación
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    //Carga de módulo de autenticación/Lazy Loading carga el modulo de autenticación solo cuando se accede a auth
  },
   
  {
    path: 'heroes', //Ruta padre(inicial) para herooes
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
    //Carga de módulo de autenticación/Lazy Loading carga el modulo de autenticación solo cuando se accede a heroes
  },
  {
    path: '404', //Ruta padre(inicial)  para ala pagina de error 404
    component: Error404PageComponent,
  },
  {
    path: '', //Ruta padre(inicial) para cualquier otra ruta
    redirectTo: 'heroes', //Redirecciona a la ruta heroes/list
    pathMatch: 'full', //Solo se redirecciona si la ruta es exactamente vacia
  },
  {
    path: '**', //Ruta comodin,se usa cuando ninguna de las rutas anteriores coincide
    redirectTo: '404', //Redirecciona a la ruta 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
