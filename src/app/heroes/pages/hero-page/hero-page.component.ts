import { Component, Input, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-page',
  standalone: false,
  
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;
  //Decllara una variable publica que almacena los datos del heroe seleccionado
  constructor(
    private HeroesService: HeroesService, 
    //Inyecta el servicio para obtener la iformacion del heroe

    private activatedRoute: ActivatedRoute,
    //Inyecta Activated para acceder a los parametros de la URL

    private router: Router,
    //Inyecta Router para redirigir a otra pagina si el heroe no existe
  ){}

  ngOnInit(): void {
      //Metodo que se ejecuta automaticamente cuando el componente se inicializa

      this.activatedRoute.params //Obtiene los parametros de la URL
      
      .pipe(
        switchMap(({ id }) => this.HeroesService.getHeroById( id )),
        //Toma el ID del heroe de la URL y lo pasa a getHero para obtener informacion
      )

      .subscribe( hero => {
        //Se suscribe al observable devuelto por getHero y recibe el heroe encontrado
        if(!hero) return this.router.navigate(['/heroes/list']);
        //Si el hero no existe redirige a la lista de heroes

        this.hero = hero;
        // almacena la información del heroe en la variable  hero

        console.log({hero});

        return;

      } )

  }

  
}
