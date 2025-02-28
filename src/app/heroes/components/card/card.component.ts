import { Component, Input, input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'heroes-hero-card',
  standalone: false,
  
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent  implements OnInit{

  @Input                                                                                                  ()
  //Permite que el componente padre pase un valor a esa propiedad

  public hero!: Hero
  //Define la propiedad hero, que rpresents un héroe y debe de ser recibida como entrada

  ngOnInit(): void {
      //Método que se ejecuta automáticamente cuando el componente es inicializado

  if (!this.hero) throw new Error("Hero property is required");
  //Lanza un error si no se recibe un héroe valido
  }
  
}
