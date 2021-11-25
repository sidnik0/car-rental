import { BaseEntity } from '../entity/base.entity';
import { BaseRepository } from '../repository/base.repository';
import { Observable, tap } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseService<T extends BaseEntity> {
  protected constructor(protected readonly baseRepository: BaseRepository<T>) {}

  create(entity: Partial<T>): Observable<T> {
    return this.baseRepository.create(entity);
  }

  findOne(id: string): Observable<T> {
    return this.baseRepository.findOne(id);
  }

  getOne(id: string): Observable<T> {
    return this.findOne(id).pipe(
      tap((entity) => {
        if (!entity) {
          throw new NotFoundException(`Not fount entity: id=${id}`);
        }
      }),
    );
  }

  findAll(): Observable<T[]> {
    return this.baseRepository.findAll();
  }

  update(entity: T): Observable<T> {
    return this.baseRepository.update(entity);
  }

  delete(id: string): Observable<T> {
    return this.baseRepository.delete(id);
  }
}
