import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DatabaseService, DATABASE } from './database.service';
import { ModuleRef } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: async (configService: ConfigService) =>
        new Pool({
          user: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          database: configService.get('POSTGRES_DB'),
        }),
      inject: [ConfigService],
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string): any {
    const pool = this.moduleRef.get(DATABASE) as Pool;

    return pool.end();
  }
}
