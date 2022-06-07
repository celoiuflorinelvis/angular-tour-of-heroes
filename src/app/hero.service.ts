import { Injectable } from '@angular/core';
import { Observable, of, tap, catchError } from 'rxjs';
import { Hero } from './hero';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) {}

  log(message: string) {
    this.messagesService.addMessage(`Hero: ${message} `);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) =>
        this.messagesService.addMessage('Heroes were successfully fetched!')
      ),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap((_) =>
        this.messagesService.addMessage(`Hero ${_.name} is selected.`)
      ),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.options).pipe(
      tap((_) => this.log(`Hero ${hero.id} name was changed to: ${hero.name}`)),
      catchError(this.handleError<Hero>(`updateHero id=${hero.id}`))
    );
  }

  deleteHero(id: number): Observable<any> {
    return this.http.delete(`${this.heroesUrl}/${id}`, this.options).pipe(
      tap((_) => this.log(`Hero ${id} was deleted.`)),
      catchError(this.handleError<any>('deleteHero: ' + id))
    );
  }

  addHero(hero: Hero): Observable<Hero | undefined> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.options).pipe(
      tap((_) => this.log('New hero was saved.')),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
