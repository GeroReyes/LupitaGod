import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  standalone: false,
  
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent  implements OnInit{

  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}
    //Inyecta el servicio HeroesService para poder obtener datos de los héroes
    ngOnInit(): void {
      this.heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes);
  }
}
