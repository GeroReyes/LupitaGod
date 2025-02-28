import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  standalone: false,
  
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: '/heroes/list' },  // ✅ Correcto
    { label: 'Añadir', icon: 'add', url: '/heroes/new-page' }, // ✅ Correcto
    { label: 'Buscar', icon: 'search', url: '/heroes/search' } // ✅ Correcto
  ]  


}
