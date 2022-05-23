import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { CarService } from '../car.service';
import { MessagesService } from '../messages.service';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars().subscribe(cars => this.cars = cars);
  }

  delete(car: Car): void {
    this.cars = this.cars.filter(c => c !== car);
    this.carService.deleteCar(car.id).subscribe();
  }

  add(make: string, model: string, mileageStr: string): void {
    make = make.trim();
    model = model.trim();
    let mileage = +mileageStr;
    if (!make || !model) { return; }
    this.carService.addCar({ make, model, mileage } as Car).subscribe(car => {
      this.cars.push(car);

    });
  }
}
