import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database/database.service';
import { RentalEntity, RentalEntityWithRelations } from '../entity/rental.entity';
import { map, Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { RentalMapper } from '../mapper/rental.mapper';
import { RentalDbEntity, RentalDbEntityWithRelations } from '../entity/db-entitiy/rental.db-entity';

@Injectable()
export class RentalRepository extends BaseRepository<RentalEntity> {
  private static RELATIONS =
    `LEFT JOIN cars ON cars.id = rentals.car_id ` +
    `LEFT JOIN tariffs ON tariffs.id = rentals.tariff_id ` +
    `LEFT JOIN discounts ON discounts.id = rentals.discount_id`;
  private static RELATIONS_PROPERTIES =
    'rentals.id as id, days_count, total_price, started_at, ended_at, car_id, tariff_id, discount_id, ' +
    'brand, model, license_plate, vin_number, ' +
    'price, distance, ' +
    'from_rental_days_count, to_rental_days_count, discount';
  constructor(
    private readonly databaseService: DatabaseService<RentalDbEntity>,
    private readonly rentalMapper: RentalMapper,
  ) {
    super();
  }

  create(rentalEntity: Omit<RentalEntity, 'id'>): Observable<RentalEntity> {
    return this.databaseService
      .executeQuery(
        `INSERT INTO rentals (car_id, tariff_id, discount_id, days_count, total_price, started_at, ended_at) ` +
          `values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          rentalEntity.carId,
          rentalEntity.tariffId,
          rentalEntity.discountId,
          rentalEntity.daysCount,
          rentalEntity.totalPrice,
          rentalEntity.startedAt,
          rentalEntity.endedAt,
        ],
      )
      .pipe(
        map((rows) => rows[0]),
        map((rentalDb) => this.rentalMapper.fromDbToEntity(rentalDb)),
      );
  }

  findOne(id: string): Observable<RentalEntity> {
    return this.databaseService.executeQuery(`SELECT * FROM rentals where id = $1`, [id]).pipe(
      map((rows) => rows[0]),
      map((rentalDb) => this.rentalMapper.fromDbToEntity(rentalDb)),
    );
  }

  findOneWithRelations(id: string): Observable<RentalEntityWithRelations> {
    return this.databaseService
      .executeQuery(
        `SELECT ${RentalRepository.RELATIONS_PROPERTIES} FROM rentals where id = $1 ${RentalRepository.RELATIONS}`,
        [id],
      )
      .pipe(
        map((rows) => rows[0]),
        map((rentalDb) => this.rentalMapper.fromDbToEntityWithRelations(rentalDb as RentalDbEntityWithRelations)),
      );
  }

  findOneByIdCar(carId: string): Observable<RentalEntity> {
    return this.databaseService
      .executeQuery(`SELECT * FROM rentals where car_id = $1 ` + `ORDER BY ended_at DESC LIMIT 1`, [carId])
      .pipe(
        map((rows) => rows[0]),
        map((rentalDb) => rentalDb && this.rentalMapper.fromDbToEntity(rentalDb)),
      );
  }

  findOneByIdCarWithRelations(carId: string): Observable<RentalEntityWithRelations> {
    return this.databaseService
      .executeQuery(
        `SELECT ${RentalRepository.RELATIONS_PROPERTIES} FROM rentals where car_id = $1 ` +
          `${RentalRepository.RELATIONS} ORDER BY ended_at DESC LIMIT 1`,
        [carId],
      )
      .pipe(
        map((rows) => rows[0]),
        map(
          (rentalDb) =>
            rentalDb && this.rentalMapper.fromDbToEntityWithRelations(rentalDb as RentalDbEntityWithRelations),
        ),
      );
  }

  findAll(): Observable<RentalEntity[]> {
    return this.databaseService
      .executeQuery(`SELECT * FROM rentals`)
      .pipe(map((rentalsDb) => rentalsDb.map((rentalDb) => this.rentalMapper.fromDbToEntity(rentalDb))));
  }

  findAllWithRelations(): Observable<RentalEntityWithRelations[]> {
    return this.databaseService
      .executeQuery(`SELECT ${RentalRepository.RELATIONS_PROPERTIES} FROM rentals ${RentalRepository.RELATIONS}`)
      .pipe(
        map((rentalsDb) =>
          rentalsDb.map((rentalDb) =>
            this.rentalMapper.fromDbToEntityWithRelations(rentalDb as RentalDbEntityWithRelations),
          ),
        ),
      );
  }

  update(rentalEntity: RentalEntity): Observable<RentalEntity> {
    return this.databaseService
      .executeQuery(
        `UPDATE rentals SET car_id = $1, tariff_id = $2, days_count = $3, total_price = $4) WHERE id = $5 RETURNING *`,
        [rentalEntity.carId, rentalEntity.tariffId, rentalEntity.daysCount, rentalEntity.totalPrice, rentalEntity.id],
      )
      .pipe(
        map((rows) => rows[0]),
        map((rentalDb) => this.rentalMapper.fromDbToEntity(rentalDb)),
      );
  }

  delete(id: string): Observable<RentalEntity> {
    return this.databaseService.executeQuery(`DELETE FROM rentals WHERE id = $1 RETURNING *`, [id]).pipe(
      map((rows) => rows[0]),
      map((rentalDb) => this.rentalMapper.fromDbToEntity(rentalDb)),
    );
  }
}
