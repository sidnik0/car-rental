import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { CarService } from './car.service';
import { DiscountService } from './discount.service';
import { RentalService } from './rental.service';
import { TariffService } from './tariff.service';
import { UtilsModule } from '../common/utils/utils.module';

@Module({
  imports: [RepositoryModule, UtilsModule],
  providers: [CarService, DiscountService, RentalService, TariffService],
  exports: [CarService, DiscountService, RentalService, TariffService],
})
export class ServiceModule {}
