import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  model: Hero = {
    id: 12,
    name: 'Dr. Nice',
    power: 'Really Smart',
    alterEgo: '',
  };

  submitted = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
  }

  addNewHero() {
    this.model = {
      id: 40,
      name: '',
      power: '',
      alterEgo: '',
    };
  }
}
