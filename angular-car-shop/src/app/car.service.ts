import { Injectable } from '@angular/core';
import { Car } from './cars/car';
import { CARS } from './mock-cars';
import { MessagesService } from './messages.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private messagesService: MessagesService) { }

  getCars(): Observable<Car[]> {
    const cars = of(CARS);
    this.messagesService.add('CarService: fetched cars');
    return cars;
  }

  getCar(id: number): Observable<Car> {
    const car = CARS.find(c => c.id === id)!;
    this.messagesService.add(`CarService: fetched car id=${id}`);
    return of(car);
  }
}
