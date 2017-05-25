import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from './hero.service';


export interface Hero {
  id: number;
  name: string;
}


@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  goToDetails(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['heroes', this.selectedHero.id]);
  }
}
