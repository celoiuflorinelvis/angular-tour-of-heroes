import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes = HEROES;

  constructor() {}

  getHeroes() {
    return this.heroes;
  }
}
