import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { ConfigProvider, ConfigService } from '@todoist/ddd';
import { CONFIG_VALIDATION_OBJECT_SCHEMA, ConfigSchema } from './config.schema';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      validationSchema: CONFIG_VALIDATION_OBJECT_SCHEMA,
      cache: true,
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: ConfigService<ConfigSchema>,
      useClass: ConfigProvider<ConfigSchema>,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
