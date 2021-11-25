import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { from, Observable } from 'rxjs';
import * as fs from 'fs/promises';

export const DATABASE = 'DATABASE';

@Injectable()
export class DatabaseService<T> implements OnModuleInit {
  constructor(@Inject(DATABASE) private pool: Pool) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.pool.query('select * from migrations');
    } catch (e) {
      const sql = await fs.readFile(process.cwd() + '/postgres-init/init-tables.sql', 'utf8');

      await this.pool.query(sql);
    }
  }

  executeQuery(queryText: string, values: any[] = []): Observable<T[]> {
    return from(this.pool.query(queryText, values).then((result) => result.rows));
  }
}
