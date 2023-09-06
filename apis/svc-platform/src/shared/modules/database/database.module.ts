import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DOCUMENT_DATABASE_HOST'),
        port: Number.parseInt(
          configService.get('DOCUMENT_DATABASE_PORT') ?? '5432',
          10,
        ),
        username: configService.get('DOCUMENT_DATABASE_USER'),
        password: configService.get('DOCUMENT_DATABASE_PASSWORD'),
        database: configService.get('DOCUMENT_DATABASE_NAME'),
        namingStrategy: new SnakeNamingStrategy(),
        logging:
          configService.get('DOCUMENT_DATABASE_VERBOSE') === 'true'
            ? ['query', 'error']
            : false,
        logger: 'advanced-console',
        synchronize: false,
        dropSchema: false,
        migrationsRun: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
