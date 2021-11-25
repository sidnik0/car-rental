import { BaseEntity } from '../base.entity';

export class TariffDbEntity extends BaseEntity {
  price: string;
  distance: number;
}
