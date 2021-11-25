import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database/database.service';
import { TariffEntity } from '../entity/tariff.entity';
import { map, Observable } from 'rxjs';
import { BaseRepository } from './base.repository';
import { TariffMapper } from '../mapper/tariff.mapper';
import { TariffDbEntity } from '../entity/db-entitiy/tariff.db-entity';

@Injectable()
export class TariffRepository extends BaseRepository<TariffEntity> {
  private static TABLE_NAME = 'tariffs';

  constructor(
    private readonly databaseService: DatabaseService<TariffDbEntity>,
    private readonly tariffMapper: TariffMapper,
  ) {
    super();
  }

  create(tariffEntity: TariffEntity): Observable<TariffEntity> {
    return this.databaseService
      .executeQuery(`INSERT INTO ${TariffRepository.TABLE_NAME} (price, distance) values ($1, $2) RETURNING *`, [
        tariffEntity.price,
        tariffEntity.distance,
      ])
      .pipe(
        map((rows) => rows[0]),
        map((tariffDb) => this.tariffMapper.fromDbToEntity(tariffDb)),
      );
  }

  findOne(id: string): Observable<TariffEntity> {
    console.log(id);
    return this.databaseService.executeQuery(`SELECT * FROM ${TariffRepository.TABLE_NAME} where id = $1`, [id]).pipe(
      map((rows) => rows[0]),
      map((tariffDb) => tariffDb && this.tariffMapper.fromDbToEntity(tariffDb)),
    );
  }

  findAll(): Observable<TariffEntity[]> {
    return this.databaseService
      .executeQuery(`SELECT * FROM ${TariffRepository.TABLE_NAME}`)
      .pipe(map((tariffsDb) => tariffsDb.map((tariffDb) => this.tariffMapper.fromDbToEntity(tariffDb))));
  }

  update(tariffEntity: TariffEntity): Observable<TariffEntity> {
    return this.databaseService
      .executeQuery(`UPDATE ${TariffRepository.TABLE_NAME} SET price = $1, distance = $2) WHERE id = $3 RETURNING *`, [
        tariffEntity.price,
        tariffEntity.distance,
        tariffEntity.id,
      ])
      .pipe(
        map((rows) => rows[0]),
        map((tariffDb) => this.tariffMapper.fromDbToEntity(tariffDb)),
      );
  }

  delete(id: string): Observable<TariffEntity> {
    return this.databaseService
      .executeQuery(`DELETE FROM ${TariffRepository.TABLE_NAME} WHERE id = $1 RETURNING *`, [id])
      .pipe(
        map((rows) => rows[0]),
        map((tariffDb) => this.tariffMapper.fromDbToEntity(tariffDb)),
      );
  }
}
