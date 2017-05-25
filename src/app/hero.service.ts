import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './heroes.component';


@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: Http) { }

  // noinspection JSMethodCanBeStatic
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(res => res.json().data as Hero[])
               .catch(this.handleError);
  }

  private handleError = (error: any): Promise<any> => {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
               .toPromise()
               .then(res => res.json().data as Hero)
               .catch(this.handleError);
  }
}