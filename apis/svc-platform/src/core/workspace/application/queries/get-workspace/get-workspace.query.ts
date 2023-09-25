import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { PersonalWorkspaceNotFound } from "src/core/workspace/domain/errors/personal-workspace-not-found.error";

import { PERSONAL_WORKSPACE_REPOSITORY, PersonalWorkspaceRepository } from "../../store/personal-workspace.repository";

export class GetWorkspaceQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetWorkspaceQuery)
export class GetPersonalWorkspaceQueryHandler implements IQueryHandler<GetWorkspaceQuery, any> {
  constructor(@Inject(PERSONAL_WORKSPACE_REPOSITORY) private readonly personalWorkspaceRepository: PersonalWorkspaceRepository) {}

  async execute({ userId }: GetWorkspaceQuery) {
    const personalWorkspace = await this.personalWorkspaceRepository.findOneByUserId(userId);

    if (!personalWorkspace) {
      throw new PersonalWorkspaceNotFound({ ownerId: userId });
    }
  }
}
