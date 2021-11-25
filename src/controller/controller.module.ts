import { Module } from '@nestjs/common';
import { ServiceModule } from '../service/service.module';
import { CarController } from './car.controller';
import { DiscountController } from './discount.controller';
import { RentalController } from './rental.controller';
import { TariffController } from './tariff.controller';
import { MapperModule } from '../mapper/mapper.module';

@Module({
  imports: [ServiceModule, MapperModule],
  controllers: [CarController, DiscountController, RentalController, TariffController],
})
export class ControllerModule {}
