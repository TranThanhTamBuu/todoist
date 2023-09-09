import { Injectable } from "@nestjs/common";
import { ICommand, IEvent, Saga, ofType } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { InstanceOfClasses } from "@todoist/ddd";

import { WorkspaceUserCreatedEvent } from "../../../domain/events/workspace-user-created.event";
import { CreatePersonalWorkspaceCommand } from "./create-personal-workspace.command";

@Injectable()
export class CreatePersonalWorkspaceSagas {
  constructor() {}

  @Saga()
  createPersonalWorkspace = (events$: Observable<IEvent>): Observable<ICommand> => {
    const targetEventTypes = [WorkspaceUserCreatedEvent];
    type AllowedEventType = InstanceOfClasses<typeof targetEventTypes>;

    return events$.pipe(
      ofType<IEvent, AllowedEventType>(...targetEventTypes),
      map<AllowedEventType, CreatePersonalWorkspaceCommand>((event) => new CreatePersonalWorkspaceCommand(event.userId)),
    );
  };
}
