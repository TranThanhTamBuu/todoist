import { EntityNotFound } from "@todoist/ddd";

export class PersonalWorkspaceNotFound extends EntityNotFound {
  constructor(public override readonly predicate?: Record<string, unknown>) {
    super("personal-workspace", predicate);
  }
}
