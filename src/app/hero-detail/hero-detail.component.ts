import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  //@Input() hero?: Hero;
  hero?: Hero;

  constructor(
    private routerService: ActivatedRoute,
    private locationService: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    const id = Number(this.routerService.snapshot.paramMap.get('heroId'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  back() {
    this.locationService.back();
  }
}
