import { Injectable } from '@nestjs/common';
import { TariffEntity } from '../entity/tariff.entity';
import { TariffDbEntity } from '../entity/db-entitiy/tariff.db-entity';

@Injectable()
export class TariffMapper {
  fromDbToEntity(dbModel: TariffDbEntity): TariffEntity {
    return {
      id: dbModel.id,
      price: Number(dbModel.price),
      distance: dbModel.distance,
    };
  }
}
