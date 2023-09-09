import Joi from "joi";

export interface BaseConfigSchema {
  NODE_ENV: string;
  PORT: number;
}

export const BASE_CONFIG_VALIDATION_SCHEMA_MAP: Joi.StrictSchemaMap<BaseConfigSchema> = {
  NODE_ENV: Joi.string().valid("development", "production").default("development"),
  PORT: Joi.number().default(3000),
};
