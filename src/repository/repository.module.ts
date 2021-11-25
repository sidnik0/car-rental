import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { CarRepository } from './car.repository';
import { DiscountRepository } from './discount.repository';
import { RentalRepository } from './rental.repository';
import { TariffRepository } from './tariff.repository';
import { MapperModule } from '../mapper/mapper.module';

@Module({
  imports: [DatabaseModule, MapperModule],
  providers: [CarRepository, DiscountRepository, RentalRepository, TariffRepository],
  exports: [CarRepository, DiscountRepository, RentalRepository, TariffRepository],
})
export class RepositoryModule {}
