import { Module } from '@nestjs/common';
import { CarMapper } from './car.mapper';
import { DiscountMapper } from './discount.mapper';
import { RentalMapper } from './rental.mapper';
import { TariffMapper } from './tariff.mapper';
import { UtilsModule } from '../common/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [CarMapper, DiscountMapper, RentalMapper, TariffMapper],
  exports: [CarMapper, DiscountMapper, RentalMapper, TariffMapper],
})
export class MapperModule {}
