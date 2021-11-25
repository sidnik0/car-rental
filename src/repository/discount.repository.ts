import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database/database.service';
import { DiscountEntity } from '../entity/discount.entity';
import { map, Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { DiscountMapper } from '../mapper/discount.mapper';
import { DiscountDbEntity } from '../entity/db-entitiy/discount.db-entity';

@Injectable()
export class DiscountRepository extends BaseRepository<DiscountEntity> {
  private static TABLE_NAME = 'discounts';

  constructor(
    private readonly databaseService: DatabaseService<DiscountDbEntity>,
    private readonly discountMapper: DiscountMapper,
  ) {
    super();
  }

  create(discountEntity: DiscountEntity): Observable<DiscountEntity> {
    return this.databaseService
      .executeQuery(
        `INSERT INTO ${DiscountRepository.TABLE_NAME} (from_rental_days_count, to_rental_days_count, discount) values ($1, $2, $3) RETURNING *`,
        [discountEntity.fromRentalDaysCount, discountEntity.toRentalDaysCount, discountEntity.discount],
      )
      .pipe(
        map((rows) => rows[0]),
        map((discountDb) => this.discountMapper.fromDbToEntity(discountDb)),
      );
  }

  findOne(id: string): Observable<DiscountEntity> {
    return this.databaseService.executeQuery(`SELECT * FROM ${DiscountRepository.TABLE_NAME} where id = $1`, [id]).pipe(
      map((rows) => rows[0]),
      map((discountDb) => discountDb && this.discountMapper.fromDbToEntity(discountDb)),
    );
  }

  findAll(): Observable<DiscountEntity[]> {
    return this.databaseService
      .executeQuery(`SELECT * FROM ${DiscountRepository.TABLE_NAME}`)
      .pipe(map((discountsDb) => discountsDb.map((discountDb) => this.discountMapper.fromDbToEntity(discountDb))));
  }

  update(discountEntity: DiscountEntity): Observable<DiscountEntity> {
    return this.databaseService
      .executeQuery(
        `UPDATE ${DiscountRepository.TABLE_NAME} SET from_rental_days_count = $1, to_rental_days_count = $2, discount = $3) WHERE id = $4 RETURNING *`,
        [
          discountEntity.fromRentalDaysCount,
          discountEntity.toRentalDaysCount,
          discountEntity.discount,
          discountEntity.id,
        ],
      )
      .pipe(
        map((rows) => rows[0]),
        map((discountDb) => this.discountMapper.fromDbToEntity(discountDb)),
      );
  }

  delete(id: string): Observable<DiscountEntity> {
    return this.databaseService
      .executeQuery(`DELETE FROM ${DiscountRepository.TABLE_NAME} WHERE id = $1 RETURNING *`, [id])
      .pipe(
        map((rows) => rows[0]),
        map((discountDb) => this.discountMapper.fromDbToEntity(discountDb)),
      );
  }
}
