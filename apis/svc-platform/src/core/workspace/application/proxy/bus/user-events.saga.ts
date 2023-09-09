import { Injectable } from "@nestjs/common";
import { EventBus, IEvent, Saga, ofType } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

import { InstanceOfClasses } from "@todoist/ddd";

import { UserEventsFactory } from "./user-events.factory";

@Injectable()
export class UserEventsSagas {
  constructor(private readonly eventBus: EventBus, private readonly userEventsFactory: UserEventsFactory) {}

  @Saga()
  transformUserEvents = (events$: Observable<IEvent>): Observable<any> => {
    const targetEventTypes = [];
    type AllowedEventType = InstanceOfClasses<typeof targetEventTypes>;

    return events$.pipe(
      ofType<IEvent, AllowedEventType>(...targetEventTypes),
      mergeMap(async (contractEvent) => await this.eventBus.publishAll(await this.userEventsFactory.createFrom(contractEvent))),
      map(() => null),
    );
  };
}
