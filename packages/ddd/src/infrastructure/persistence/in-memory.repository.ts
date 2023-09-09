import _ from "lodash";

import { AggregateRoot } from "src/domain";

import { FindManyOptions, Repository } from "../../application/repository";
import { Entity, EntityProps } from "../../domain/entity";
import { EntityNotFound } from "../../errors";

export class InMemoryRepository<DomainEntity extends Entity<EntityProps> | AggregateRoot<EntityProps>>
  implements Repository<DomainEntity>
{
  protected store: Map<string, DomainEntity>;

  constructor(defaultEntities: DomainEntity[] = [], protected error?: Error) {
    this.store = new Map(defaultEntities.map((e) => [e.id.toString(), e]));
  }

  async save(entity: DomainEntity): Promise<DomainEntity> {
    this.checkError();
    this.store.set(entity.id.toString(), entity);
    return entity;
  }

  async saveAll(entities: DomainEntity[]): Promise<void> {
    this.checkError();
    entities.map(async (entity) => await this.save(entity));
  }

  async findOne(id: string): Promise<DomainEntity | null> {
    return this.store.get(id) || null;
  }

  async findOneOrFail(id: string): Promise<DomainEntity> {
    const entity = await this.findOne(id);

    if (!entity) {
      throw new EntityNotFound("InMemoryEntity");
    }

    return entity;
  }

  async findByIds(ids: string[]): Promise<DomainEntity[]> {
    return this.toArray().filter((entity) => ids.includes(entity.id.toString()));
  }

  async delete(entity: DomainEntity): Promise<void> {
    this.checkError();
    this.store.delete(entity.id.toString());
  }

  async exists(id: string): Promise<boolean> {
    this.checkError();
    return this.store.has(id);
  }

  async count(options: FindManyOptions<DomainEntity>): Promise<number> {
    this.checkError();
    const where = options.filters;
    return _.filter(this.toArray(), where).length;
  }

  // InMem specific methods

  clear(): void {
    this.store.clear();
    delete this.error;
  }

  setError(error: Error): void {
    this.error = error;
  }

  protected checkError(): void {
    if (this.error !== undefined) {
      throw this.error;
    }
  }

  protected toArray(): DomainEntity[] {
    return Array.from(this.store.values());
  }
}
