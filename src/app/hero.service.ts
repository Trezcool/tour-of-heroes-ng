import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


export interface Hero {
  id: number;
  name: string;
}


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
               .catch(this.handleError);
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

  search(term: string): Observable<Hero[]> {
    return this.http.get(`${this.heroesUrl}/?name=${term}`)
               .map(res => res.json().data as Hero[]);
  }

  destroy(id: number): Promise<any> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url)
               .toPromise()
               .then()
               .catch(this.handleError);
  }
}
