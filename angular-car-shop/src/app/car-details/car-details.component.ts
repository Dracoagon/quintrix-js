import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/cars/car';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  @Input() car?: Car;

  constructor(private route: ActivatedRoute, private carService: CarService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCar();
  }

  getCar(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carService.getCar(id).subscribe(car => this.car = car);
  }

  goBack(): void {
    this.location.back();
  }
}
