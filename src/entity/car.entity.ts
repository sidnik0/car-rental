import { BaseEntity } from './base.entity';

export class CarEntity extends BaseEntity {
  brand: string;
  model: string;
  licensePlate: string;
  vinNumber: string;
}
