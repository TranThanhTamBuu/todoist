import { DomainEvent } from "@todoist/ddd";

export class ProjectWorkspaceCreatedEvent implements DomainEvent {
  constructor(public readonly userId: string, public readonly personalWorkspaceId: string) {}
}
