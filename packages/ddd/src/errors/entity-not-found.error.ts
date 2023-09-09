import { CustomError } from "ts-custom-error";

export class EntityNotFound extends CustomError {
  constructor(
    public readonly entityName: string,
    public readonly predicate?: Record<string, unknown>,
  ) {
    super(`${entityName} could not be found`);
  }
}
