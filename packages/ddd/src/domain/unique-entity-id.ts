import { v4 as uuid } from "uuid";

import { Identifier } from "./identifier";

export class UniqueEntityId extends Identifier<string | number> {
  constructor(id?: string | number) {
    // TODO: replace with nanoid (and fix ESM module build)
    super(id ? id : uuid());
  }
}
