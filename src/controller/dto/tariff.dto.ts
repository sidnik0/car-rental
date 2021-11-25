import { ApiProperty } from '@nestjs/swagger';

export class TariffDto {
  @ApiProperty({ description: 'Tariff id', format: 'uuid' })
  readonly id: string;

  @ApiProperty({ description: 'Price' })
  readonly price: number;

  @ApiProperty({ description: 'Distance' })
  readonly distance: number;
}
