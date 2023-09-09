import { DomainEvent } from "@todoist/ddd";

export class WorkspaceUserCreatedEvent implements DomainEvent {
  constructor(public readonly userId: string) {}
}
