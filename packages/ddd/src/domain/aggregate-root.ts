import { AggregateRoot as NestAggregateRoot } from "@nestjs/cqrs";

import { DomainEvent } from "./domain-event";
import { EntityProps } from "./entity";
import { UniqueEntityId } from "./unique-entity-id";

const isAggregate = (v: unknown): v is AggregateRoot<EntityProps> => {
  return v instanceof AggregateRoot;
};

export abstract class AggregateRoot<Props extends EntityProps = EntityProps> extends NestAggregateRoot<DomainEvent> {
  public readonly _id: UniqueEntityId;

  constructor(protected props: Props) {
    super();
    this._id = props.id ? props.id : new UniqueEntityId();
    this.props.id = this._id;
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  public equals(object?: AggregateRoot<Props>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isAggregate(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  override publishAll(events: DomainEvent[]): void {
    for (const event of events) {
      this.publish(event);
    }
  }

  public getProps() {
    return { ...this.props, id: this._id };
  }

  // abstract validate(): void;
}
