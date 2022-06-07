import { Injectable } from '@angular/core';
import { Observable, of, tap, catchError } from 'rxjs';
import { Hero } from './hero';
import { MessagesService } from './messages.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

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
