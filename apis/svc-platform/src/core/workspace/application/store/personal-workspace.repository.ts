import { Repository } from "@todoist/ddd";

import { PersonalWorkspace } from "../../domain/entities/personal-workspace";

export const PERSONAL_WORKSPACE_REPOSITORY = Symbol();

export interface PersonalWorkspaceRepository extends Repository<PersonalWorkspace> {
  findOneByUserId(userId: string): Promise<PersonalWorkspace | null>;
}
