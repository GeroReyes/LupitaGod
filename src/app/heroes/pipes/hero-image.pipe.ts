import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interfaces';

@Pipe({
  name: 'heroImage',
  standalone: false
})
export class HeroImagePipe implements PipeTransform {
  //Método que se ejecuta al usar el pipe en una plantilla, recibe un objeto Hero y lo devuelve
  // una  URL de imagen

  transform(hero: Hero): string {

    if(!hero.id && !hero.alt_img){
      return 'images/no-image.png'
      //Si el héroe no tiene un ID y tampoco una imagen, devuelve una imagen por defecto
    }

    if(hero.alt_img) return hero.alt_img;
      //Si el heroe no tiene una imagen alternativa(alt_img) usa esa URL
      return 'images/heroes/${ hero.id }.jpg'
      //Si el heroe tiene un ID, genera la URL de la imagen usando su ID
  }

}
