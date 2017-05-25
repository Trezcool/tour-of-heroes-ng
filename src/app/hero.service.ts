import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './heroes.component';


@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  private handleError = (error: any): Promise<any> => {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  };

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({ name }), {headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Hero)
               .catch();
  }

  list(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(res => res.json().data as Hero[])
               .catch(this.handleError);
  }

  retrieve(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
               .toPromise()
               .then(res => res.json().data as Hero)
               .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }
}
