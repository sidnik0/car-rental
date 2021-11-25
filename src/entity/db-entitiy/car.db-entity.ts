import { BaseEntity } from '../base.entity';

export class CarDbEntity extends BaseEntity {
  brand: string;
  model: string;
  license_plate: string;
  vin_number: string;
}
