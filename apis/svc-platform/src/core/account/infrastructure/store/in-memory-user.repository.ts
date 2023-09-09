import { Inject, Injectable } from "@nestjs/common";

import { InMemoryRepository } from "@todoist/ddd";

import { UserRepository } from "../../application/store/user.repository";
import { User } from "../../domain/entities/user.entity";
import { USER_FIXTURES } from "./user.fixture";

@Injectable()
export class InMemoryUserRepository extends InMemoryRepository<User> implements UserRepository {
  constructor(@Inject(USER_FIXTURES) private readonly userFixtures: User[]) {
    super(userFixtures);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.toArray().find((user) => user.email === email);
    return user ?? null;
  }
}
