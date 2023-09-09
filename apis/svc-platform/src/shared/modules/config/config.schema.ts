import Joi from "joi";

import { BASE_CONFIG_VALIDATION_SCHEMA_MAP, BaseConfigSchema } from "@todoist/ddd";

export interface ConfigSchema extends BaseConfigSchema {
  PLATFORM_DATABASE_HOST: string;
  PLATFORM_DATABASE_PORT: number;
  PLATFORM_DATABASE_USER: string;
  PLATFORM_DATABASE_PASSWORD: string;
  PLATFORM_DATABASE_NAME: string;
  PLATFORM_DATABASE_VERBOSE?: boolean;
}

export const CONFIG_VALIDATION_OBJECT_SCHEMA = Joi.object<ConfigSchema, true>({
  ...BASE_CONFIG_VALIDATION_SCHEMA_MAP,
  PLATFORM_DATABASE_HOST: Joi.string().required(),
  PLATFORM_DATABASE_PORT: Joi.number().default(5432),
  PLATFORM_DATABASE_USER: Joi.string().required(),
  PLATFORM_DATABASE_PASSWORD: Joi.string().required(),
  PLATFORM_DATABASE_NAME: Joi.string().required(),
  PLATFORM_DATABASE_VERBOSE: Joi.boolean().default(false),
});
