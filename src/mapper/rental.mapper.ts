import { Injectable } from '@nestjs/common';
import { RentalEntity, RentalEntityWithRelations } from '../entity/rental.entity';
import { RentalDbEntity, RentalDbEntityWithRelations } from '../entity/db-entitiy/rental.db-entity';
import { DateUtils } from '../common/utils/date.utils';
import { RentalDto } from '../controller/dto/rental.dto';

@Injectable()
export class RentalMapper {
  constructor(private readonly dateUtils: DateUtils) {}

  fromDbToEntityWithRelations(dbModel: RentalDbEntityWithRelations): RentalEntityWithRelations {
    return {
      id: dbModel.id,
      car: {
        id: dbModel.car_id,
        brand: dbModel.brand,
        model: dbModel.model,
        licensePlate: dbModel.license_plate,
        vinNumber: dbModel.vin_number,
      },
      tariff: {
        id: dbModel.tariff_id,
        price: Number(dbModel.price),
        distance: dbModel.distance,
      },
      discount: dbModel.discount_id && {
        id: dbModel.discount_id,
        fromRentalDaysCount: dbModel.from_rental_days_count,
        toRentalDaysCount: dbModel.to_rental_days_count,
        discount: dbModel.discount,
      },
      daysCount: dbModel.days_count,
      totalPrice: Number(dbModel.total_price),
      startedAt: this.dateUtils.getDateByStr(dbModel.started_at),
      endedAt: this.dateUtils.getDateByStr(dbModel.ended_at),
    };
  }

  fromDbToEntity(dbModel: RentalDbEntity): RentalEntity {
    return {
      id: dbModel.id,
      carId: dbModel.car_id,
      tariffId: dbModel.tariff_id,
      discountId: dbModel.discount_id,
      daysCount: dbModel.days_count,
      totalPrice: Number(dbModel.total_price),
      startedAt: this.dateUtils.getDateByStr(dbModel.started_at),
      endedAt: this.dateUtils.getDateByStr(dbModel.ended_at),
    };
  }

  fromEntityToDto(entity: RentalEntityWithRelations): RentalDto {
    return {
      ...entity,
      startedAt: this.dateUtils.getDateString(entity.startedAt),
      endedAt: this.dateUtils.getDateString(entity.endedAt),
    };
  }
}
