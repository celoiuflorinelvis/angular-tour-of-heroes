import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messagesService: MessagesService) {}

  getHeroes(): Observable<Hero[]> {
    this.messagesService.addMessage('Heroes were successfully fetched!');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero | undefined> {
    let hero = HEROES.find((h) => h.id === id);
    if (hero) {
      this.messagesService.addMessage(`Hero ${hero.name} is selected.`);
    } else {
      this.messagesService.addMessage(`Hero was not found.`);
    }
    return of(hero);
  }
}
