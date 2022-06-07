import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[];
  selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    private messagesService: MessagesService
  ) {
    this.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnInit(): void {}

  /*
  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.messagesService.addMessage(`Select hero ${hero.name}`);
  }
  */

  getHeroes() {
    return this.heroService.getHeroes();
  }

  onDelete(id: number) {
    if (this.heroes) {
      this.heroes = this.heroes.filter((h) => h.id !== id);
    }
    this.heroService.deleteHero(id).subscribe();
  }

  add(heroName: string) {
    if (heroName && this.heroes) {
      this.heroService.addHero({ name: heroName } as Hero).subscribe((hero) => {
        if (this.heroes === undefined) {
          this.heroes = [];
        }
        this.heroes.push(hero);
      });
    }
  }
}
