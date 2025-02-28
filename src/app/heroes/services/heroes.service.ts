import { catchError, Observable, of } from "rxjs";
import { Hero } from "../interfaces/hero.interfaces";
import { enviroments } from "../../../enviroments/enviroments";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseUrl: string = enviroments.baseUrl;

    constructor(private http: HttpClient) {} //permite hacer solicitudes HTTP

    getHeroes(): Observable<Hero[]> { //metodo que obtiene la lista de héroes
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    getHeroById(id: string): Observable<Hero | undefined>{
        //Metodo que obtiene un heroe especifico basado en su ID
        //Retorna un observable que puede ser un Hero o "undefined" (si no existe el hero)
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)

        .pipe(
            //Se usa pipe para procesar el resultado de la peticion
            catchError(error => of(undefined)));
            //Si ocurre un error devuelve "undefined"
    }
    getSuggestions( query: string): Observable<Hero[]>{
        //Metodo que obtiene una lista de heroes basados en una busqueda
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    }
}
