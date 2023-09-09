import { DomainEvent } from "@todoist/ddd";

export class UserCreatedEvent implements DomainEvent {
  constructor(public readonly userId: string) {}
}
