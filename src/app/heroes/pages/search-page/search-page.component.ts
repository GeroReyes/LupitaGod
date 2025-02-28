import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search-page',
  standalone:false,
  templateUrl: './search-page.component.html',
  styles: [
    `
/* Contenedor principal de la búsqueda */
.search-container {
  text-align: center;
  padding: 3rem;
  background-color: #121212; /* Fondo oscuro */
  animation: fadeInContainer 1s ease-out;
}

/* Animación para el contenedor */
@keyframes fadeInContainer {
  0% {
    opacity: 0;
    transform: scale(0.9) rotate(15deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* Imagen centrada */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInImage 1.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

/* Animación de entrada para la imagen */
@keyframes fadeInImage {
  0% {
    opacity: 0;
    transform: translateY(50px) rotate(30deg);
  }
  50% {
    opacity: 0.7;
    transform: translateY(-20px) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

/* Imagen del héroe con zoom */
.hero-image {
  width: 100%;
  max-width: 220px;
  border-radius: 12px;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-in-out;
}

/* Efecto de zoom en la imagen */
.hero-image:hover {
  transform: scale(1.15);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
}

/* Estilos del contenedor de detalles del héroe */
.hero-details {
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 12px;
  background-color: #000; /* Fondo negro */
  color: #fff; /* Texto blanco */
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.6);
  max-width: 450px;
  margin: 3rem auto;
  text-align: center;
  animation: popIn 1s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
}

/* Animación para el contenedor de detalles */
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8) rotateY(180deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1) rotateY(-30deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
}

/* Estilo para el nombre del héroe */
.hero-details h2 {
  color: #fff;
  margin-bottom: 1rem;
  opacity: 0;
  animation: slideInText 0.7s ease-out 0.3s forwards;
}

/* Animación de entrada para el nombre */
@keyframes slideInText {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animación de entrada para los detalles */
.hero-details p {
  color: #ddd;
  opacity: 0;
  animation: slideUpText 1s ease-out 0.5s forwards;
}

/* Animación de deslizamiento de los párrafos */
@keyframes slideUpText {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos generales para layout */
.full-width {
  width: 100%;
}


    `
  ],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService) {}

  searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    // Asigna el héroe seleccionado para mostrar los detalles
    this.selectedHero = hero;
  }
}
