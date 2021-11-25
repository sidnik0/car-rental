import { BaseEntity } from '../base.entity';

export class DiscountDbEntity extends BaseEntity {
  from_rental_days_count: number;
  to_rental_days_count: number;
  discount: number;
}
