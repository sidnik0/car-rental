import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DiscountIdDto {
  @ApiProperty({ description: 'Discount id', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  readonly discountId: string;
}
