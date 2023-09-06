import { Injectable } from '@nestjs/common';
import { ConfigService as BaseConfigModule } from '@nestjs/config';

@Injectable()
export class AppConfigService extends BaseConfigModule {
  constructor() {
    super();
  }

  isProduction() {
    return this.get('NODE_ENV') === 'production';
  }

  isDevelopment() {
    return this.get('NODE_ENV') === 'development';
  }
}
