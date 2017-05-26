import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero, HeroService} from './hero.service';


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
    this.heroService.list().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  goToDetails(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['heroes', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name).then(hero => {
      this.heroes.push(hero);
      this.selectedHero = hero;
    });
  }

  remove(hero: Hero): void {
    this.heroService.destroy(hero.id).then(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) { this.selectedHero = null; }
    });
  }
}
