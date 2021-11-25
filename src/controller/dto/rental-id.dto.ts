import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RentalIdDto {
  @ApiProperty({ description: 'Rental id', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  readonly rentalId: string;
}
