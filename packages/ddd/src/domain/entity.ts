import { UniqueEntityId } from "./unique-entity-id";

const isEntity = (v: unknown): v is Entity<EntityProps> => {
  return v instanceof Entity;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type EntityProps = {
  id?: UniqueEntityId;
};
export abstract class Entity<Props extends EntityProps = EntityProps> {
  public readonly _id: UniqueEntityId;

  constructor(protected props: Props) {
    this._id = props.id ? props.id : new UniqueEntityId();
    this.props.id = this._id;
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  public equals(object?: Entity<Props>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  public getProps() {
    return { ...this.props, id: this._id };
  }

  // abstract validate(): void;
}
