import Joi from 'joi';

export interface ConfigSchema {
  NODE_ENV: string;
  PORT?: number;
  //   PLATFORM_DATABASE_HOST: string;
  //   PLATFORM_DATABASE_PORT: number;
  //   PLATFORM_DATABASE_USER: string;
  //   PLATFORM_DATABASE_PASSWORD: string;
  //   PLATFORM_DATABASE_NAME: string;
  //   PLATFORM_DATABASE_VERBOSE?: boolean;
}

export const ConfigValidationSchema = Joi.object<ConfigSchema, true>({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  //   PLATFORM_DATABASE_HOST: Joi.string(),
  //   PLATFORM_DATABASE_PORT: Joi.number().default(5432),
  //   PLATFORM_DATABASE_USER: Joi.string(),
  //   PLATFORM_DATABASE_PASSWORD: Joi.string(),
  //   PLATFORM_DATABASE_NAME: Joi.string(),
  //   PLATFORM_DATABASE_VERBOSE: Joi.boolean().default(false),
});
