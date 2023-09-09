import { CustomError } from "ts-custom-error";

export interface DetailedError {
  details(): Record<string, unknown>;
}

export abstract class DetailedError extends CustomError {}
