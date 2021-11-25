import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Matches, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RentalPropsDto {
  @ApiProperty({ description: 'Car id', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  readonly carId: string;

  @ApiProperty({ description: 'Tariff id', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  readonly tariffId: string;

  @ApiProperty({ description: 'Days count' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(30)
  readonly daysCount: number;

  @ApiPropertyOptional({ description: 'Started date', format: 'date', pattern: '^\\d{4}-\\d{2}-\\d{2}$' })
  @IsOptional()
  @Matches('^\\d{4}-\\d{2}-\\d{2}$')
  readonly startedAt: string;
}
