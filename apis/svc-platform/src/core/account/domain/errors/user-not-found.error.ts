import { EntityNotFound } from "@todoist/ddd";

export class UserNotFound extends EntityNotFound {
  constructor(public override readonly predicate?: Record<string, unknown>) {
    super("user", predicate);
  }
}
