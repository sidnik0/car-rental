import { ApiProperty } from '@nestjs/swagger';

export class DiscountDto {
  @ApiProperty({ description: 'Discount id', format: 'uuid' })
  readonly id: string;

  @ApiProperty({ description: 'From rental days count' })
  readonly fromRentalDaysCount: number;

  @ApiProperty({ description: 'To rental days count' })
  readonly toRentalDaysCount: number;

  @ApiProperty({ description: 'Discount' })
  readonly discount: number;
}
