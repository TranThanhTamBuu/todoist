import { ConfigService as BaseConfigService } from "@nestjs/config";

import { BaseConfigSchema } from "./base-config.schema";

export abstract class ConfigService<T extends BaseConfigSchema> extends BaseConfigService<T, true> {
  abstract isDevelopment(): boolean;
  abstract isProduction(): boolean;
}
