import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  standalone: false,
  templateUrl: './list-page.component.html',
  styles: [`
    /* Aquí podrías incluir los estilos CSS directamente si prefieres mantener todo en el TS */
  `]
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];
  public isAnimated: boolean = false;  // Variable para controlar la animación

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    // Simulando la carga de datos, puedes mostrar la animación al recibir los datos
    this.heroesService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.triggerAnimation();  // Activar animación cuando los datos se cargan
    });
  }

  triggerAnimation(): void {
    this.isAnimated = true;  // Activa la animación
  }
}
