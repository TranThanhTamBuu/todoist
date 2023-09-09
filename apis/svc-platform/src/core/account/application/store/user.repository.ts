import { Repository } from "@todoist/ddd";

import { User } from "../../domain/entities/user.entity";

export const USER_REPOSITORY = Symbol();

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}
