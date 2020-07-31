import { Injectable } from '@angular/core';
import { Genres } from './genres';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor() { }

  getGenres():Observable<string[]>{
    return of (Genres);
  }

  setGenre(genre){
    Genres.unshift(genre);
    // Genres.push(genre);
  }
}
