import { DomainError } from "@todoist/ddd";

export class UserEmailAlreadyExists extends DomainError {
  constructor(private email: string) {
    super(`User with email ${email} already exists.`);
  }

  details(): Record<string, string> {
    return {
      email: this.email,
    };
  }
}
