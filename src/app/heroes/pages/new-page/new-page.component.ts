import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interfaces';
import { Publisher } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-new-page',
  standalone: false,
  templateUrl: './new-page.component.html',
  styles: [``]
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>('')  // Agregar el campo para la URL de la imagen
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el ID del héroe de la URL
    const heroId = this.route.snapshot.paramMap.get('id');

    if (heroId) {
      // Si existe un ID, cargamos el héroe correspondiente
      this.heroesService.getHeroById(heroId).subscribe(hero => {
        if (hero) {
          // Usamos patchValue para completar los valores del formulario con la información del héroe
          this.heroForm.patchValue({
            id: hero.id,
            superhero: hero.superhero,
            publisher: hero.publisher,
            alter_ego: hero.alter_ego,
            first_appearance: hero.first_appearance,
            characters: hero.characters,
            alt_img: hero.alt_img || ''  // Cargar la URL de la imagen si está disponible
          });
        }
      });
    }
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    

    if (this.currentHero.id) {
      // Si el héroe tiene id, lo estamos actualizando
      this.heroesService.updateHero(this.currentHero).subscribe(hero => {
        this.router.navigate(['/heroes/list']);  // Redirigir después de la actualización
      });
    } else {
      // Si no tiene id, estamos agregando un nuevo héroe
      this.heroesService.addHero(this.currentHero).subscribe(hero => {
        this.router.navigate(['/heroes/list']);  // Redirigir después de agregar el héroe
      });
    }
  }
}
