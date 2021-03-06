import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Hero, HeroService } from './hero.service';


@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.retrieve(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    if (!this.hero.name) { return; }
    this.heroService.update(this.hero).then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
