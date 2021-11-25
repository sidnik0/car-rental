import { BaseEntity } from './base.entity';

export class DiscountEntity extends BaseEntity {
  fromRentalDaysCount: number;
  toRentalDaysCount: number;
  discount: number;
}
