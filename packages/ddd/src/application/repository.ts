import { AggregateRoot, Entity, EntityProps } from "../domain";

export interface Repository<DomainEntity extends Entity<EntityProps> | AggregateRoot<EntityProps>> {
  count(options: FindManyOptions<DomainEntity>): Promise<number>;
  exists(id: string): Promise<boolean>;
  findOne(id: string): Promise<DomainEntity | null>;
  findOneOrFail(id: string): Promise<DomainEntity>;
  findByIds(ids: string[]): Promise<DomainEntity[]>;
  save(entity: DomainEntity): Promise<DomainEntity>;
  saveAll(entities: DomainEntity[]): Promise<void>;
}

export interface FindOptions<T> {
  filters?: { [P in keyof T]?: T[P] };
  order?: { [P in keyof T]?: "ASC" | "DESC" };
}

export interface FindManyOptions<T> extends FindOptions<T> {
  skip?: number;
  limit?: number;
}

export type Predicate<T> = (item: T) => boolean;
