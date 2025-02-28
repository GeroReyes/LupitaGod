import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '', //Ruta base del modulo de heroes
    component: LayoutPageComponent, //Componente principal del modulo, contiene la estructura
    children:[//rutas hijas del modulo de heroes
      { path: 'new-heroe', component: NewPageComponent }, //Ruta para crear un nuevo heroe
      { path: 'search', component: SearchPageComponent},//Ruta para buscar un heroe
      { path: 'edit/id', component: NewPageComponent }, //Ruta para editar un heroe
      { path: 'list', component: ListPageComponent }, //listado de heroes
      { path: 'id', component:  HeroPageComponent }, //Para ver un heroe en detalle, especifico por su id
      { path: '**', redirectTo: 'list' }, //Cualquier otra ruta se redirecciona a list
    ] 

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
