import { Injectable } from '@nestjs/common';
import { DiscountEntity } from '../entity/discount.entity';
import { DiscountDbEntity } from '../entity/db-entitiy/discount.db-entity';

@Injectable()
export class DiscountMapper {
  fromDbToEntity(dbModel: DiscountDbEntity): DiscountEntity {
    return {
      id: dbModel.id,
      fromRentalDaysCount: dbModel.from_rental_days_count,
      toRentalDaysCount: dbModel.to_rental_days_count,
      discount: dbModel.discount,
    };
  }
}
