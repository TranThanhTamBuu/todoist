import { DomainError } from "@todoist/ddd";

export class PersonalWorkspaceAlreadyExists extends DomainError {
  constructor(private userId: string) {
    super(`Personal workspace belong to user ${userId} already exists.`);
  }

  details(): Record<string, string> {
    return {
      userId: this.userId,
    };
  }
}
