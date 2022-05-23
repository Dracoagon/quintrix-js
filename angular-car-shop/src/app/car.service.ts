import { Injectable } from '@angular/core';
import { Car } from './cars/car';
import { CARS } from './mock-cars';
import { MessagesService } from './messages.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient,
    private messagesService: MessagesService) { }

  private log(message: string) {
    this.messagesService.add(`CarService: ${message}`);
  }

  private carsUrl = 'api/cars';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET cars from the server */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        tap(_ => this.log('fetched cars')),
        catchError(this.handleError<Car[]>('getCars', []))
      );
  }

  getCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      tap(_ => this.log(`fetched car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }

  /** PUT: update car on the server */
  updateCar(car: Car): Observable<any> {
    return this.http.put(this.carsUrl, car, this.httpOptions).pipe(
      tap(_ => this.log(`updated car id=${car.id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }

/** POST: add a new car to the server */
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions).pipe(
      tap((newCar: Car) => this.log(`added car w/ id=${newCar.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }

/** DELETE: delete the car from the server */
  deleteCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;

    return this.http.delete<Car>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted car id=${id}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );
  }

/** GET cars whose name contains search term */
  searchCars(term: string): Observable<Car[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Car[]>(`${this.carsUrl}/?model=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found cars matching "${term}"`) :
        this.log(`no cars matching "${term}"`)),
      catchError(this.handleError<Car[]>('searchCars', []))
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
