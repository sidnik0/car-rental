import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CarPropsDto {
  @ApiProperty({ description: 'Brand' })
  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'Model' })
  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @ApiProperty({ description: 'License plate' })
  @IsNotEmpty()
  @IsString()
  readonly licensePlate: string;

  @ApiProperty({ description: 'VIN number' })
  @IsNotEmpty()
  @IsString()
  readonly vinNumber: string;
}
