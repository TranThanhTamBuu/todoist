import { UniqueEntityId } from "@todoist/ddd";

import { User } from "../../domain/entities/user.entity";

export const USER_FIXTURES = Symbol();

export const userFixtures: User[] = [
  new User({
    accountId: new UniqueEntityId().toString(),
    name: "Tam Tran",
    email: "tamtt@dgroup.co",
  }),
  new User({
    accountId: new UniqueEntityId().toString(),
    name: "Thai Ngo",
    email: "thaintp@dgroup.co",
  }),
];
