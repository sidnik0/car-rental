import { BaseEntity } from './base.entity';
import { CarEntity } from './car.entity';
import { TariffEntity } from './tariff.entity';
import { DiscountEntity } from './discount.entity';

export class RentalEntity extends BaseEntity {
  carId: string;
  tariffId: string;
  discountId?: string;
  daysCount: number;
  totalPrice: number;
  startedAt: Date;
  endedAt: Date;
}

export class RentalEntityWithRelations extends BaseEntity {
  car: CarEntity;
  tariff: TariffEntity;
  discount?: DiscountEntity;
  daysCount: number;
  totalPrice: number;
  startedAt: Date;
  endedAt: Date;
}
