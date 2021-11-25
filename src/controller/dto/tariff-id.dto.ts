import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class TariffIdDto {
  @ApiProperty({ description: 'Tariff id', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  readonly tariffId: string;
}
