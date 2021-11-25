import { BaseEntity } from '../base.entity';

export class RentalDbEntity extends BaseEntity {
  car_id: string;
  tariff_id: string;
  discount_id?: string;
  days_count: number;
  total_price: string;
  started_at: string;
  ended_at: string;
}

export class RentalDbEntityWithRelations extends BaseEntity {
  car_id: string;
  tariff_id: string;
  discount_id?: string;
  brand: string;
  model: string;
  license_plate: string;
  vin_number: string;
  price: string;
  distance: number;
  from_rental_days_count?: number;
  to_rental_days_count?: number;
  discount?: number;
  days_count: number;
  total_price: string;
  started_at: string;
  ended_at: string;
}
