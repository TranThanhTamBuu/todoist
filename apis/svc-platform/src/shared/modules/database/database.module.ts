import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { ConfigService } from "@todoist/ddd";

import { ConfigSchema } from "../config/config.schema";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService<ConfigSchema>],
      useFactory: (configService: ConfigService<ConfigSchema>) => ({
        type: "postgres",
        host: configService.get("PLATFORM_DATABASE_HOST"),
        port: Number.parseInt(configService.get("PLATFORM_DATABASE_PORT"), 10),
        username: configService.get("PLATFORM_DATABASE_USER"),
        password: configService.get("PLATFORM_DATABASE_PASSWORD"),
        database: configService.get("PLATFORM_DATABASE_NAME"),
        namingStrategy: new SnakeNamingStrategy(),
        logging: configService.get("PLATFORM_DATABASE_VERBOSE") === "true" ? ["query", "error"] : false,
        logger: "advanced-console",
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
