import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CarDto } from './car.dto';
import { TariffDto } from './tariff.dto';
import { DiscountDto } from './discount.dto';

export class RentalDto {
  @ApiPropertyOptional({ description: 'Rental id', format: 'uuid' })
  readonly id?: string;

  @ApiProperty({ description: 'Car', type: CarDto })
  readonly car: CarDto;

  @ApiProperty({ description: 'Tariff', type: TariffDto })
  readonly tariff: TariffDto;

  @ApiPropertyOptional({ description: 'Discount', type: DiscountDto })
  readonly discount?: DiscountDto;

  @ApiProperty({ description: 'Days count' })
  readonly daysCount: number;

  @ApiProperty({ description: 'Price' })
  readonly totalPrice: number;

  @ApiProperty({ description: 'Started date', format: 'date', pattern: '^\\d{4}-\\d{2}-\\d{2}$' })
  readonly startedAt: string;

  @ApiProperty({ description: 'Ended date', format: 'date', pattern: '^\\d{4}-\\d{2}-\\d{2}$' })
  readonly endedAt: string;
}
