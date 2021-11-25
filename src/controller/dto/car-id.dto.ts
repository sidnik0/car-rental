import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CarIdDto {
  @ApiProperty({ description: 'Car id', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  readonly carId: string;
}
