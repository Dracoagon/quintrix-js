import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { CARS } from 'src/app/mock-cars';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars = CARS;
  selectedCar?: Car;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(car: Car): void {
    this.selectedCar = car;
  }
}
