import { Injectable } from '@nestjs/common';
import { CarRepository } from '../repository/car.repository';
import { BaseService } from './base.service';
import { CarEntity } from '../entity/car.entity';

@Injectable()
export class CarService extends BaseService<CarEntity> {
  constructor(protected readonly carRepository: CarRepository) {
    super(carRepository);
  }
}
