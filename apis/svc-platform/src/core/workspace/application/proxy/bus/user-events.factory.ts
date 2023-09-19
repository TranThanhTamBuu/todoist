import { Injectable } from "@nestjs/common";
import { IEvent } from "@nestjs/cqrs";
import invariant from "tiny-invariant";

import { DomainEvent } from "@todoist/ddd";

import { UserCreatedEvent } from "src/core/account/domain/events/user-created.event";
import { WorkspaceUserCreatedEvent } from "src/core/workspace/domain/events/workspace-user-created.event";

@Injectable()
export class UserEventsFactory {
  private readonly externalEventToDomainEvent: Map<string, (event: any) => Promise<DomainEvent[]>>;

  constructor() {
    this.externalEventToDomainEvent = new Map<string, (event: any) => Promise<DomainEvent[]>>([
      [UserCreatedEvent.name, this.buildWorkspaceUserCreatedEvent.bind(this)],
    ]);
  }

  async createFrom(event: IEvent): Promise<DomainEvent> {
    const eventMapper = this.externalEventToDomainEvent.get(event.constructor.name);

    // Defensive Programming, this should never happen
    invariant(eventMapper, `[UserEventsFactory]: Unable to propagate event ${event.constructor.name}`);

    return await eventMapper(event);
  }

  private buildWorkspaceUserCreatedEvent(event: UserCreatedEvent): WorkspaceUserCreatedEvent {
    return new WorkspaceUserCreatedEvent(event.userId);
  }
}
