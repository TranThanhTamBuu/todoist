import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { ConfigValidationSchema } from './config.schema';
import { ConfigService } from './config.service';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigValidationSchema,
    }),
  ],
  providers: [{ provide: ConfigService, useClass: AppConfigService }],
  exports: [ConfigService],
})
export class ConfigModule {}
