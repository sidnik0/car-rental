import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TariffPropsDto {
  @ApiProperty({ description: 'Price' })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: 'Distance' })
  @IsNotEmpty()
  @IsNumber()
  readonly distance: number;
}
