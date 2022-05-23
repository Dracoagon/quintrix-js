import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Car } from './cars/car';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cars = [
      {
        id: 1,
        make: 'Toyota',
        model: 'Prius',
        mileage: 50000
      },
      {
        id: 2,
        make: 'Mercedes-Benz',
        model: 'GLK 350',
        mileage: 65832
      },
      {
        id: 3,
        make: 'Toyota',
        model: 'Camry',
        mileage: 67030
      },
      {
        id: 4,
        make: 'Hyundai',
        model: 'Kona',
        mileage: 44355
      },
      {
        id: 5,
        make: 'Nissan',
        model: 'Rogue',
        mileage: 15393
      },
      {
        id: 6,
        make: 'Jaguar',
        model: 'XF',
        mileage: 68295
      },
      {
        id: 7,
        make: 'Nissan',
        model: 'Versa',
        mileage: 27659
      },
      {
        id: 8,
        make: 'Subaru',
        model: 'Impreza',
        mileage: 58808
      },
      {
        id: 9,
        make: 'Nissan',
        model: 'Altima',
        mileage: 78489
      },
      {
        id: 10,
        make: 'Ford',
        model: 'Mustang',
        mileage: 70749
      }
    ];
    return { cars };
  }

  genId(cars: Car[]): number {
    return cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 11;
  }
}
