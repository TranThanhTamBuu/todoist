import { Inject, Injectable } from "@nestjs/common";

import { InMemoryRepository } from "@todoist/ddd";

import { PersonalWorkspaceRepository } from "../../application/store/personal-workspace.repository";
import { PersonalWorkspace } from "../../domain/entities/personal-workspace";
import { PERSONAL_WORKSPACE_FIXTURES } from "./personal-workspace.fixture";

@Injectable()
export class InMemoryPersonalWorkspaceRepository
  extends InMemoryRepository<PersonalWorkspace>
  implements PersonalWorkspaceRepository
{
  constructor(@Inject(PERSONAL_WORKSPACE_FIXTURES) private readonly personalWorkspaceFixtures: PersonalWorkspace[]) {
    super(personalWorkspaceFixtures);
  }

  async findOneByOwnerId(ownerId: string): Promise<PersonalWorkspace | null> {
    const personalWorkspace = this.toArray().find((personalWorkspace) => personalWorkspace.ownerId === ownerId) || null;
    return personalWorkspace;
  }
}
