import { ConfigService as BaseConfigService } from '@nestjs/config';
import { ConfigSchema } from './config.schema';

export abstract class ConfigService extends BaseConfigService<ConfigSchema> {
  abstract isDevelopment(): boolean;
  abstract isProduction(): boolean;
}
