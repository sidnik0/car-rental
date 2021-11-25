import { ApiProperty } from '@nestjs/swagger';

export class CarDto {
  @ApiProperty({ description: 'Car id', format: 'uuid' })
  readonly id: string;

  @ApiProperty({ description: 'Brand' })
  readonly brand: string;

  @ApiProperty({ description: 'Model' })
  readonly model: string;

  @ApiProperty({ description: 'License plate' })
  readonly licensePlate: string;

  @ApiProperty({ description: 'VIN number' })
  readonly vinNumber: string;
}
