import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DiscountPropsDto {
  @ApiProperty({ description: 'From rental days count' })
  @IsNotEmpty()
  @IsNumber()
  readonly fromRentalDaysCount: number;

  @ApiProperty({ description: 'To rental days count' })
  @IsNotEmpty()
  @IsNumber()
  readonly toRentalDaysCount: number;

  @ApiProperty({ description: 'Discount' })
  @IsNotEmpty()
  @IsNumber()
  readonly discount: number;
}
