import { Injectable } from '@nestjs/common';
import { DiscountRepository } from '../repository/discount.repository';
import { BaseService } from './base.service';
import { DiscountEntity } from '../entity/discount.entity';

@Injectable()
export class DiscountService extends BaseService<DiscountEntity> {
  constructor(protected readonly discountRepository: DiscountRepository) {
    super(discountRepository);
  }
}
