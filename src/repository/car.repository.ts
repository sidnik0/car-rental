import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database/database.service';
import { CarEntity } from '../entity/car.entity';
import { map, Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { CarMapper } from '../mapper/car.mapper';
import { CarDbEntity } from '../entity/db-entitiy/car.db-entity';

@Injectable()
export class CarRepository extends BaseRepository<CarEntity> {
  private static TABLE_NAME = 'cars';

  constructor(private readonly databaseService: DatabaseService<CarDbEntity>, private readonly carMapper: CarMapper) {
    super();
  }

  create(carEntity: CarEntity): Observable<CarEntity> {
    return this.databaseService
      .executeQuery(
        `INSERT INTO ${CarRepository.TABLE_NAME} (brand, model, license_plate, vin_number) values ($1, $2, $3, $4) RETURNING *`,
        [carEntity.brand, carEntity.model, carEntity.licensePlate, carEntity.vinNumber],
      )
      .pipe(
        map((rows) => rows[0]),
        map((carDb) => this.carMapper.fromDbToEntity(carDb)),
      );
  }

  findOne(id: string): Observable<CarEntity> {
    return this.databaseService.executeQuery(`SELECT * FROM ${CarRepository.TABLE_NAME} where id = $1`, [id]).pipe(
      map((rows) => rows[0]),
      map((carDb) => carDb && this.carMapper.fromDbToEntity(carDb)),
    );
  }

  findAll(): Observable<CarEntity[]> {
    return this.databaseService
      .executeQuery(`SELECT * FROM ${CarRepository.TABLE_NAME}`)
      .pipe(map((carsDb) => carsDb.map((carDb) => this.carMapper.fromDbToEntity(carDb))));
  }

  update(carEntity: CarEntity): Observable<CarEntity> {
    return this.databaseService
      .executeQuery(
        `UPDATE ${CarRepository.TABLE_NAME} SET brand = $1, model = $2, license_plate = $3, vin_number = $4) WHERE id = $5 RETURNING *`,
        [carEntity.brand, carEntity.model, carEntity.licensePlate, carEntity.vinNumber, carEntity.id],
      )
      .pipe(
        map((rows) => rows[0]),
        map((carDb) => this.carMapper.fromDbToEntity(carDb)),
      );
  }

  delete(id: string): Observable<CarEntity> {
    return this.databaseService
      .executeQuery(`DELETE FROM ${CarRepository.TABLE_NAME} WHERE id = $1 RETURNING *`, [id])
      .pipe(
        map((rows) => rows[0]),
        map((carDb) => this.carMapper.fromDbToEntity(carDb)),
      );
  }
}
