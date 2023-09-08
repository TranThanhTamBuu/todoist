import { Injectable } from "@nestjs/common";
import { ConfigService as BaseConfigService } from "@nestjs/config";
import { BaseConfigSchema } from "./base-config.schema";

@Injectable()
export class ConfigProvider<
  T extends BaseConfigSchema
> extends BaseConfigService<T, true> {
  constructor() {
    super();
  }

  isProduction() {
    return this.get("NODE_ENV") === "production";
  }

  isDevelopment() {
    return this.get("NODE_ENV") === "development";
  }
}
