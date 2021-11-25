import { Injectable } from '@nestjs/common';
import { TariffRepository } from '../repository/tariff.repository';
import { BaseService } from './base.service';
import { TariffEntity } from '../entity/tariff.entity';

@Injectable()
export class TariffService extends BaseService<TariffEntity> {
  constructor(protected readonly tariffRepository: TariffRepository) {
    super(tariffRepository);
  }
}
