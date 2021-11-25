import { BaseEntity } from '../entity/base.entity';
import { Observable } from 'rxjs';

export abstract class BaseRepository<T extends BaseEntity> {
  abstract create(entity: Partial<T>): Observable<T>;
  abstract findOne(id: string): Observable<T>;
  abstract findAll(): Observable<T[]>;
  abstract update(entity: T): Observable<T>;
  abstract delete(id: string): Observable<T>;
}
