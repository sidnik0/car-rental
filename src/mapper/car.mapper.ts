import { Injectable } from '@nestjs/common';
import { CarEntity } from '../entity/car.entity';
import { CarDbEntity } from '../entity/db-entitiy/car.db-entity';

@Injectable()
export class CarMapper {
  fromDbToEntity(dbModel: CarDbEntity): CarEntity {
    return {
      id: dbModel.id,
      brand: dbModel.brand,
      model: dbModel.model,
      licensePlate: dbModel.license_plate,
      vinNumber: dbModel.vin_number,
    };
  }
}
